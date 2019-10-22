export function closeImage (){
    picture.classList.remove('picture_is-open');
};

export function addCard(event){
let arr = {name: nameInput.value, link: linkInput.value};
apiReqest.addCard(arr)
    .catch(err => console.log(err))
nameInput.value = '';
linkInput.value = '';

popupCreatingCard.close();//class method
event.target.querySelector('button').classList.remove('popup__button_active');
event.target.querySelector('button').setAttribute('disabled', true);
event.preventDefault();
};


export function saveProfile(event) {
let name = popupProfile.querySelector('.popup__input_type_name').value;
let userInfo = popupProfile.querySelector('.popup__input_type_link-url').value;
popupProfile.classList.remove('popup_is-opened');
apiReqest.patchProfile(name, userInfo)
    .then(res => {
        userInfoName.textContent = res.name;
        userInfoJob.textContent = res.about;
        popupProfile.querySelector('.popup__input_type_name').value = res.name;
        popupProfile.querySelector('.popup__input_type_link-url').value = res.about;
    })
    .catch(err => console.log(err))

event.preventDefault();

}

export function verificationField(event) {
let form = event.target.parentElement;
let textField = event.target;
if (textField.value.length === 0) {
    form.querySelector('.warning').style.display = 'block';
    form.querySelector('.warning').textContent = 'Это обязательное поле'
} else if (textField.getAttribute('placeholder') !== 'Ссылка на картинку') {
    if (textField.value.length > 30 || textField.value.length < 2){
        form.querySelector('.warning').style.display = 'block';
        form.querySelector('.warning').textContent = 'Должно быть от 2 до 30 символов'
    } else {
        form.querySelector('.warning').style.display = 'none';
    };
} else {form.querySelector('.warning').style.display = 'none';}
}
//

export function changeStatusButton(event) {
verificationField(event)
let form = event.target.parentElement
let formContent = form.parentElement;
let addButton = formContent.elements.button;
if((formContent.querySelectorAll('.warning')[0].style.display === 'none') || (formContent.querySelectorAll('.warning')[1].style.display === 'none')){
    addButton.classList.add('popup__button_active');
    addButton.removeAttribute('disabled');
}
if((formContent.querySelectorAll('.warning')[0].style.display === 'block') || (formContent.querySelectorAll('.warning')[1].style.display === 'block')){
    addButton.classList.remove('popup__button_active');
    addButton.setAttribute('disabled', true);
}
if (formContent[0].value.length === 0) {
    addButton.classList.remove('popup__button_active');
    addButton.setAttribute('disabled', true);
}
if (formContent[1].value.length === 0) {
    addButton.classList.remove('popup__button_active');
    addButton.setAttribute('disabled', true);
}
}