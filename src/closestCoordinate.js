const toRad = (value) => {
  return (value * Math.PI) / 180
}

const closestCoordinate = (lat, lng, coordinatesObj) => {
  const R = 6371
  let closest = null
  let closestDistance = Infinity

  for (const key in coordinatesObj) {
    const lat2 = coordinatesObj[key][1]
    const lng2 = coordinatesObj[key][0]

    const dLat = toRad(lat2 - lat)
    const dLng = toRad(lng2 - lng)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    // Check if this coordinate is the closest so far
    if (distance < closestDistance) {
      closest = key
      closestDistance = distance
    }
  }

  return closest
}

export default closestCoordinate
