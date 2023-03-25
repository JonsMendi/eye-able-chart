import '../App.css';
import { useState, useEffect } from 'react';

function App() {
  const [population, setPopulation] = useState([]);
  const [yearFilter, setYearFilter] = useState(null);

  async function fetchPopulation() {
    const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
    const data = await response.json();
    setPopulation(data.data);
  }

  useEffect(() => {
    fetchPopulation();
  }, []);

  function handleYearFilterChange(event) {
    setYearFilter(parseInt(event.target.value));
  }

  const renderPopulation = population
    .filter(item => yearFilter ? new Date(item.Year).getFullYear() >= (new Date().getFullYear() - yearFilter) : true)
    .map((item, index) => (
      <div key={index}>
        <span>Country: {item.Nation}</span>
        <span>Population: {item.Population}</span>
        <span>Year: {item.Year}</span>
      </div>
    ));

  return (
    <div className="App">
      <h1>USA Population</h1>
      <label>
        Filter by year:
        <select defaultValue="" onChange={handleYearFilterChange}>
          <option value={null}>All</option>
          <option value={3}>Last 3 years</option>
          <option value={5}>Last 5 years</option>
          <option value={10}>Last 10 years</option>
        </select>
      </label>
      <div>{renderPopulation}</div>
    </div>
  );
}

export default App;
