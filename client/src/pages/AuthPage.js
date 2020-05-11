import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect( () => {
        message(error)
    }, [error, message])

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }

    const registerHandler = async () => {
        try{
            clearError()
            const data = await request('/api/login/register', 'POST', {...form})
            console.log('Data', data)
            message(data.message)
        } catch (e){}
    }
    const loginHandler = async () => {
        try{
            clearError()
            const data = await request('/api/login/login', 'POST', {...form})
            console.log('Data', data)
            message(data.message)
        } catch (e){}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Новосной сайт</h1>
                    <div className="card">
                    <div className="card-content">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="row">
                                <div className="input-field">
                                    <input 
                                        id="email" 
                                        type="text" 
                                        className="validate"
                                        name="email"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email"> E-Mail </label>
                                </div>
                                <div className="input-field">
                                    <input 
                                        id="password" 
                                        type="password" 
                                        className="validate"
                                        name="password"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-action center-align">
                        <button 
                            className="waves-effect waves-light btn-small" 
                            style={{marginRight: 5}}
                            onClick={loginHandler}
                            disabled={loading}
                        >Войти</button>
                        <button 
                            className="waves-effect waves-light btn-small" 
                            style={{marginLeft: 5}}
                            onClick={registerHandler}
                            disabled={loading}
                        > Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}