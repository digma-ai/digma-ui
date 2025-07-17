import type { AxiosProgressEvent } from "axios";
import axios from "axios";
import { useRef, useState } from "react";

export interface UseFormDataRequestResult {
  send: (formData: FormData) => Promise<void>;
  abort: () => void;
  progress: number;
  isSending: boolean;
}

export interface UseFormDataRequestOptions<T> {
  url: string;
  method?: string;
  withCredentials?: boolean;
  onSuccess: (response: T) => void;
  onError: (error: unknown) => void;
}

export const useFormDataRequest = <T = unknown>({
  method = "POST",
  url,
  withCredentials,
  onSuccess,
  onError
}: UseFormDataRequestOptions<T>): UseFormDataRequestResult => {
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const send = async (formData: FormData) => {
    abortControllerRef.current = new AbortController();

    setIsSending(true);
    setProgress(0);

    try {
      const response = await axios.request<T>({
        method,
        url,
        withCredentials,
        data: formData,
        signal: abortControllerRef.current.signal,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressPercent);
          }
        }
      });

      onSuccess(response.data);
    } catch (err) {
      onError(err);
      setProgress(0);
      throw err;
    } finally {
      setIsSending(false);
      abortControllerRef.current = null;
    }
  };

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return { send, abort, progress, isSending };
};
