import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithConfirm from './PopupWithConfirm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import MyProfile from './MyProfile'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api';
import Register from './Register'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import { useHistory } from 'react-router-dom';
import { getContent } from '../utils/userAuth.js' 
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditImagePopupOpen, setIsEditImagePopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('122222222222222');
    const [idDeleteCard, setIdDeleteCard] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '', _id: '' })
    const [cards, setCards] = React.useState([]);
    function handleLogin() {
        setLoggedIn(true);
    }
    const history = useHistory();

    React.useEffect(() => {
        tokenCheck();
    }, [])
    function tokenCheck() {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            getContent(jwt)
                .then((res) => {
                    if (res) {
                        console.log(res.data.email)
                        setEmail(res.data.email)
                        setLoggedIn(true);
                        history.push("/")
                    }
                })
        }
    }
    function handleSetEmail(email) {
        setEmail(email);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleConfirmDeleteClick(deleteCard) {
        setIsConfirmPopupOpen(true);
        setIdDeleteCard(deleteCard._id);
    }

    function handleCardClick(card) {
        setIsEditImagePopupOpen(true);
        setSelectedCard({ name: card.name, link: card.link });
    }


    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditImagePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setIdDeleteCard('');
        setSelectedCard({ name: '', link: '' });
    }
    function handleUpdateUser(userData) {
        api.updateUserTask(userData, '')
            .then(() => {
                setCurrentUser({ name: userData.name, about: userData.about, avatar: currentUser.avatar, _id: currentUser._id })
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))

    }
    function handleUpdateAvatar(avatarData) {
        api.updateUserTask(avatarData, 'avatar')
            .then(() => {
                setCurrentUser({ name: currentUser.name, about: currentUser.about, avatar: avatarData.avatar, _id: currentUser._id });
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }

    React.useEffect(() => {
        Promise.all([api.getUserTasks(), api.getCardTasks()])
            .then(([userInform, cards]) => {
                setCurrentUser(userInform);
                setCards(cards);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }
    function handleAddCard(сardData) {
        api.createCardTask(сardData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }
    function handleCardDelete() {
        api.deleteTask(idDeleteCard)
            .then(() => {
                setCards(cards.filter((card) => { return card._id !== idDeleteCard }));
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }

    return ( 
        <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <Route path='/sign-up'>
                        <Register />
                    </Route>
                    <Route path='/sign-in'>
                        <Login email={handleSetEmail} handleLogin={handleLogin} />
                    </Route>
                    <ProtectedRoute
                        path="/"
                        loggedIn={loggedIn}
                        component={MyProfile}
                        isEditProfilePopupOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        email={email}
                        onUpdateUser={handleUpdateUser}
                        onAddCard={handleAddCard}
                        isAddPlacePopupOpen={isAddPlacePopupOpen}
                        isConfirmPopupOpen={isConfirmPopupOpen} onDeleteCard={handleCardDelete}
                        isEditAvatarPopupOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar}
                        cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                        onCardLike={handleCardLike} onDeleteClick={handleConfirmDeleteClick}
                        card={selectedCard} isEditImagePopupOpen={isEditImagePopupOpen}
                    />


                </Switch>
            </CurrentUserContext.Provider>
        </div >
    );
}

export default App;
