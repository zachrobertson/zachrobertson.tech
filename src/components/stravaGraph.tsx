import React from 'react';
import styled from 'styled-components';
import { VictoryLine, VictoryAxis, VictoryChart, VictoryLabel, VictoryVoronoiContainer } from 'victory';

const StravaGraphContainer = styled.div``;

export default function StravaGraph({ data }: { data: { distanceData: { x: string, y: number }[], maxDistance: number, elevationData: { x: string, y: number }[], maxElevation: number } }) {
    return (
        <StravaGraphContainer>
            <svg viewBox="0 0 400 155" strokeDasharray="4">
                <VictoryLabel text="STRAVA DATA" x={200} y={30} textAnchor="middle" style={{ fontSize: "10px" }} />
                <VictoryChart
                    standalone={false}
                    width={400}
                    height={200}
                    containerComponent={
                        <VictoryVoronoiContainer
                            labels={({ datum }) => `${datum.x}, ${datum.y}`}
                        />
                    }
                >
                    <VictoryAxis tickFormat={(x) => x} style={{
                        axis: { stroke: "transparent" },
                        ticks: { stroke: "transparent" },
                        tickLabels: { fill: "#00ff00" } // Adjust color as needed
                    }}/>
                    <VictoryAxis dependentAxis domain={[0, data.maxDistance]} tickFormat={(t: number) => `${t} mi`} style={{
                        axis: { stroke: "transparent" },
                        ticks: { stroke: "transparent" },
                        tickLabels: { fill: "green" } // Adjust color as needed
                    }}/>
                    <VictoryLine data={data.distanceData} style={{ data: { stroke: "green", strokeWidth: 1 } }} />
                </VictoryChart>
                <VictoryChart
                    standalone={false}
                    width={400}
                    height={200}
                    containerComponent={
                        <VictoryVoronoiContainer
                            labels={({ datum }) => `${datum.x}, ${datum.y}`}
                        />
                    }
                >
                    <VictoryAxis tickFormat={(x) => x} style={{
                        axis: { stroke: "transparent" },
                        ticks: { stroke: "transparent" },
                        tickLabels: { fill: "#00ff00" } // Adjust color as needed
                    }}/>
                    <VictoryAxis dependentAxis domain={[0, data.maxElevation]} tickFormat={(t: number) => `${t} ft`} orientation="right" style={{
                        axis: { stroke: "transparent" },
                        ticks: { stroke: "transparent" },
                        tickLabels: { fill: "blue" } // Adjust color as needed
                    }}/>
                    <VictoryLine data={data.elevationData} style={{ data: { stroke: "blue", strokeWidth: 1 } }} />
                </VictoryChart>
            </svg>
        </StravaGraphContainer>
    );
}