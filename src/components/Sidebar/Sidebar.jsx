import styled from 'styled-components'
import establishConnection from '../../ping'

const Sidebar = ({
  locations,
  regions,
  setRegions,
  ping,
  setPing,
  cplist,
  cloudProvider,
  setCloudProvider
}) => {
  const handleChange = (event) => {
    if (event.target.checked === true) {
      setRegions([...regions, event.target.value])
    } else if (event.target.checked === false) {
      let freshArray = regions.filter((val) => val !== event.target.value)
      setRegions([...freshArray])
    }
  }

  return (
    <Wrapper>
      <nav>
        <NavHeader>Ping-It</NavHeader>
      </nav>

      <form>
        <select
          value={cloudProvider}
          onChange={(e) => setCloudProvider(e.target.value)}
        >
          {cplist.map((cp) => (
            <option value={cp}>{cp}</option>
          ))}
        </select>
      </form>

      {locations.map((key) => (
        <Datacenter key={key}>
          <input type="checkbox" value={key} onChange={handleChange} />
          <div>{key}</div>
        </Datacenter>
      ))}
    <StyledButton
  onClick={async () => {
    const endpoints = regions.map((region) => {
      if (cloudProvider === 'aws') {
        return `https://ec2.${region}.amazonaws.com/ping`;
      } else if (cloudProvider === 'do') {
        return `http://speedtest-${region}.digitalocean.com`;
      } else {
        return null;
      }
    }).filter((endpoint) => endpoint !== null);
    const results = {};
    for (const endpoint of endpoints) {
      const time = await establishConnection(endpoint);
      let endpointName;
      if (cloudProvider === 'aws') {
        endpointName = endpoint.match(/ec2\.(.*?)\.amazonaws/)[1];
      } else if (cloudProvider === 'do') {
        endpointName = endpoint.match(/(?<=speedtest-)[^.]+/)[0];
        console.log(endpointName)
      } else {
        endpointName = 'unknown';
      }
      console.log(time);
      results[endpointName] = time;
    }
    setPing(results);
  }}
>
  Ping
</StyledButton>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  padding: 2em 2em;
  width: 15em;
  flex-shrink: 0;
  background: #f8f8f8;
`

const NavHeader = styled.h1`
  color: deeppink;
  font-size: 2em;
  font-weight: bolder;
  margin-bottom: 1em;
`

const Datacenter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`

const StyledButton = styled.button`
  width: 100%;
  margin-top: 1em;
  padding: 0.5em 1em;
  background: #d00080;
  color: white;
  border: none;
  outline: none;
  border-radius: 0.3em;
  cursor: pointer;

  &:hover {
    background: #ff1493;
  }
  &:active {
    background: #ff2aa3;
  }
`

export default Sidebar
