export const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk'
export const button = document.querySelector('.user-info__button');
export const userPhoto = document.querySelector('.user-info__photo');
export const imageClose = document.querySelectorAll('.popup__close')[2];
export const addButton = document.querySelector('.popup__button');

export const addForm = document.forms.new;
export const nameInput = addForm.elements.name;
export const linkInput = addForm.elements.link;
export const editButton = document.querySelector('.button_user-edit');
export const editButtonSave = document.querySelector('.popup__button_font-size');
export const userInfoName = document.querySelector('.user-info__name');
export const userInfoJob = document.querySelector('.user-info__job');

export const picture = document.querySelector('.picture')
export const pictureContent = document.querySelector('.picture__content');
export const placesList = document.querySelector('.places-list');
export const popup = document.querySelector('.popup');

export const popupProfile = document.querySelector('.popup-profile');

export const formNew = document.forms.new;
export const formNewTwo = document.forms.newtwo;
export const SERVER_ADRESS = serverUrl + '/cohort3/';
export const TOKEN = 'df5f3abf-3709-47bb-a7ec-6a95c96af683';
//