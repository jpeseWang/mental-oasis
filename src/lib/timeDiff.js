export function timeDiff(time) {
  var units = [
    { name: 'giây', limit: 60, in_seconds: 1 },
    { name: 'phút', limit: 3600, in_seconds: 60 },
    { name: 'giờ', limit: 86400, in_seconds: 3600 },
    { name: 'ngày', limit: 604800, in_seconds: 86400 },
    { name: 'tuần', limit: 2629743, in_seconds: 604800 },
    { name: 'tháng', limit: 31556926, in_seconds: 2629743 },
    { name: 'năm', limit: null, in_seconds: 31556926 },
  ]

  var diff = (new Date() - new Date(time)) / 1000
  if (diff < 5) return 'now'

  var i = 0
  let unit
  while ((unit = units[i++])) {
    if (diff < unit.limit || !unit.limit) {
      var diff = Math.floor(diff / unit.in_seconds)
      return diff + ' ' + unit.name + ' trước'
    }
  }
}
