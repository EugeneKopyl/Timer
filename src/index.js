import './scss/index.scss'
import {dateTime} from './modules/dateTimeCurrent';

setInterval(function() {
  document.getElementById('currentTime').innerHTML = dateTime();
}, 1000);

const dateTimeInput = document.getElementById('datetime')

dateTimeInput.onchange = function() {
  console.log(this.value);
}


// let one = new Date("May 21 2012 20:22:48"); // дата, до которой считаем.
// const two = Date.now(); // текущее время
// let remaining = one - two; // миллисекунды до даты
// remaining /= 1000; // секунды до даты
// remaining /= 60;    // минуты до даты
// remaining /= 60;    // часы до даты
// remaining /= 24;    // дни до даты
// alert(remaining);
