import "../App.css";
import { useState, useEffect } from "react";
import Chart from "./Chart/Chart";

function Body() {
  const [population, setPopulation] = useState([]);
  const [yearFilter, setYearFilter] = useState(10);
  const [chartData, setChartData] = useState({
    // Create state variable for chart data and its setter
    labels: [],
    datasets: [
      {
        label: "Population",
        data: [],
        backgroundColor: ["black"],
        borderColor: "gray",
        borderWidth: 2,
        pointBackgroundColor: "#FFD050",
        pointBorderColor: "black",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#FFD866",
        pointHoverBorderColor: "#FFD866",
        pointHoverRadius: 7,
        pointRadius: 8,
      },
    ],
  });

  /**
   * Fetch the data from the API
   */
  async function fetchPopulation() {
    const response = await fetch(
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
    );
    const data = await response.json();
    setPopulation(data.data);
  }

  useEffect(() => {
    // Fetch the population data once when the component mounts
    fetchPopulation();
  }, []);

  useEffect(() => {
    // Check if there is population data available
    if (population.length > 0) {
    // Filter the population data based on the selected year filter
      const filteredPopulation = population.filter(
        (item) =>
          !yearFilter ||
          new Date(item.Year).getFullYear() >=
            new Date().getFullYear() - yearFilter
      );
      // Map the year data from the filtered population data to an array
      const labels = filteredPopulation.map((data) => data.Year);
      // Map the population data from the filtered population data to an array
      const data = filteredPopulation.map((data) => data.Population);

      // Update the chart data state variable with the new data
      setChartData((prevState) => {
        return {
          ...prevState,
          labels: labels,
          datasets: [
            {
              ...prevState.datasets[0],
              data: data,
            },
          ],
        };
      });
    }
  }, [yearFilter, population]);

  // Update the year filter state variable when the user clicks on a filter button
  function handleYearFilterChange(event, value) {
    setYearFilter(parseInt(value));
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-800 mt-10 main-title">United States of America</h1>
        <p className="text-lg text-gray-500 font-bold mt-2">Behold the Population Surge!</p>
      </div>
      <div className="relative flex-grow w-full mt-10">
        <Chart chartData={chartData} />
        <div className="flex flex-col items-center justify-center mt-4 mb-5">
          <label className="mr-2 text-gray-800 mt-2 mb-5 uppercase font-bold">
            You can filter by years length:
          </label>
          <div className="flex justify-center space-x-4">
            <button
              onClick={(event) => handleYearFilterChange(event, 3)}
              className={`p-2 rounded-md border-2 ${
                yearFilter === 3
                  ? "bg-orange-500 border-black text-black"
                  : "bg-white border-black text-black"
              } hover:bg-orange-400 hover:transition-colors ease-in-out duration-300`}
            >
              Last 3 years
            </button>
            <button
              onClick={(event) => handleYearFilterChange(event, 5)}
              className={`p-2 rounded-md border-2 ${
                yearFilter === 5
                  ? "bg-orange-500 border-black text-black"
                  : "bg-white border-black text-black"
              } hover:bg-orange-400 hover:transition-colors ease-in-out duration-300`}
            >
              Last 5 years
            </button>
            <button
              onClick={(event) => handleYearFilterChange(event, 10)}
              className={`p-2 rounded-md border-2 ${
                yearFilter === 10
                  ? "bg-orange-500 border-black text-black"
                  : "bg-white border-black text-black"
              } hover:bg-orange-400 hover:transition-colors ease-in-out duration-300`}
            >
              Last 10 years
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
