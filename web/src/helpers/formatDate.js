export default function formatDate(date) {
  if (!date) return '';

  let d = date;

  // if input is string, transform in date
  if (!(typeof d.getMonth === 'function')) {
    d = new Date(d);
  }

  if (d instanceof Date && !isNaN(d)) {
    const monthNames = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];
    const day = (d.getDate() < 10 ? '0' : '') + d.getDate();
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();

    return day + ' de ' + month + ' de ' + year;
  }

  return '';
}
