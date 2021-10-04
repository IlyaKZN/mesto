import {enableValidation} from "../src/components/validate.js";
import '../src/components/modal';
import '../src/components/card';
import '../src/components/constans';
import '../src/components/initial-сards';
import '../src/components/utils';
import '../src/components/validate';
import './index.css';

//Названия классов элементов формы
export const elFormClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__field-text_type_error',
  errorClass: 'form__input-error_active'
}

//Вызов функции запуска валидации
enableValidation(elFormClasses);
