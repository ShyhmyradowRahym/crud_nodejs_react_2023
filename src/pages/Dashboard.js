import React from 'react'
import BarChart from '../components/dashboards/Bar_chart';
import LineChart from '../components/dashboards/Line_chart';
const Dashboard = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  return (
    <div className='flex flex-col md:flex-row mt-10'>
      <div className='w-full md:w-1/2 mx-4'>
        <LineChart />
      </div>
      <div className='w-full md:w-1/2 mx-4'>
        <BarChart />
      </div>
    </div>
  )
}

export default Dashboard