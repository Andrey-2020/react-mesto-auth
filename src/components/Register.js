import React from 'react';
import Header from './Header'
import InfoTooltip from './InfoTooltip'
import { useHistory } from 'react-router-dom';
import { register } from '../utils/userAuth.js'
function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isInfoTooltip, setInfoTooltip] = React.useState(false);
    const [result, setResult] = React.useState(false);
    const history = useHistory();
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault()
        register(password, email)
            .then((res) => {
                console.log(res)
                if (res) {
                    setResult(true)
                    setInfoTooltip(true)
                    setEmail('')
                    setPassword('')
                } else {
                    setResult(false)
                    setInfoTooltip(true)
                }
            })
            .catch((err) => {
                return console.log(err)
            })
    }

    function onClose() {
        setInfoTooltip(false)
        setResult(false)
    }

    function handleRegistrPush() {
        history.push('/sign-in');
    }
    return (
        <>
            <Header >
                <button className={'header__sign'} onClick={handleRegistrPush}>Войти</button>
            </Header>
            <section className={'sign'}>
                <div className={`sign__container`}>
                    <h2 className={`sign__heading`}>Регистрация</h2>
                    <form className={`form form_type_sign`} name={`form-login`} onSubmit={handleSubmit}>
                        <fieldset className="form__input-container form__input-container_type_sign">
                            <input className="form__input form__input-sign form__input_type_username" type="email" name="username" placeholder="Email"
                                minLength="2" maxLength="30" id="username-input" value={email} onChange={handleEmailChange} required />
                            <span className="username-input-error form__input-error"></span>
                            <input className="form__input form__input-sign form__input_type_password" type="password" name="password"
                                placeholder="Пароль" id="password-input" value={password} onChange={handlePasswordChange} required />
                            <span className="password-input-error form__input-error"></span>
                        </fieldset>
                        <button className="form__button form__button_type_sign" type="submit" aria-label="submit">Зарегистрироваться</button>
                    </form>
                    <button className={'sign__button'} onClick={handleRegistrPush}>Уже зарегистрированы? Войти</button>
                </div>
            </section>
            <InfoTooltip isOpen={isInfoTooltip} onClose={onClose} result={result} />
        </>
    )
}

export default Register;