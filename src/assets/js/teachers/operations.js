// se va a encargar de toda la interacción de javaScript con HTML

import {formElements, getFormData} from './form'

export function addEventListeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
    });
}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(getFormData());
    });
}

