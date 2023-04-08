const getColorCode = (num: number): string => {
  if (num >= 1 && num <= 50) {
    return '#4CAF50' // green
  } else if (num >= 51 && num <= 80) {
    return '#FF9800' // orange
  } else {
    return '#F44336' // red
  }
}

export default getColorCode
