import { useEffect, useRef } from 'react';
/**
 * Hook that handles clicks outside of the referenced element
 * @param handler - Function to call when click outside occurs
 * @returns ref to attach to the element
 */
export function useClickOutside(handler) {
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handler]);
    return ref;
}
