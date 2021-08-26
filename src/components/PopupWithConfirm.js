import React from 'react';
import PopupWithForm from './PopupWithForm'
function PopupWithConfirm(props) {
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onDeleteCard();
    }
    return (
        <PopupWithForm name="confirm" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} header={true}>
             <button className="form__button" type="submit" aria-label="submit">Да</button>
        </PopupWithForm>
    );
}

export default PopupWithConfirm;
