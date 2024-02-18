import React from "react"
import CheckoutStepper from "./CheckoutStepper";
import "./Stepper.css"

const Stepper = (props) => {

    const config = [
        {
            name: "Customer Info",
            component: ()=> <div>customer info</div>
        },
        {
            name: "Shipping Info",
            component: ()=> <div>Order has been shipped</div>
        },
        {
            name: "Payment",
            component: ()=> <div>Payment is done</div>
        },
        {
            name: "Delivered",
            component: ()=> <div>Your order has been delivered</div>
        }
    ]


  return (
    <div>
      <CheckoutStepper stepsConfig = {config}/>
    </div>
  )
};

export default Stepper;
