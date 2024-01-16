import { CurrencyRupee } from "@mui/icons-material";
import { Button } from "@mui/material";
import { API_PAYMENT_CREATE, API_PAYMENT_VALIDATE } from "Store/constants";
import axios from "axios";

function Payment() {
    return (
        <Button onClick={displayRazorpay} startIcon={<CurrencyRupee />}>Pay 500</Button>
    );
}

export default Payment;


async function displayRazorpay() {
    try {

        // Creating a new payment order
        const result = await axios.post(API_PAYMENT_CREATE);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;
        console.log(process.env.REACT_APP_RAZORPAY_KEY);
        const options = {
            key: "", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Savari Dekho Ltd.",
            description: "Test Transaction",
            order_id: order_id,
            // Response Handler
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                // Validate Payment
                const result = await axios.post(API_PAYMENT_VALIDATE, data);
                if (result.type === "success") {
                    alert(result.message);
                }else{
                    alert(result.message||"Payment Failed");
                }
            },
            prefill: {
                name: "Mr J",
                email: "j.soni@example.com",
                contact: "9876543210",
            },
            notes: {
                address: "C-101, Kanak Kala 2, Ah'd - 380015",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.log("Error: ", error.message);
    }
}


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}