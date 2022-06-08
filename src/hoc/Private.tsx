import {useLocation,useNavigate} from "react-router-dom";
import {useAuth} from "./useAuth.tsx";


const Private = ({children}) => {

    const navigate = useNavigate()
    const location = useLocation();
    const {user} = useAuth();

    if(!user){
        return navigate('login', {state: location})
    }
    return children
};

export default Private;
