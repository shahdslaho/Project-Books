import { useState, useEffect, useCallback } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // تأخير أطول للتحديثات المتتالية
    const handler = setTimeout(() => {
      if (value !== debouncedValue) {
        setDebouncedValue(value);
      }
    }, delay);

    // تنظيف المؤقت عند كل تحديث
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  // إرجاع القيمة المؤجلة
  return debouncedValue;
}