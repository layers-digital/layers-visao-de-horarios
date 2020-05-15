export default function parseDate(input) {
  if(!input) return null
  if(Number.isInteger(input)) return new Date(input)
  if(typeof input.getMonth === 'function'){
    return input
  }

  let parts = input.split('-');

  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}