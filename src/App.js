import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import mondaySdk from "monday-sdk-js";
import moment from 'moment';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const monday = mondaySdk();
console.log(process.env.REACT_APP_MONDAY_API_TOKEN)
monday.setToken(process.env.REACT_APP_MONDAY_API_TOKEN);

const App = () => {
  const [patientId, setPatientId] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const fetchData = async () => {
    const result = await getData(patientId);
    const hemoglobinColumn = getHemoglobinData(result);
    const labels = getLabels(hemoglobinColumn);
    const data = getDataValues(hemoglobinColumn);
    updateChartData(labels, data);
  };

  const getData = async (patientId) => {
    console.log(process.env.REACT_APP_BOARD_ID)
    return await monday.api(`
      query ($patientId: String!) {
        items_by_column_values(board_id: ${process.env.REACT_APP_BOARD_ID}, column_id: "text5", column_value: $patientId) {
          id
          name
          column_values {
            id
            value
            text
          }
        }
      }
    `, { variables: { patientId } });
  };

  const getHemoglobinData = (result) => {
    return JSON.parse(JSON.parse(result.data.items_by_column_values[0].column_values.find(column => column.id === "text9").value));
  };

  const getLabels = (hemoglobinData) => {
    return hemoglobinData.map(item => moment(new Date(item.Date)).format('YYYY-MM-DD'));
  };

  const getDataValues = (hemoglobinData) => {
    return hemoglobinData.map(item => item.Value);
  };

  const updateChartData = (labels, data) => {
    setChartData({
      labels,
      datasets: [{
        label: 'Hemoglobin',
        data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    });
  };

  return (
    <div>
      <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
      <button onClick={fetchData}>Show Hemoglobin</button>
      <Line data={chartData} />
    </div>
  );
};

export default App;