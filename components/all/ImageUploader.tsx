"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useImageUpload } from "@/lib/useImageUpload";
import { UploadConfig } from "@/lib/utils/firebaseUpload";

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  config?: UploadConfig;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  currentImageUrl = "",
  config = {},
  disabled = false,
  className = "",
  placeholder = "Choose image...",
}) => {
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadImage,
    cancelUpload,
    resetUpload,
    progress,
    isUploading,
    error,
    downloadURL,
  } = useImageUpload(config);

  // Update parent component when upload completes
  React.useEffect(() => {
    if (downloadURL) {
      onImageUploaded(downloadURL);
      setPreviewUrl(downloadURL);
    }
  }, [downloadURL, onImageUploaded]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // FIXED here
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Start upload
    uploadImage(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    onImageUploaded("");
    resetUpload();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancelUpload = () => {
    cancelUpload();
    setPreviewUrl(currentImageUrl);
  };

  // Generate a stable ID once
  const fileInputId = `image-upload-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Input */}
      <div className="flex items-center space-x-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
          className="hidden"
          id={fileInputId}
        />

        <label
          htmlFor={fileInputId}
          className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
            disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {placeholder}
        </label>

        {isUploading && (
          <Button onClick={handleCancelUpload} variant="outline" size="sm">
            Cancel
          </Button>
        )}

        {previewUrl && !isUploading && (
          <Button onClick={handleRemoveImage} variant="destructive" size="sm">
            Remove
          </Button>
        )}
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Uploading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div className="mt-4">
          <Image
            src={previewUrl}
            alt="Preview"
            width={300}
            height={200}
            className="rounded-lg border object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
