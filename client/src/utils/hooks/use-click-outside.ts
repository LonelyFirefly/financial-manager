import { useEffect, useRef } from 'react'

/**
 * Hook that handles clicks outside of the referenced element
 * @param handler - Function to call when click outside occurs
 * @returns ref to attach to the element
 */
export function useClickOutside<T extends HTMLElement>(
  handler: () => void
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handler])

  return ref
} 