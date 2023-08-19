import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartsMaps = () => {
  const [lineGraph, setLineGraph] = useState<{
    cases: string[];
    label: string[];
  }>({
    cases: [],
    label: [],
  });

  const [mapData, setMapData] = useState<{
    country: string[];
    lat: number[];
    long: number[];
    cases: number[];
    deaths: number[];
    recovered: number[];
  }>({
    country: [],
    long: [],
    lat: [],
    cases: [],
    recovered: [],
    deaths: [],
  });

  const [loading, setLoading] = useState(true);

  // API call
  const fetchData = async () => {
    setLoading(true);
    // get data for line graph
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        const cases: string[] = Object.values(res.data.cases);
        const label: string[] = Object.keys(res.data.cases);
        setLineGraph({ cases, label });
      })
      .catch((e) => console.log(e));

    // get data for map
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        var country: string[] = [];
        var lat: number[] = [];
        var long: number[] = [];
        var cases: number[] = [];
        var recovered: number[] = [];
        var deaths: number[] = [];
        var data = res?.data?.slice(1, 11);

        data?.forEach(
          (d: {
            country: string;
            cases: number;
            recovered: number;
            deaths: number;
            countryInfo: { lat: number; long: number };
          }) => {
            country.push(d?.country);
            lat.push(d?.countryInfo?.lat);
            long.push(d?.countryInfo?.long);
            cases.push(d?.cases);
            recovered.push(d?.recovered);
            deaths.push(d?.deaths);
          }
        );
        setMapData({ country, lat, long, cases, recovered, deaths });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [setMapData]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 flex-col">
        <h1 className="font-semibold text-xl">Charts and Maps</h1>
      </div>
      <div className="flex xl:flex-row sm:flex-col gap-4 justify-between">
        <div>
          <Line
            width={400}
            height={500}
            options={{ responsive: true }}
            data={{
              datasets: [
                {
                  data: lineGraph.cases,
                  label: "Daily cases",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                  borderColor: "rgb(255, 99, 132)",
                },
              ],
              labels: lineGraph.label,
            }}
          />
        </div>
        <div className="flex flex-col  justify-center ">
          {!loading ? (
            <>
              <h1 className="font-semibold">Country data </h1>
              <MapContainer
                center={[mapData.lat[0] ?? 51.505, mapData.long[0] ?? -0.09]}
                zoom={2}
                className="w-96 h-96"
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapData.country.map((c, i) => (
                  <Marker
                    icon={
                      new Icon({
                        iconUrl: markerIconPng,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                      })
                    }
                    key={i}
                    position={[mapData.lat[i], mapData.long[i]]}
                  >
                    <Popup>
                      <div className="flex flex-col">
                        <span className="font-bold">{mapData.country[i]}</span>
                        <span>Active cases: {mapData.cases[i]} </span>
                        <span>Recovered cases: {mapData.cases[i]} </span>
                        <span>Deaths: {mapData.deaths[i]} </span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChartsMaps;
