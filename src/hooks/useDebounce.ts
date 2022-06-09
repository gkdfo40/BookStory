import { useEffect, useState } from 'react'

export default function useDebounce<T>(value: T, delay: number = 500) {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [delay, value])
  return debounceValue
}
