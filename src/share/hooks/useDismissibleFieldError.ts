import { useCallback, useState } from "react";

export function useDismissibleFieldError(error?: string) {
  const [dismissedError, setDismissedError] = useState<string | undefined>();

  const hideError = useCallback(() => {
    if (error) {
      setDismissedError(error);
    }
  }, [error]);

  return {
    hideError,
    visibleError: error && dismissedError !== error ? error : undefined,
  };
}
