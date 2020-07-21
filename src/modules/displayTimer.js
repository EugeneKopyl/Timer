// const date = '2020-10-12T22:24'
// const data = '2020-05-13T15:24'
export class Timer {
  static create(timer) {
    addToLocalStorage(timer)
    Timer.renderList()
  }

  static renderList() {
    const timers = getTimersFromLocalStorage()
    const html = timers.length
      ? timers.map(toElement).join('')
      : `<div class="timer">No timers</div>`

    const list = document.getElementById('listOfTimers')
    list.innerHTML = html
  }

  static time(timer) {
    const timeEnd= new Date(timer);
    let timeDay = new Date()
    let after = ''
    let left = ''
    if (timeDay < timeEnd) {
      timeDay = Math.floor((timeEnd - timeDay) / 1000) + 1;
      left = 'left: '
    } else {
      timeDay = Math.floor((timeDay - timeEnd) / 1000);
      after = ' since event ends.'
    }
    let timeSec = timeDay % 60;

    timeDay = Math.floor(timeDay / 60);
    if (timeSec < 10) timeSec = '0' + timeSec;
    let timeMin = timeDay % 60;

    timeDay = Math.floor(timeDay / 60);
    if (timeMin < 10) timeMin = '0' + timeMin;
    const timeHour = timeDay % 24;

    timeDay = Math.floor(timeDay / 24);

    return left + timeDay + ' days '
      + timeHour + ' hours '
      + timeMin + ' minutes '
      + timeSec + ' seconds' + after;
  }

  static delete(timer) {
    delTimerFromLocalStorage(timer)
    Timer.renderList()
  }
}

function addToLocalStorage(timer) {
  const all = getTimersFromLocalStorage()
  all.push(timer)
  localStorage.setItem('timer', JSON.stringify(all))
}

function getTimersFromLocalStorage() {
  return JSON.parse(localStorage.getItem('timer') || '[]')
}

function delTimerFromLocalStorage(timer) {
  const time = timer.creationtime
  const all = getTimersFromLocalStorage().filter(el => el.date !== time)
  localStorage.setItem('timer', JSON.stringify(all))
}

function toElement(timer) {
  return `
    <div class="timer" data-creationTime="${timer.date}">
      <hr>
      <p>Until ${timer.description}</p>
      <p>${Timer.time(timer.until)}</p>
      <button
       type="button"
       class="btnDeleteTimer"
       data-btn="true"
       >Delete</button>
    </div>
    <br>
    `
}
