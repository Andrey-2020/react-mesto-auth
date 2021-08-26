
function PopupWithForm(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container`}>
                <h2 className={props.header ? `popup__heading popup__heading_type_${props.name}` : 'popup__heading_type_hide'}>{props.title}</h2>
                <form className={`form form_type_${props.name}`} name={`form-${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                </form>
                <button className="popup__button" type="button" aria-label="close" onClick={props.onClose}></button>
            </div>
        </section>
    );
}

export default PopupWithForm;
