export default function formatTime(time) {
  if(!time) return ''

  if(Number.isInteger(time)) {
    // it's a Number date (like Date.now())
    const date = new Date(time)
    const hours = (date.getHours() < 10 ? '0' : '') + date.getHours()
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    return hours + ':' + minutes
  }

  if (Object.prototype.toString.call(time) === "[object Date]") {
    // it is a date
    if (isNaN(time.getTime())) {  // d.valueOf() could also work
      // date is not valid
      return ''
    } else {
      // date is valid
      const hours = (time.getHours() < 10 ? '0' : '') + time.getHours()
      const minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
      return hours + ':' + minutes
    }
  } else {
    // not a date

    // transform in date
    const transformInDate = new Date(time)
    if(transformInDate instanceof Date && !isNaN(transformInDate)){
      const hours = (transformInDate.getHours() < 10 ? '0' : '') + transformInDate.getHours()
      const minutes = (transformInDate.getMinutes() < 10 ? '0' : '') + transformInDate.getMinutes()
      return hours + ':' + minutes
    }

    // split by ":"
    const timeSplitted = time.split(":")
    if(timeSplitted && timeSplitted.length > 0) {
      return timeSplitted[0].substr(0, 2) + ':' + timeSplitted[1].substr(0, 2)
    }
  }

  return ''
}