import { useCallback, useRef } from "react";

export default function useDebounce(callback:Function, delay:number) {
    const timer = useRef<ReturnType<typeof setTimeout>>();

    const debounceCallback = useCallback((...args:any) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
        
    }, [callback, delay])

    return debounceCallback;
}