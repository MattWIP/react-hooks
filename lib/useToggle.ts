import { useCallback, useState } from 'react';

const useToggle = (initialState: Boolean = false) => {
    // initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the component,
    // This function changes the boolean value to the opposite
    const toggle = useCallback(() => setState(state => !state), []);

    return [state, toggle];
}

export default useToggle;