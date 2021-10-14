import { useState, useCallback, useEffect } from 'react';

const useAsync = <T, E = string>(
    asyncFunction: () => Promise<T>, 
    immediate = true) => {
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);

    // The execute function wraps asyncFunction and
    // handles settings the state for pending, value, and error.
    // useCallback ensure the below useEffect is not called
    // on every render, but only if asyncFunction changes.

    const execute = useCallback(() => {
        setStatus('pending');
        setValue(null);
        setError(null);

        return asyncFunction()
                .then((response: any) => {
                    setValue(response);
                    setStatus('success')
                }).catch((error: any) => {
                    setError(error)
                    setStatus('error');
                })
    }, [asyncFunction])

    // Call execute if we want to fire it right away.
    // Otherwise execute gets called on-demand.
    useEffect(() => {
        if(immediate) {
            execute();
        }
    }, [execute, immediate]);

    return {
        execute,
        status,
        value,
        error,
    }
}