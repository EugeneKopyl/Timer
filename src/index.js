import './scss/index.scss'
import {dateTime} from './modules/dateTimeCurrent';
import {Timer} from '@/modules/displayTimer';

setInterval(function() {
  document.getElementById('currentTime').innerHTML = dateTime();
}, 1000);

const inputDate = document.getElementById('inputDate')
const timerText = document.getElementById('timerText')
const formTimer = document.getElementById('formTimer')
const listOfTimers = document.getElementById('listOfTimers')
const btnCreateTimer = document.getElementById('btnCreateTimer')

function isNameValid(value) {
  return value.length >= 3
}

function rightDateFormat(date) {
  return (new Date(date) != 'Invalid Date')
}

formTimer.addEventListener('submit', submitFormHandler)

function submitFormHandler(event) {
  event.preventDefault()
  if (isNameValid(timerText.value) && rightDateFormat(inputDate.value)) {
    const timer = {
      date: new Date().toJSON(),
      description: timerText.value.trim(),
      until: inputDate.value,
    }
    btnCreateTimer.disabled = true

    Timer.create(timer)
    timerText.value = ''
    inputDate.value = ''
  } else {
    alert('Name must be more than 3 and less then 250 symbols.' +
      ' Date must be in format: YYYY-MM-DD or YYYY-MM-DDTHH:MM')
  }
  btnCreateTimer.disabled = false
}

listOfTimers.addEventListener('click', deleteTimer)

function deleteTimer(event) {
  event.preventDefault()
  if (event.target.dataset.btn) {
    const timer = event.target.parentElement.dataset
    const q = confirm('Delete timer?');
    if (q) {
      Timer.delete(timer)
    }
  }
}

setInterval(() => Timer.renderList(), 1000)

inputDate.addEventListener('keypress', function(event) {
  const l = inputDate.value.length
  switch (l) {
    case 4:
      inputDate.value = inputDate.value + '-'
      break;
    case 7:
      inputDate.value = inputDate.value + '-'
      break;
    case 10:
      inputDate.value = inputDate.value + 'T'
      break;
    case 13:
      inputDate.value = inputDate.value + ':'
      break;
  }
  if (event.key === 'Backspace') {
    if (l === 5 || l === 8 || l === 11 || l === 14) {
      inputDate.value = inputDate.value.slice(0, -1)
    }
  }
})
