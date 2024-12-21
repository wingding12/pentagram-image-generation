"use client";

import { useState, useEffect } from "react";
import PromptHistory from "./PromptHistory";

interface HistoryItem {
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

interface ImageGeneratorProps {
  generateImage: (
    text: string
  ) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
}

export default function ImageGenerator({ generateImage }: ImageGeneratorProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<{
    url: string;
    prompt: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("promptHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateImage(inputText);

      if (!result.success) {
        throw new Error(result.error || "Failed to generate image");
      }

      if (result.imageUrl) {
        const img = new Image();
        const url = result.imageUrl;

        img.onload = () => {
          // Set as current image
          setCurrentImage({ url, prompt: inputText });

          // Add to history immediately
          const historyItem = {
            prompt: inputText,
            imageUrl: url,
            createdAt: new Date().toISOString(),
          };
          const updatedHistory = [historyItem, ...history].slice(0, 9);
          setHistory(updatedHistory);
          localStorage.setItem("promptHistory", JSON.stringify(updatedHistory));
        };
        img.src = url;
      } else {
        throw new Error("No image URL received");
      }

      setInputText("");
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate image"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistoryItem = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("promptHistory", JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("promptHistory");
  };

  const handleHistoryItemClick = (item: HistoryItem) => {
    // Set the clicked history item as current image
    setCurrentImage({
      url: item.imageUrl,
      prompt: item.prompt,
    });
    // Scroll to top to see the expanded image
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col gap-8 p-8">
      <header className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-black/[.05] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.145] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Describe the image you want to generate..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </header>

      <main className="flex-1 flex flex-col items-center gap-8">
        {error && (
          <div className="w-full max-w-2xl p-4 bg-red-50 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        {currentImage && (
          <div className="w-full max-w-2xl">
            <p className="text-sm mb-2 text-gray-600">
              Current prompt: {currentImage.prompt}
            </p>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={currentImage.url}
                alt="Generated artwork"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}

        {isLoading && (
          <div className="w-full max-w-2xl flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black dark:border-gray animate-spin" />
          </div>
        )}

        <PromptHistory
          history={history}
          onSelectPrompt={prompt => setInputText(prompt)}
          onDeleteItem={handleDeleteHistoryItem}
          onClearHistory={handleClearHistory}
          onImageClick={handleHistoryItemClick}
        />
      </main>
    </div>
  );
}
