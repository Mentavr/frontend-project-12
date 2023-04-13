import { useRef, useEffect } from 'react';

const useAutoFocus = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      return inputRef.current.focus();
    }
    return null;
  }, []);

  return inputRef;
};

export default useAutoFocus;
