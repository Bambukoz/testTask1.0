import {useContext} from "react";
import {AuthContext} from "./PrivateProvider.tsx";

export function useAuth() {
    console.log(useContext(AuthContext))
    return useContext(AuthContext)
}
