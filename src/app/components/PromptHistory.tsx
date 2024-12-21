"use client";

import { useState } from "react";

interface PromptHistoryProps {
  history: HistoryItem[];
  onSelectPrompt: (prompt: string) => void;
  onDeleteItem: (index: number) => void;
  onClearHistory: () => void;
  onImageClick: (item: HistoryItem) => void;
}

interface HistoryItem {
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export default function PromptHistory({
  history,
  onSelectPrompt,
  onDeleteItem,
  onClearHistory,
  onImageClick,
}: PromptHistoryProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Prompts</h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Clear History
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {history.map((item, index) => (
          <div key={index} className="relative group cursor-pointer">
            <img
              src={item.imageUrl}
              alt={item.prompt}
              className="w-full h-32 object-cover rounded-lg hover:opacity-90"
              onClick={() => onImageClick(item)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-sm truncate">{item.prompt}</p>
              <div className="flex justify-between items-center">
                <p className="text-xs opacity-75">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onSelectPrompt(item.prompt);
                    }}
                    className="text-xs text-blue-300 hover:text-blue-100"
                  >
                    Reuse
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onDeleteItem(index);
                    }}
                    className="text-xs text-red-300 hover:text-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
