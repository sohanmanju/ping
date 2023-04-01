import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import useGeolocation from "react-hook-geolocation";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import WorldMap from "./components/WorldMap";
import Locations from "./coordinates.json";
import closestCoordinate from "./closestCoordinate";

const App = () => {
	const { longitude, latitude } = useGeolocation();
	let closest = "";
	useEffect(() => {
		closest = closestCoordinate(latitude, longitude, Locations);
	}, [latitude, longitude]);

	const [regions, setRegions] = useState([]);
	const [ping, setPing] = useState();
	const [cloudProvider, setCloudProvider] = useState("aws");

	return (
		<>
			<MainWrapper>
				<SecondWrapper>
					<Sidebar
						locations={Object.keys(Locations[cloudProvider])}
						regions={regions}
						setRegions={setRegions}
						ping={ping}
						setPing={setPing}
						cplist={Object.keys(Locations)}
						cloudProvider={cloudProvider}
						setCloudProvider={setCloudProvider}
					/>
					<WorldMap
						regions={regions}
						locations={Locations[cloudProvider]}
						ping={ping}
					/>
				</SecondWrapper>
			</MainWrapper>
		</>
	);
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondWrapper = styled.div`
  display: flex;
`;
export default App;
