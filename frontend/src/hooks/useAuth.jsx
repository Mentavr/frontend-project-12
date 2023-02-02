import AuthContecx from "../context/localStorageContext";
import { useContext } from "react";

const useAuth = () => useContext(AuthContecx);

export default useAuth;