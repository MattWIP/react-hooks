import { useState, useCallback, useEffect } from 'react';

const useAsync = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState('idle');
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    // The execute function wraps asyncFunction and
    // handles settings the state for pending, value, and error.
    // useCallback ensure the below useEffect is not called
    // on every render, but only if asyncFunction changes.

    const execute = useCallback(() => {
        setStatus('pending');
        setValue(null);
        setError(null);

        return asyncFunction()
                .then((response) => {
                    setValue(response);
                    setStatus('success')
                }).catch((error) => {
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