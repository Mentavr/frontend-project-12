import { useContext } from 'react';

import AuthContext from '../context/loggerContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
