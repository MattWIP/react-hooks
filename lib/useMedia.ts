// Hook to handle variable that should adapt to media query.
import { useState, useEffect } from 'react';


const useMedia = <T>(
    queries: string[],
    values: T[],
    defaultValue: T
) => {
    // Array containing a media query list for each query
    const mediaQueryLists = queries.map((q) => window.matchMedia(q));

    // Function that gets value based on matching media query
    const getValue = () => {
        const index = mediaQueryLists.findIndex((mql) => mql.matches);

        return values?.[index] || defaultValue;
    };

    // State and setter for matched value
    const [value, setValue] = useState<T>(getValue);

    useEffect(
        () => {
            // Event listener callback
            // Note: by defining getValue outside of useEffect we ensure that it has
            // current values of hook args.

            const handler = () => setValue(getValue);

            mediaQueryLists.forEach((mql) => mql.addListener(handler));
            // Remove listeners on cleanup
            return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
        }, []
    );

    return value;
}

// Usage
// const columnCount = useMedia<number>(
//     // Media queries
//     ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
//     // Column counts (relates to above media queries by array index)
//     [5, 4, 3],
//     // Default column count
//     2
// );

