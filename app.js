import express from 'express';
import path from 'path';

import { createPaymentIntent } from './Controllers/payment.js';
import bodyParser from 'body-parser';


const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from the 'public' directory
app.use(express.static("D:/Project Modules/Payment Gateway/views"));

// Parse JSON bodies
app.use(express.json());

// Serve the HTML file with the payment form
app.get('/', (req, res) => {
  res.sendFile("D:/Project Modules/Payment Gateway/views/payment.html");
});

// Handle POST request to process payment
app.post('/pay', createPaymentIntent);

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
