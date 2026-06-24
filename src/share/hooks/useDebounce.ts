import { useState, useEffect } from "react";

/**
 * Hook để debounce một giá trị
 * @param value - Giá trị cần debounce
 * @param delay - Thời gian chờ (ms)
 * @returns Giá trị đã debounce
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 500)
 *
 * useEffect(() => {
 *   // Gọi API khi debouncedSearchTerm thay đổi
 *   if (debouncedSearchTerm) {
 *     fetchResults(debouncedSearchTerm)
 *   }
 * }, [debouncedSearchTerm])
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
