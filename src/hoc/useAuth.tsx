import {useContext} from "react";
import {AuthContext} from "./PrivateProvider.tsx";

export function useAuth() {
    return useContext(AuthContext)
}
