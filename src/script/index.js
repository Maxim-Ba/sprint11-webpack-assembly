//imports
import {Api} from './classes.js';
import {Card} from './classes.js';
import {CardList} from './classes.js';
import {Popup} from './classes.js';
import '../pages/index.css'
// --class--


//--variables--
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk'
const button = document.querySelector('.user-info__button');
const userPhoto = document.querySelector('.user-info__photo');
const imageClose = document.querySelectorAll('.popup__close')[2];
const addButton = document.querySelector('.popup__button');
addButton.setAttribute('type','submit');
addButton.setAttribute('disabled', true);
const addForm = document.forms.new;
const nameInput = addForm.elements.name;
const linkInput = addForm.elements.link;
const editButton = document.querySelector('.button_user-edit');
const editButtonSave = document.querySelector('.popup__button_font-size');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
editButtonSave.setAttribute('type','submit');
const picture = document.querySelector('.picture')
const pictureContent = document.querySelector('.picture__content');
const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const popupCreatingCard = new Popup(popup)//-------------------------Popup class
const popupProfile = document.querySelector('.popup-profile');
const popupEditingPrifile = new Popup(popupProfile)//-------------------------Popup class
const formNew = document.forms.new;
const formNewTwo = document.forms.newtwo;
const SERVER_ADRESS = serverUrl + '/cohort3/';
const TOKEN = 'df5f3abf-3709-47bb-a7ec-6a95c96af683';
const apiReqest = new Api({                //-------------------------Api class
    baseUrl: SERVER_ADRESS,
    headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
    }
});
apiReqest.getUserInformation()
    .then((result) => {
        userInfoName.textContent = result.name;
        userInfoJob.textContent = result.about;
        apiReqest.id = result['_id'];
        popupProfile.querySelector('.popup__input_type_name').value = result.name;
        popupProfile.querySelector('.popup__input_type_link-url').value = result.about;
        userPhoto.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((err) => console.log(err));  
    
const cardContainer = new CardList(placesList);//-------------------------CardList class
//--func--
function closeImage (){
        picture.classList.remove('picture_is-open');
};

function addCard(event){
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


function saveProfile(event) {
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

function verificationField(event) {
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


function changeStatusButton(event) {
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


//--EL--

button.addEventListener('click', function () {
    popupCreatingCard.open();
} );
editButton.addEventListener('click', function () {
    popupEditingPrifile.open();
} );
addForm.addEventListener('submit', addCard);
imageClose.addEventListener('click', closeImage);
editButtonSave.addEventListener('click', saveProfile);
formNew.addEventListener('input', changeStatusButton);
formNewTwo.addEventListener('input', changeStatusButton);
