import React from 'react';
import PopupWithForm from './PopupWithForm'
import confirmed from '../images/UnionDone.jpg';
import cross from '../images/UnionFail.jpg';
function InfoTooltip(props) {


    return (
        <PopupWithForm name="infoTooltip" title="" isOpen={props.isOpen} onClose={props.onClose} header={false}>
            {props.result ?
                <div className={'form__infoTooltip-container'}>
                    <img className={'form__infoTooltip-image'} src={confirmed} />
                    <p className={'form__infoTooltip-description'}>Вы успешно зарегистрировались!</p>
                </div> :
                <div className={'form__infoTooltip-container'}>
                    <img className={'form__infoTooltip-image'} src={cross} />
                    <p className={'form__infoTooltip-description'}>Что-то пошло не так!
                        Попробуйте ещё раз.</p>
                </div>
            }
        </PopupWithForm>
    );
}

export default InfoTooltip;