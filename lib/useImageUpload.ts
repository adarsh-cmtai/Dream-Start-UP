// hooks/useImageUpload.ts
import { useState, useCallback } from "react";
import {
  FirebaseUploader,
  UploadConfig,
  UploadProgress,
} from "../lib/utils/firebaseUpload";

export const useImageUpload = (config: UploadConfig = {}) => {
  const [uploadState, setUploadState] = useState<UploadProgress>({
    progress: 0,
    isUploading: false,
    error: null,
    downloadURL: null,
  });

  const [uploadTask, setUploadTask] = useState<any>(null);

  const uploadImage = useCallback(
    (file: File) => {
      const { uploadTask: task, cancel } = FirebaseUploader.uploadImage(
        file,
        config,
        (progress) => {
          setUploadState(progress);
        }
      );

      setUploadTask({ task, cancel });
      return task;
    },
    [config]
  );

  const cancelUpload = useCallback(() => {
    if (uploadTask?.cancel) {
      uploadTask.cancel();
      setUploadState({
        progress: 0,
        isUploading: false,
        error: "Upload cancelled",
        downloadURL: null,
      });
    }
  }, [uploadTask]);

  const resetUpload = useCallback(() => {
    setUploadState({
      progress: 0,
      isUploading: false,
      error: null,
      downloadURL: null,
    });
  }, []);

  return {
    uploadImage,
    cancelUpload,
    resetUpload,
    ...uploadState,
  };
};
