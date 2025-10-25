"use client";
import React, { useState } from "react";
import Image from "next/image";
const GenerationForm = () => {
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileBoxClick = () => {
    if (!preview) {
      inputFileRef.current?.click();
    }
  };
  return (
    <div className="bg-var-secondary rounded-xl shadow-lg px-6 py-5 flex-1">
      <h2 className="text-[16px] font-medium">Generate Image</h2>
      <form>
        <div
          className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${
            !preview ? "hover:border-var-primary-hover" : ""
          } transition-colors w-full h-72 flex justify-center items-center mt-3`}
          onClick={handleFileBoxClick}
        >
          {preview ? (
            <div className="relative">
              <Image
                src={preview}
                alt="Preview"
                className="h-64 w-64 rounded-lg"
                width={256}
                height={256}
                unoptimized={false}
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className="absolute top-0 right-1 text-black-500 rounded-full p-2 text-var-secondary hover:text-var-secondary-hover"
              >
                ✕
              </button>
            </div>
          ) : (
            <div>
              <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-purple-600 hover:text-purple-700 font-medium"
              >
                Upload image
              </label>
              <p className="text-sm text-var-secondary mt-1">
                png, jpg up to 10 MB
              </p>
            </div>
          )}
        </div>
        <textarea
          className="w-full mt-4 p-3 border border-gray-300 outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-var-primary"
          rows={4}
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 w-full bg-var-primary text-gray-400 py-3 rounded-lg hover:bg-var-primary-hover transition-colors"
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default GenerationForm;
