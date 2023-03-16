import { useEffect, useState } from 'react'
import './App.css'
import useGeolocation from 'react-hook-geolocation'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import Locations from './coordinates.json'
import closestCoordinate from './closestCoordinate'

const App = () => {
  const { longitude, latitude } = useGeolocation()
  let closest = ''
  useEffect(() => {
    closest = closestCoordinate(latitude, longitude, Locations)
  }, [latitude, longitude])

  const [regions, setRegions] = useState([])
  const [ping, setPing] = useState()

  return (
    <>
      <MainWrapper>
        <SecondWrapper>
          <Sidebar
            locations={Object.keys(Locations)}
            regions={regions}
            setRegions={setRegions}
            ping={ping}
            setPing={setPing}
          />
          <Map regions={regions} locations={Locations} ping={ping} />
        </SecondWrapper>
      </MainWrapper>
    </>
  )
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SecondWrapper = styled.div`
  display: flex;
`
export default App
