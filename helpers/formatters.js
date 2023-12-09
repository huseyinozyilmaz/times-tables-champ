export const formatTime = (value) => {
  if (!value) {
    return '10.00'
  }
  let result  = Number(value).toFixed(2)
  if (value < 10) {
    return '0' + result
  }
  if (value === 0) {
    return '00.00'
  }
  return result
}