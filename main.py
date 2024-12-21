import modal
import io
from fastapi import Response, HTTPException, Query, Request
from datetime import datetime, timezone
import requests
import os
import re

def download_model():
    from diffusers import AutoPipelineForText2Image
    import torch

    AutoPipelineForText2Image.from_pretrained(
        "stabilityai/stable-diffusion-2-1",
        torch_dtype=torch.float16,
        variant="fp16"
    )

image = (modal.Image.debian_slim()
         .pip_install("fastapi[standard]", "transformers", "accelerate", "diffusers", "requests", "torch")
         .run_function(download_model))

# comment out for local testing
app = modal.App("sd-demo", image=image)

def is_safe_prompt(prompt: str) -> tuple[bool, str]:
    # List of forbidden terms and patterns
    forbidden_patterns = [
        r'\b(nude|naked|porn|sex|explicit|nsfw)\b',
        r'violence|gore|blood|kill|murder',
        r'racist|nazi|terrorism|hate speech',
        # Add more patterns as needed
    ]
    
    # Convert prompt to lowercase for case-insensitive matching
    prompt_lower = prompt.lower()
    
    # Check each pattern
    for pattern in forbidden_patterns:
        if re.search(pattern, prompt_lower):
            return False, "Content policy violation: This type of content is not allowed"
    
    return True, ""

@app.cls(
    image=image,
    gpu="A10G",
    container_idle_timeout=300,
    secrets=[modal.Secret.from_name("MODAL_API_KEY")],
)
class Model:

    @modal.build()
    @modal.enter()
    def load_weights(self):
        from diffusers import AutoPipelineForText2Image
        import torch

        self.pipe = AutoPipelineForText2Image.from_pretrained(
            "stabilityai/stable-diffusion-2-1",
            torch_dtype=torch.float16,
            variant="fp16"
        )

        self.pipe.to("cuda")
        self.MODAL_API_KEY = os.environ["MODAL_API_KEY"]

    @modal.web_endpoint()
    def generate(self, request: Request, prompt: str = Query(..., description="The prompt for image generation")):
        api_key = request.headers.get("MODAL-API-KEY")
        if api_key != os.environ.get("CLIENT_TOKEN_1"):
            raise HTTPException(
                status_code=401,
                detail="Unauthorized"
            )

        # Check prompt safety
        is_safe, error_message = is_safe_prompt(prompt)
        if not is_safe:
            raise HTTPException(
                status_code=400,
                detail=error_message
            )

        # Additional prompt sanitization
        prompt = prompt.strip()
        if not prompt or len(prompt) > 1000:
            raise HTTPException(
                status_code=400,
                detail="Invalid prompt length"
            )

        # Get the generated image with safety settings
        images = self.pipe(
            prompt,
            num_inference_steps=100,
            guidance_scale=7.5,
            negative_prompt="nsfw, nude, naked, sex, porn, violence, gore, blood, injury, disturbing, drugs",
        ).images[0]

        # Save the PIL Image to bytes
        buffer = io.BytesIO()
        images.save(buffer, format="JPEG")
        buffer.seek(0)

        return Response(content=buffer.getvalue(), media_type="image/jpeg")
    
    @modal.web_endpoint()
    def health(self):
        """Lightweight endpoint for keeping the container warm"""
        return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


# Warm-keeping function that runs every 5 minutes
@app.function(
    schedule=modal.Cron("*/5 * * * *"),
    secrets=[modal.Secret.from_name("MODAL_API_KEY")]
)
def keep_warm():
    health_url = "https://wingding12--sd-demo-model-health.modal.run"
    generate_url = "https://wingding12--sd-demo-model-generate.modal.run"

    health_response = requests.get(health_url)
    print(f"Health check at: {health_response.json()['timestamp']}")

    headers = {"MODAL-API-KEY": os.environ.get("CLIENT_TOKEN_1", "")}
    generate_response = requests.get(generate_url, headers=headers)
    print(f"Generate endpoint tested successfully at: {datetime.now(timezone.utc).isoformat()}")
