'use strict';

/*****

    1. Sticky Header
    2. Side nav
    3. Subscribe onblur
    4. Sorting
    5. Sticky socials
    6. Open attend form
    7. Attend Form Validation

****/

let body = document.querySelector('body');

// 1. Sticky Header
let header = document.getElementById('header');
if (header){
    let headroom  = new Headroom(header);
    headroom.init();
}

// 2. Side nav
let navOpener = document.querySelector('.nav-opener');
if (navOpener){
  navOpener.onclick = () => {
    body.classList.add('js-navOpened');
  }
}
let navCloser = document.querySelector('.nav-close');
if (navCloser){
  navCloser.onclick = () => {
    body.classList.remove('js-navOpened');
  }
}

// 3. Subscribe onblur
let emailSubscribe = document.getElementById('subscribe-email');
if (emailSubscribe){
  emailSubscribe.onblur = () => {
    if (emailSubscribe.value == ''){
      emailSubscribe.parentNode.classList.remove('js-focus');
    }
  }
  emailSubscribe.onfocus = () => {
    emailSubscribe.parentNode.classList.add('js-focus');
  }
}

// 4. Sorting
let gridServices = document.getElementById('articles-grid');
if (gridServices){
  mixitup(gridServices);
}

let eventsList = document.getElementById('events-list');
if (eventsList){
  mixitup(eventsList);
}

// 5. Sticky socials
let sharebox = document.getElementById('sharebox');
if (sharebox){
  let shareboxTop = sharebox.getBoundingClientRect().top + window.scrollY-110;
  let postContent = document.querySelector('.post-content');

  if(postContent){
    let postContentTop = postContent.getBoundingClientRect().top + window.scrollY;
    let postContentHeight = postContent.offsetHeight;
    let postContentBottom = postContentTop + postContentHeight - 60;

    window.onscroll = () => {
      if (window.scrollY > shareboxTop){
        sharebox.classList.add('js-fixedTop');
        if (window.scrollY > postContentBottom){
          sharebox.classList.add('js-fixedBottom');
        }
        else{
          if (sharebox.classList.contains('js-fixedBottom')){
            sharebox.classList.remove('js-fixedBottom');
          }
        }
      }
      else{
        sharebox.classList.remove('js-fixedTop');
      }
    }
  }
}

// 6. Open attend form
let attendPopup = document.getElementById('attend-opener');
if (attendPopup){
  let fader = document.getElementById('fader');
  let popupCloser = fader.querySelector('.close');
  if (fader){
    attendPopup.onclick = (e) => {
      e.preventDefault();
      body.classList.add('js-openPopup');
    }
    popupCloser.onclick = () => {
      body.classList.remove('js-openPopup');
    }
  }
}

// 7. Attend Form Validation
let contactForm = document.querySelector('.attend-form');
if (contactForm){
    contactForm.querySelector('.btn').onclick = (e) => {
      contactFormValidation();
    }
}
function contactFormValidation(){
  let fields = contactForm.querySelectorAll('.required');
  let validForm = true;
  fields.forEach((field) => {
    if (field.classList.contains('js-error')){
      field.classList.remove('js-error');
      field.parentNode.removeChild(field.parentNode.querySelector('.js-error-text'));
    }
    if (field.value.length < 3){
      let errorText = field.parentNode.querySelector('label').textContent + ' is required!';
      validationError(field, errorText);
      validForm = false;
    }
    else{
      if (field.getAttribute('type') === 'email'){
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(field.value.toLowerCase())){
          let errorText = field.parentNode.querySelector('label').textContent + ' is not valid!';
          validationError(field, errorText);
          validForm = false;
        }
      }
    }
  });
  if (validForm){
    // contactForm.submit();
    contactForm.classList.add('js-validform')
  }
}
function validationError(field, errorText){
  field.classList.add('js-error');
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(errorText));
  p.classList.add('js-error-text');
  field.parentNode.appendChild(p);
}