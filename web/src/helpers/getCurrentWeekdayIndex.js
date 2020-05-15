import _ from 'lodash'
import parseDate from '@/helpers/parseDate'

export default function getCurrentWeekdayIndex(terms) {
  if(!terms || !terms.length) return null

  let current = _.findIndex(terms, { status: 'current' })
  if(current >= 0) return current

  let ended = _.findIndex(terms, { status: 'ended' })
  if(ended >= 0) return ended

  let index = 0
  let minDiff = Infinity
  terms.forEach((term, i) => {
    if(!term.startsAt || !term.endsAt) return

    let today = parseDate(new Date())
    let startsAt = parseDate(term.startsAt)
    let endsAt = parseDate(term.endsAt)

    let diff = endsAt - startsAt
    if (diff < 0) return

    let isBeforeEndTerm = (today - endsAt) < 0
    if (isBeforeEndTerm && ((today - startsAt) < minDiff)) {
      minDiff = today - startsAt
      index = i 
    }
  })

  return index
}