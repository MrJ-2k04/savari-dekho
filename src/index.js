import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'App';
import { Provider } from 'react-redux';
import store from 'Store';

// import { ArcElement, Tooltip, Legend, Chart as ChartJS, Title, BarElement, LinearScale, CategoryScale } from "chart.js"

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
