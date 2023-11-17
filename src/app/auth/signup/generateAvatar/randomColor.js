export function randomColor() {
  const colors = [
    '#718096', // gray-600
    '#1A202C', // neutral-900
    '#EF4444', // red-500
    '#F97316', // orange-600
    '#F59E0B', // amber-400
    '#84CC16', // lime-600
    '#22C55E', // green-600
    '#14B8A6', // teal-500
    '#06B6D4', // cyan-500
    '#0EA5E9', // sky-500
    '#9333EA', // violet-600
    '#D946EF', // fuchsia-500
    '#EC4899', // pink-500
    '#BE185D', // rose-600
  ]

  const randomIndex = Math.floor(Math.random() * colors.length)
  const colorClass = `${colors[randomIndex]}`
  return colorClass
}
