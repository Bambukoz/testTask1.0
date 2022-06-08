import './App.css';
import Form from './Modules/Form.tsx'
import Profile from "./Modules/Profile.tsx";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import Private from "./hoc/Private.tsx";
import * as React from "react";
import {PrivateProvider} from "./hoc/PrivateProvider.tsx";

function App() {
  return (
    <PrivateProvider>
        <BrowserRouter>
            <div className={'main'}>
                <div className={'title'}> <h1>Only.</h1> </div>
                <div className="loginPage">

                    <Routes>
                        <Route path={'login'} element={<Form/>}/>
                        <Route path={'profile'} element={
                            <Private>
                                <Profile/>
                            </Private>
                        }/>
                        <Route path={'*'} element={<Navigate replace to="login" />}/>
                    </Routes>

                </div>
            </div>
        </BrowserRouter>
    </PrivateProvider>




  );
}

export default App;
