# My React App

This is a React application which utilizes the monday.com API to fetch patient data and visualize it using Chart.js. The application displays a line chart of Hemoglobin data over time.

## Installation

Clone the repository:

```
git clone git@github.com:phoenix979/predicta-med.git
```

Navigate to the project directory:

```
cd frontend
cd quickstart-react
```

Install the dependencies:

```
npm install
```

## Usage

To run the application:

```
npm start
```

This starts the development server at `localhost:8301`.
but in order to search a patientId and get the graph of their hemoglobin, nevigate to the generated url that appears in the console after you execute npm start.

for example:
INFO: your url is: https://board-view-10095774.tunnel.monday.app

## Features

- Fetches patient data from monday.com API.
- Displays a line chart of Hemoglobin values over time.

## Functionality

The application has a single input field and a button. Enter the patient ID in the input field and click the "Show Hemoglobin" button to fetch the patient data and display the chart.

## Environment Variables

The application requires the following environment variables:

- `REACT_APP_MONDAY_API_TOKEN`: Your monday.com API token.
- `REACT_APP_BOARD_ID`: The ID of the monday.com board from where data is fetched.

## Libraries Used

- `React`: For building the user interface.
- `monday-sdk-js`: For interacting with the monday.com API.
- `Chart.js`: For visualizing the data.
- `react-chartjs-2`: React wrapper for Chart.js.
- `moment.js`: For date formatting.
