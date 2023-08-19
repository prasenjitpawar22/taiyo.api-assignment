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
  const fetchData = async () => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        console.log(res.data);
        const cases: string[] = Object.values(res.data.cases);
        const label: string[] = Object.keys(res.data.cases);
        console.log(cases, label);
        setLineGraph({ cases, label });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 flex-col">
        <h1 className="font-semibold text-xl">Charts and Maps</h1>
      </div>
      <div className="">
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
    </div>
  );
};

export default ChartsMaps;
