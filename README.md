# Pentagram - AI Image Generation Web App

A web application for generating images using Stable Diffusion 2.1, built with Next.js, Modal, and TypeScript.

## Features

- 🎨 AI Image Generation using Stable Diffusion 2.1
- 🔒 Content safety filtering
- 📱 Responsive design
- 🗂️ Image history management
- 🔄 Reusable prompts
- 🖼️ Expandable image view

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Modal (Python), FastAPI
- **Image Storage**: Vercel Blob
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+
- Modal account
- Vercel account

### Environment Variables

Create a `.env` file in the root directory:

```env
CLIENT_TOKEN_
```

Then, navigate to the project directory:

```bash
cd pentagram
```

Then, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tasks

- Take a look at the TODOs in the repo, namely:

  - `src/app/page.tsx`: This is where the user can input their prompt and generate an image. Make sure to update the UI and handle the API response to display the images generated

  - `src/app/api/generate-image/route.ts`: This is where the image generation API is implemented. Make sure to call your image generation API from Modal here

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
