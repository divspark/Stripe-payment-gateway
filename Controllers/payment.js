import stripe from 'stripe';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const STRIPE_KEY = process.env.STRIPE_KEY || "";

// Initialize Stripe with your secret key
const stripeClient = stripe(STRIPE_KEY);

export const createPaymentIntent = async(req, res) => {
    const { amount } = req.body;

    //console.log(amount);

    if (!amount) return res.send("Please enter amount details");

    try {
        // Create a payment intent using the Stripe client
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: Number(amount) * 100, // Stripe expects amount in cents
            currency: "inr"
        });

        // return res.status(201).json({
        //     success: true,
        //     clientSecret: paymentIntent.client_secret,
        // });

        return res.sendFile("D:/Project Modules/Payment Gateway/views/Success.html")

    } catch (error) {
        // Handle any errors
        console.error("Error creating payment intent:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred while creating payment intent"
        });
    }
}
