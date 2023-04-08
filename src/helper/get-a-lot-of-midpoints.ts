export const getALotOfMidPoints = (
  coord1: [number,number],
  coord2: [number,number],
): [number,number][] => {
  const points: [number,number][] = []
  for (let i = 0; i < 100; i++) {
    const x = coord1[0] + ((coord2[0] - coord1[0]) * i) / 99
    const y = coord1[1] + ((coord2[1] - coord1[1]) * i) / 99
    points.push([x, y])
  }
  return points
}
