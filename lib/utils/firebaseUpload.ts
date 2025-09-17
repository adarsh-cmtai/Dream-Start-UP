// utils/firebaseUpload.ts
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from "firebase/storage";
import { storage } from "../firebase";

export interface UploadProgress {
  progress: number;
  isUploading: boolean;
  error: string | null;
  downloadURL: string | null;
}

export interface UploadConfig {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  folder?: string;
}

export type UploadCallback = (progress: UploadProgress) => void;

export class FirebaseUploader {
  private static validateFile(file: File, config: UploadConfig): string | null {
    const maxSize = (config.maxSizeInMB || 5) * 1024 * 1024; // Convert MB to bytes
    const allowedTypes = config.allowedTypes || [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (file.size > maxSize) {
      return `File size must be less than ${config.maxSizeInMB || 5}MB`;
    }

    if (!allowedTypes.includes(file.type)) {
      return `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`;
    }

    return null;
  }

  private static generateFileName(file: File, folder: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split(".").pop();
    return `${folder}/${timestamp}-${randomString}.${extension}`;
  }

  static uploadImage(
    file: File,
    config: UploadConfig,
    onProgress: UploadCallback
  ): { uploadTask: UploadTask | null; cancel: () => void } {
    // Validate file
    const validationError = this.validateFile(file, config);
    if (validationError) {
      onProgress({
        progress: 0,
        isUploading: false,
        error: validationError,
        downloadURL: null,
      });
      return { uploadTask: null, cancel: () => {} };
    }

    // Generate file name and create reference
    const fileName = this.generateFileName(file, config.folder || "uploads");
    const storageRef = ref(storage, fileName);

    // Create upload task
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress({
          progress,
          isUploading: true,
          error: null,
          downloadURL: null,
        });
      },
      (error) => {
        console.error("Upload failed:", error);
        onProgress({
          progress: 0,
          isUploading: false,
          error: error.message,
          downloadURL: null,
        });
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onProgress({
            progress: 100,
            isUploading: false,
            error: null,
            downloadURL,
          });
        });
      }
    );

    return {
      uploadTask,
      cancel: () => uploadTask.cancel(),
    };
  }
}
