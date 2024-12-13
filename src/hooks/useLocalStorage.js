import { useEffect } from 'react'

export function useLocalStorage(key, value) {
  const savedValue = localStorage.getItem(key)
  const storedValue = savedValue < value ? value : savedValue

  useEffect(() => {
    if (value <= savedValue) return
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, savedValue, key])

  return [storedValue]
}
