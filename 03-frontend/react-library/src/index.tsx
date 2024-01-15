import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import{ App }from './App';
import {BrowserRouter} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OYIcRBdfH4OYEH1S8ZVlUpHenGXBux9dcGKbJYnyZuNVFCnZoPDbLe9PR7HKPx8YBDqZR0GTfPbfKgNEpzDeOVG00Xdb5qEaC');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>
);
