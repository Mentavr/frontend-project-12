import { useState } from 'react';
import AuthContext from './localStorageContext';


const AutorProvide = ({children}) => {
    const [logger, setLogged] = useState(false);
    const logIn = () =>  setLogged(true);
    const logOut = () =>  {
      localStorage.removeItem('userId');
      setLogged(false);
    }
    
    return (
      <AuthContext.Provider value={{logIn, logger, logOut}}>
        {children}
      </AuthContext.Provider>
    )
  }

  export default AutorProvide;