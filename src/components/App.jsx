import "../App.css";
import { useState, useEffect } from "react";
import Chart from "./Chart";

function App() {
  const [population, setPopulation] = useState([]);
  const [yearFilter, setYearFilter] = useState(null);

  /**
   * Fetch the data from the Api
   */
  async function fetchPopulation() {
    const response = await fetch(
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
    );
    const data = await response.json();
    setPopulation(data.data);
  }

  useEffect(() => {
    fetchPopulation();
  }, []);

  /**
   * Filter the population according to the select length of years
   * @param {*} years 
   */
  function handleYearFilterChange(years) {
    setYearFilter(years);
  }

  return (
    <div className="App">
      <h1>USA Population</h1>
      <div>
        <button onClick={() => handleYearFilterChange(null)}>All</button>
        <button onClick={() => handleYearFilterChange(3)}>Last 3 years</button>
        <button onClick={() => handleYearFilterChange(5)}>Last 5 years</button>
        <button onClick={() => handleYearFilterChange(10)}>Last 10 years</button>
      </div>
      <Chart data={population} yearFilter={yearFilter} />
    </div>
  );
}

export default App;


