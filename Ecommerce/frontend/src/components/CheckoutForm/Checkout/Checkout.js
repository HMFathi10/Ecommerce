import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { Link } from "react-router-dom";
const steps = ["Shipping address", "Payment details"];
const Checkout = ({
  cartData,
  cartItems,
  products,
  order,
  onCaptureCheckout,
  error,
}) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    // console.log(data);
    setShippingData(data);
    nextStep();
  };

  const Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography varaint="h5">
            Thank you for your pruchase,{" "}
            {shippingData.firstName + " " + shippingData.lastName}
          </Typography>
          <Divider className={classes.divider} />
          <Typography varaint="subtitle2">Order ref: ref</Typography>
        </div>
        <br />
        <Button component={Link} to="/" varaint="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        cartData={cartData}
        cartItems={cartItems}
        products={products}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
      />
    );
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography varaint="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.steper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
