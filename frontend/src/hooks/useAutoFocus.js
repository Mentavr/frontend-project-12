import { useRef, useEffect } from "react";

const useAutoFocus = () => {
  const inputRef = useRef(null);
  console.log(inputRef, 'в хуке')
  useEffect(() => {
    if (inputRef.current) {
       console.log(inputRef, 'в хуке и useEffect')
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
};

export default useAutoFocus;