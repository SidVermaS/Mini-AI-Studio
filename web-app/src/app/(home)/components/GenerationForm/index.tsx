"use client";
import React, { useState } from "react";
import Label from "@/components/Label";
import { ClassName } from "@/types";
import { createGeneration } from "@/lib";
import { useGenerationStore } from "@/stores";
import Button from "@/components/Button";

export type GenerationFormProps = { className?: ClassName };
const GenerationForm = ({ className }: GenerationFormProps) => {
  const { addGeneration } = useGenerationStore();
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>("");
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
  const resetPromptImage = () => {
    setImage(null);
    setPreview(null);
    setPrompt("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (image && prompt.trim().length > 1) {
      try {
        // Call the API to create a new generation
        const result = await createGeneration({ prompt, file: image });
        addGeneration({ ...result, prompt });
        if (result?.status === "COMPLETED") {
          resetPromptImage();
        }
      } catch (_error) {
        //
      }
    }
  };
  // const isEnabled = !!image && prompt.trim().length > 1;
  const isEnabled=true
  return (
    <div
      className={`bg-var-secondary rounded-xl shadow-lg px-6 py-5 ${className}`}
    >
      <form onSubmit={handleSubmit}>
        <Label htmlFor="image_file" text="Upload Image" />
        <div
          className={`border-2 border-dashed border-var-primary  rounded-lg p-6 text-center ${
            !preview ? "hover:border-var-primary-hover" : ""
          } transition-colors w-full h-60 md:h-72 flex justify-center items-center mt-2`}
          onClick={handleFileBoxClick}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="h-56 w-56 md:h-64 md:w-64 rounded-lg object-cover"
                width={256}
                height={256}
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
                className="cursor-pointer text-[16px] text-var-tertiary hover:text-var-tertiary-hover font-medium"
              >
                Upload image
              </label>
              <p className="text-sm text-var-secondary mt-1">
                png, jpg up to 10 MB
              </p>
            </div>
          )}
        </div>
        <Label htmlFor="prompt" className="mt-7" text="Enter Prompt" />
        <textarea
          className="w-full mt-2 p-3 border rounded-lg border-var-primary focus:outline-none text-var-primary text-sm"
          rows={4}
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          disabled={!isEnabled}
          isLoading
          onClick={handleSubmit}
          type="submit"
          text="Generate"
            className={`mt-4 w-full py-3 rounded-lg transition-colors ${
            isEnabled
              ? "button-var-primary  hover:button-var-primary-hover"
              : "button-var-primary-disabled"
          }`}
        />
      </form>
    </div>
  );
};

export default GenerationForm;
