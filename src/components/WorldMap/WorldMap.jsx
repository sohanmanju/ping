import React from "react";
import {
	ComposableMap,
	Geographies,
	Geography,
	Graticule,
	Marker,
	Annotation,
	Line,
} from "react-simple-maps";
import styled from "styled-components";
import { geoMiller } from "d3-geo-projection";
import useGeolocation from "react-hook-geolocation";
import getColorCode from "../../getColorCode";
import { getALotOfMidPoints } from "../../getALotOfMidPoints";

//Projection for the map
const projection = geoMiller()
	.translate([800 / 2, 600 / 2])
	.scale(150);

const geoUrl = "src\\assets\\countries-110m.json";

const WorldMap = ({ regions, locations, ping }) => {
	const { longitude, latitude } = useGeolocation();
	const userLocation = [longitude, latitude];
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
									fill: "#EEE",
								},
								hover: {
									fill: "pink",
								},
								pressed: {
									fill: "deeppink",
								},
							}}
						/>
					))
				}
			</Geographies>

			{userLocation && (
				<>
					<Marker coordinates={userLocation}>
						<circle r={3} fill="#6f6f6f" />
					</Marker>
					<Annotation
						subject={userLocation}
						dx={-30}
						dy={0}
						connectorProps={{
							stroke: "#6f6f6f",
							strokeWidth: 1,
							strokeLinecap: "round",
						}}
					>
						<text
							x="-2"
							textAnchor="end"
							alignmentBaseline="middle"
							fill="#6f6f6f"
							fontSize={10}
						>
							Your Location
						</text>
					</Annotation>
				</>
			)}

			{regions?.map((region) => {
				const pingValue = ping?.[region];
				let color = "#6f6f6f";
				if (pingValue) {
					color = getColorCode(pingValue);
				}
				return (
					<React.Fragment key={region}>
						<Marker coordinates={locations[region]}>
							<circle r={3} fill="#6f6f6f" />
						</Marker>
						<Annotation
							subject={locations[region]}
							dx={-50}
							dy={0}
							connectorProps={{
								stroke: "#6f6f6f",
								strokeWidth: 1,
								strokeLinecap: "butt",
							}}
						>
							<text
								x="-2"
								textAnchor="end"
								alignmentBaseline="middle"
								fill="#6f6f6f"
								fontSize={10}
							>
								{region}
							</text>
							{ping?.[region] && (
								<text
									x="-2"
									y="10"
									textAnchor="end"
									alignmentBaseline="middle"
									fill={color}
									fontSize={10}
								>
									{ping[region].toFixed(3)}ms
								</text>
							)}
						</Annotation>
						<Line
							from={userLocation}
							to={locations[region]}
							coordinates={[
								userLocation,
								...getALotOfMidPoints(userLocation, locations[region]),
								locations[region],
							]}
							stroke="#6f6f6f"
							strokeWidth={1}
							strokeLinecap="round"
						/>
					</React.Fragment>
				);
			})}
		</StyledComposableMap>
	);
};

const StyledComposableMap = styled(ComposableMap)`
  height: 100vh;
  margin: 0 auto;
`;
export default WorldMap;
