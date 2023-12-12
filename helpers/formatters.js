export const formatTime = (value) => {
  let result  = Number(value).toFixed(1)
  if (value < 10) {
    return result
  }
  if (value === 0) {
    return '0.0'
  }
  return result
}