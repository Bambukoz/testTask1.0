import * as React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {useState} from "react";
import {IForm} from "./app.interface"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hoc/useAuth.tsx";


function Form() {
    const [passError, setPassError] = useState(false)
    const {login} = useAuth()
    const [isDisabled, setIsDisabled] = useState(false)
    const {register, handleSubmit, getValues, formState: {errors}} = useForm<IForm>({mode: "onChange"});
    const [loginError, setLoginError] = useState(false)
    const PASSWORD = 'password';
    const LOGIN = 'steve.jobs@example.com'
    const navigate = useNavigate();


    const onSubmit: SubmitHandler<IForm> = async (data) => {

        await setIsDisabled(true);

        const user = getValues('login')


        await axios.get('http://localhost:3000/users').then(response => {

            const persons = response.data;
            if (persons.map(i => i.login) && getValues('login') === LOGIN && persons.map(i => i.password) && getValues('password') !== PASSWORD) {
                setPassError(true)
                setTimeout(() => {
                    setIsDisabled(false);
                }, 2000)
            }
            if (persons.map(i => i.login) && getValues('login') === LOGIN && persons.map(i => i.password) && getValues('password') === PASSWORD) {
                return login(user, () => navigate('/profile', {state: getValues('login')}))
            } else {
                setLoginError(true)
                setTimeout(() => {
                    setIsDisabled(false);
                }, 2000)

            }
        })

    };


    return (


        <form className={'login-form'} onSubmit={handleSubmit(onSubmit)}>
            {(loginError) && <div className={'loginError'}><span
                className={'eclipse'}>!</span>{`Пользователя ${getValues('login')} не существует`}</div>}
            {(passError) && <div className={'loginError'}><span
                className={'eclipse'}>!</span>{`У пользователя ${getValues('login')} другой пароль`}</div>}
            <label className={'label'}>Логин</label>

            <div className={'container'}>
                {errors.login && <div className={'error'}>{errors.login.message}</div>}


                <input

                    className={`login ${errors.login ? 'login-error' : ''}`}
                    {...register('login', {
                        required: 'Обязательное поле'

                    })}

                />
            </div>
            <label className={'label'}>Пароль</label>
            <input className={`password ${passError ? `password-error` : ''}`} {...register('password')}
                   type={'password'}/>
            <div className={'checkbox'}>
                <input className={'customCheckbox'} type={'checkbox'}/><label className={'label'}>Запомнить
                пароль</label>
            </div>
            <input className={'submit'} type={'submit'} value={'Войти'} disabled={isDisabled}/>
        </form>

    );
}

export default Form
