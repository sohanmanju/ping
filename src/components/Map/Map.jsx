import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
  Annotation,
  Line
} from 'react-simple-maps'
import styled from 'styled-components'
import { geoMiller } from 'd3-geo-projection'
import useGeolocation from 'react-hook-geolocation'
import React from 'react'

//Projection for the map
const projection = geoMiller()
  .translate([800 / 2, 600 / 2])
  .scale(150)

const geoUrl = 'src\\assets\\countries-110m.json'

const Map = ({ regions, locations, ping }) => {
  const { longitude, latitude } = useGeolocation()
  const userLocation = [longitude, latitude]
  return (
    <StyledComposableMap projection={projection}>
      <Graticule stroke="#f8f8f8" />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              stroke="#ffffff"
              strokeWidth={0.5}
              style={{
                default: {
                  fill: '#EEE'
                },
                hover: {
                  fill: 'pink'
                },
                pressed: {
                  fill: 'deeppink'
                }
              }}
            />
          ))
        }
      </Geographies>

      {userLocation && (
        <>
          <Marker coordinates={userLocation}>
            <circle r={3} fill="#F53" />
          </Marker>
          <Annotation
            subject={userLocation}
            dx={-90}
            dy={-30}
            connectorProps={{
              stroke: '#FF5533',
              strokeWidth: 1,
              strokeLinecap: 'round'
            }}
          >
            <text
              x="-2"
              textAnchor="end"
              alignmentBaseline="middle"
              fill="#F53"
            >
              Your Location
            </text>
          </Annotation>
        </>
      )}

      {regions &&
        regions.map((region) => {
          return (
            <React.Fragment key={region}>
              <Marker coordinates={locations[region]}>
                <circle r={3} fill="#F53" />
              </Marker>
              <Annotation
                subject={locations[region]}
                dx={-90}
                dy={-30}
                connectorProps={{
                  stroke: '#FF5533',
                  strokeWidth: 1,
                  strokeLinecap: 'round'
                }}
              >
                <text
                  x="-2"
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fill="#F53"
                >
                  {region}
                </text>
              </Annotation>
              <Line
                from={userLocation}
                to={locations[region]}
                stroke="#FF5533"
                strokeWidth={4}
                strokeLinecap="round"
              />
            </React.Fragment>
          )
        })}

      {ping &&
        Object.keys(ping).map((loc) => {
          return (
            <React.Fragment key={loc}>
              <Marker coordinates={locations[loc]}>
                <circle r={3} fill="#F53" />
              </Marker>
              <Annotation
                subject={locations[loc]}
                dx={-50}
                dy={-50}
                connectorProps={{
                  stroke: '#FF5533',
                  strokeWidth: 1,
                  strokeLinecap: 'round'
                }}
              >
                <text
                  x="-5"
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fill="#F53"
                >
                  {ping[loc].toFixed(3)}ms
                </text>
              </Annotation>
            </React.Fragment>
          )
        })}
    </StyledComposableMap>
  )
}

const StyledComposableMap = styled(ComposableMap)`
  height: 100vh;
  margin: 0 auto;
`
export default Map
