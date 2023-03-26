import { Line } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";

function Chart ({chartData}) {
  return (
    <div className="w-1/2 mx-auto">
      <Line data={chartData} />
    </div>
  )
}
export default Chart;