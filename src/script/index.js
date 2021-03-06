//imports
import {TOKEN, SERVER_ADRESS, formNewTwo, formNew, popupProfile, popup, placesList, pictureContent, picture, userInfoJob, userInfoName, editButtonSave, editButton, linkInput,
    nameInput, addForm, addButton, imageClose, userPhoto, button} from './variables';
import {changeStatusButton, verificationField, saveProfile, addCard, closeImage} from './func'
import '../pages/index.css';
// --class--

class Api{
    constructor(reqest){
        this.id ='';
        this.baseUrl = reqest.baseUrl;
        this.headers = reqest.headers;
        this.authorization = this.headers.authorization;
        this.ContentType = this.headers['ContentType'];
        this.getUserInformation = this.getUserInformation.bind(this);
        this.getUserInformation()
            .then(res => {
                this.id = res['_id']
            })
        this.getInitialCards = this.getInitialCards.bind(this);
        this.cardContainer = this.getInitialCards();
    };

    getUserInformation(){
        return fetch(this.baseUrl + 'users/me', {
            headers: {
                authorization: this.authorization
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    };
    getInitialCards(){
        fetch(this.baseUrl + 'cards', {
            headers: {
                authorization: this.authorization
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((result) => {
            cardContainer.render(result);//-------------------------CardList class
            return cardContainer;
            })
        .catch(err => console.log(err))
    };

    patchProfile(name, about){
        return fetch(this.baseUrl + 'users/me', {
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(this.getUserInformation())
    };

    addCard(arr){
        return fetch(this.baseUrl + 'cards', {
            headers: {
                authorization: this.authorization,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: arr.name,
                link: arr.link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            cardContainer.addCard(res);
        })
    };

    likeReqest(idCard){
        return fetch(this.baseUrl + 'cards/like/' + idCard, {
            headers: {
                authorization: this.authorization
            },
            method: 'PUT'
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(result => {
            return result;
        })
    };

    deleteCard(idCard){
        return fetch(this.baseUrl + 'cards/' + idCard, {
            headers: {
                authorization: this.authorization
            },
            method: 'DELETE'
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject('Ошибка:' + res.status)
        })
        .then(result => { /* */
            return result;
        })
    };

    deleteLike(idCard){
        return fetch(this.baseUrl + 'cards/like/' + idCard, {
            headers: {
                authorization: this.authorization
            },
            method: 'DELETE'
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    };
}

class Card {
    constructor(element){
        this.name = element['name'];
        this.link = element['link'];
        this.idCard = element['_id'];
        this.owner = element['owner'];
        this.likesList = element.likes
        this.amountLikes = element.likes.length;
        this.elementCard = this.create(this.name, this.link, this.amountLikes, this.owner);
        this.likeIcon = this.elementCard.querySelector('.place-card__like-icon');
        this.like = this.like.bind(this);
        this.likeIcon.addEventListener('click', this.like);
        this.deleteIcon = this.elementCard.querySelector('.place-card__delete-icon');
        this.remove = this.remove.bind(this);
        this.deleteIcon.addEventListener('click', this.remove);
        this.img = this.elementCard.querySelector('.place-card__image');
        this.showImage = this.showImage.bind(this);
        this.img.addEventListener('click', this.showImage);
    }
    
    like(event){
        let isLikedByMe = false;
        for (let index = 0; index < this.likesList.length; index++) {
            if(Object.values(this.likesList[index]).includes(apiReqest.id)){
                isLikedByMe = true;
            }
        }
        if (isLikedByMe) {
            apiReqest.deleteLike(this.idCard)
            .then(res => {
                this.likesList = res.likes;                           
                this.amountLikes = res.likes.length;
                this.likeCount.textContent = this.amountLikes;
                if (this.amountLikes) {
                    this.likeIcon.classList.add('place-card__like-icon_liked')
                }else {
                    this.likeIcon.classList.remove('place-card__like-icon_liked')
                };
            })
            .catch(err => console.log(err))
        }else{
            apiReqest.likeReqest(this.idCard)
                .then(res => {
                    this.likesList = res.likes;                       
                    this.amountLikes = res.likes.length;
                    this.likeCount.textContent = this.amountLikes;
                    if (this.amountLikes) {
                        this.likeIcon.classList.add('place-card__like-icon_liked')
                    }else {
                        this.likeIcon.classList.remove('place-card__like-icon_liked')
                    };
                })
                .catch(err => console.log(err))
        } 
        event.stopPropagation();
    }
    
    remove(event){
        let isDelite = confirm('Вы действительно хотите удалить эту карточку?')
        if (isDelite) {
            apiReqest.deleteCard(this.idCard)
            .then(res =>{
                this.elementCard.parentNode.removeChild(this.elementCard);
                this.likeIcon.removeEventListener('click', this.like); 
                this.deleteIcon.removeEventListener('click', this.remove);
                }
            )
            .catch(err => console.log(err))
        }
        event.stopPropagation();
        };
    showImage(){
            picture.classList.add('picture_is-open');
            let url = this.img.style.backgroundImage
            pictureContent.setAttribute('src', url.slice(5,-2));
    }
    create(name, link, amountLikes, owner){
        let placeCard = document.createElement('div')  ;
        let placeCardImage = document.createElement('div')  ;
        let placeCardDescription = document.createElement('div')  ;
        let placeCardDeleteIcon = document.createElement('button')  ;
        let placeCardName = document.createElement('h3')  ;
        let placeCardLikeIcon = document.createElement('button')  ;
        let divLikeContainer = document.createElement('div')  ;
        let likeCount = document.createElement('p')  ;
        placeCard.classList.add('place-card') ;
        placeCardImage.classList.add('place-card__image') ;
        placeCardImage.style.backgroundImage = 'url(' + link + ')';
        placeCard.appendChild(placeCardImage) ;
        placeCardDescription.classList.add('place-card__description') ;
        placeCard.appendChild(placeCardDescription) ;
        placeCardDeleteIcon.classList.add('place-card__delete-icon') ;
        placeCardImage.appendChild(placeCardDeleteIcon) ;
        placeCardName.classList.add('place-card__name') ;
        placeCardName.textContent = name ;
        placeCardDescription.appendChild(placeCardName) ;
        likeCount.textContent = amountLikes;//
        likeCount.classList.add('place-card__like-count') ;
        divLikeContainer.classList.add('place-card__like-container') ;
        placeCardLikeIcon.classList.add('place-card__like-icon') ;
        placeCardDescription.appendChild(divLikeContainer) ;
        divLikeContainer.appendChild(likeCount) ;
        divLikeContainer.appendChild(placeCardLikeIcon) ;
        if (amountLikes) {
            placeCardLikeIcon.classList.add('place-card__like-icon_liked')
        }
        this.likeCount = likeCount;
        if (owner['_id'] !== apiReqest.id) {
            placeCardDeleteIcon.style.display = 'none';
        }
        return  placeCard;
    }
}

class CardList{
    constructor (DOMElement, arr){
        this.DOMElement = DOMElement;
    }

    addCard(objCard){
        let card = new Card(objCard);
        this.DOMElement.appendChild(card.elementCard);
    } 
    render(arr){
        arr.forEach(element => {
            this.addCard(element);
        })
    } 
}

class Popup {
    constructor(DOMElement){
        this.DOMElement = DOMElement;
        this.close = this.close.bind(this)
        this.DOMElement.querySelector('.popup__close').addEventListener('click', this.close);
        this.btn = this.DOMElement.querySelector('.button');
        this.message = this.btn.textContent;
        this.loading = this.loading.bind(this);
    }
    open (){
        this.DOMElement.classList.add('popup_is-opened');
    }
    close (){
        this.DOMElement.classList.remove('popup_is-opened');
    }
    loading(){
        if(this.btn.textContent != "Загрузка"){
            this.btn.textContent = "Загрузка";
        } else {this.btn.textContent = this.message};
    }
}




addButton.setAttribute('type','submit');
addButton.setAttribute('disabled', true);
editButtonSave.setAttribute('type','submit');
//--variables--
const popupCreatingCard = new Popup(popup)//-------------------------Popup class
const popupEditingPrifile = new Popup(popupProfile)//-------------------------Popup class
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
