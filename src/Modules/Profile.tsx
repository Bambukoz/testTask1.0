import * as React from 'react';
import {useLocation} from "react-router-dom";
import {useAuth} from "../hoc/useAuth.tsx";
import {useNavigate} from "react-router-dom";
const Profile = () => {
    const {logout} = useAuth()
    const navigate= useNavigate()
    const location = useLocation()
    return (

        <div className={'profile'}>
            <div className={'profile-container'}>Здравствуйте, <span className={'login-state'}>{location.state}</span></div>
                <button className={'logout'} onClick={()=> logout(() => navigate('login'), {replace: true}  )}>Выйти</button>
        </div>
    );
};

export default Profile;
