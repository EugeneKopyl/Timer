export function dateTime() {
  const currentDatetime = new Date();
  const day = zeroFirstFormat(currentDatetime.getDate());
  const month = zeroFirstFormat(currentDatetime.getMonth() + 1);
  const year = zeroFirstFormat(currentDatetime.getFullYear());
  const hours = zeroFirstFormat(currentDatetime.getHours());
  const minutes = zeroFirstFormat(currentDatetime.getMinutes());
  const seconds = zeroFirstFormat(currentDatetime.getSeconds());

  return day + '.' + month + '.' + year + ' '
      + hours + ':' + minutes + ':' + seconds;
}

function zeroFirstFormat(value) {
  if (value < 10) {
    value='0'+value;
  }
  return value;
}
