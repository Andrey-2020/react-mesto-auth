import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);
    return (
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} header={true}>
            <fieldset className="form__input-container form__input-container_type_edit">
                <input className="form__input form__input_type_name-input" type="text" name="name"
                    placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" required id="name-input" value={name} onChange={handleNameChange} />
                <span className="name-input-error form__input-error"></span>
                <input className="form__input form__input_type_job-input" type="text" name="profession"
                    placeholder="Исследователь океана" minLength="2" maxLength="200" id="profession-input"
                    required value={description} onChange={handleDescriptionChange} />
                <span className="profession-input-error form__input-error"></span>
            </fieldset>
            <button className="form__button" type="submit" aria-label="submit">Сохранить</button>
        </PopupWithForm>
    )
}
export default EditProfilePopup;