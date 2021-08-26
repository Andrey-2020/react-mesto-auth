import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithConfirm from './PopupWithConfirm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { useHistory } from 'react-router-dom';
function MyProfile(props) {
    const history = useHistory();
    function onSignOut() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }
    return (
        <>
            <Header >
                <div className={'header__signOut'}>
                    <p className={'header__email'}>{props.email}</p>
                    <button className={'header__button-signOut'} onClick={onSignOut}>Выйти</button>
                </div>
            </Header>
            <Main cards={props.cards} onEditProfile={props.onEditProfile} onAddPlace={props.onAddPlace} onEditAvatar={props.onEditAvatar} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onDeleteClick={props.onDeleteClick} />
            <Footer />
            <EditProfilePopup isOpen={props.isEditProfilePopupOpen} onClose={props.onClose} onUpdateUser={props.onUpdateUser} />
            <AddPlacePopup isOpen={props.isAddPlacePopupOpen} onClose={props.onClose} buttonText={"Создать"} onAddCard={props.onAddCard} />
            <PopupWithConfirm isOpen={props.isConfirmPopupOpen} onClose={props.onClose} onDeleteCard={props.onDeleteCard} />
            <EditAvatarPopup isOpen={props.isEditAvatarPopupOpen} onClose={props.onClose} onUpdateAvatar={props.onUpdateAvatar} />
            <ImagePopup card={props.card} isOpen={props.isEditImagePopupOpen} onClose={props.onClose} />
        </>
    );
}

export default MyProfile;
