import { useEffect, useRef, useState } from 'react';
/**
 * Hook that observes element resize and returns its dimensions
 * @returns Object with ref to attach to element and current dimensions
 */
export function useResizeObserver() {
    const ref = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });
    useEffect(() => {
        const element = ref.current;
        if (!element)
            return;
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setDimensions({ width, height });
            }
        });
        resizeObserver.observe(element);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    return [ref, dimensions];
}
