"use client";
import React, { useState } from "react";
import Label from "@/components/Label";
import { ClassName } from "@/types";
import { createGeneration } from "@/lib";
import { useGenerationStore } from "@/stores";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenerationCreate, GenerationCreateSchema } from "@/schemas/generation";

export type GenerationFormProps = { className?: ClassName };

const GenerationForm = ({ className }: GenerationFormProps) => {
  const { addGeneration } = useGenerationStore();
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    setError,
  } = useForm<GenerationCreate>({
    resolver: zodResolver(GenerationCreateSchema),
    defaultValues: {
      prompt: "",
      file: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setValue("file", selectedFile, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileBoxClick = () => {
    if (!preview) {
      inputFileRef.current?.click();
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue("file", undefined as any);
    setPreview(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const onSubmit = async (data: GenerationCreate) => {
    try {
      const result = await createGeneration({
        prompt: data.prompt,
        file: data.file,
      });
      addGeneration({ ...result, prompt: data.prompt });

      if (result?.status === "COMPLETED") {
        reset();
        setPreview(null);
        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }
      } else {
        setError("prompt", { message: "Generation failed. Please try again." });
      }
    } catch (_error) {
      setError("prompt", { message: "Generation failed. Please try again." });
    }
  };

  // Wrap handleSubmit to prevent multiple submissions
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }
    handleSubmit(onSubmit)(e);
  };

  return (
    <div
      className={`bg-var-secondary rounded-xl shadow-lg px-6 py-5 ${className}`}
    >
      <form onSubmit={handleFormSubmit}>
        <Label htmlFor="image_file" text="Upload Image" />
        <div
          className={`border-2 border-dashed ${
            errors.file ? "border-red-500" : "border-var-primary"
          } rounded-lg p-6 text-center ${
            !preview ? "hover:border-var-primary-hover" : ""
          } transition-colors w-full h-60 md:h-72 flex justify-center items-center mt-2 cursor-pointer`}
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
                onClick={handleRemoveImage}
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
                png, jpg, webp up to 10 MB
              </p>
            </div>
          )}
        </div>
        {errors.file && (
          <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
        )}

        <Label htmlFor="prompt" className="mt-7" text="Enter Prompt" />
        <textarea
          {...register("prompt")}
          id="prompt"
          className={`w-full mt-2 p-3 border rounded-lg ${
            errors.prompt ? "border-red-500" : "border-var-primary"
          } focus:outline-none text-var-primary text-sm`}
          rows={4}
          placeholder="Enter your prompt..."
        />
        {errors.prompt && (
          <p className="text-red-500 text-sm mt-1">{errors.prompt.message}</p>
        )}

        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          text="Generate"
          className={`mt-4 w-full py-3 rounded-lg transition-colors`}
        />
      </form>
    </div>
  );
};

export default GenerationForm;
