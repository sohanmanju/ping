// export const getALotOfMidPoints = (start,end,n)=> {
//     const increment = [(start[0]+end[0])/n , (start[1]+end[1])/n ]
//     const stops = []
//     for (let i=1; i<=n ; i++) {
//         stops.push([(start[0]+(increment[0]*i)).toFixed(4),(start[1]+(increment[1]*i)).toFixed(4)])
//     }
//     console.log(stops)
//     return stops;
// }

export const getALotOfMidPoints = (coord1, coord2) => {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const x = coord1[0] + (coord2[0] - coord1[0]) * i / 99;
      const y = coord1[1] + (coord2[1] - coord1[1]) * i / 99;
      points.push([x, y]);
    }
    return points;
  }