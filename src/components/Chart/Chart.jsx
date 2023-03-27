import { Line } from "react-chartjs-2";
// Even though "import { Chart as ChartJS} from "chart.js/auto";" is not being used under, it is required for the Chart.js to work.
// eslint-disable-next-line
import { Chart as ChartJS} from "chart.js/auto";

function Chart ({chartData}) {
  return (
    <div className="w-1/2 mx-auto">
      <Line data={chartData} />
    </div>
  )
}
export default Chart;