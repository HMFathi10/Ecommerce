import React from "react";
import { Typography, Divider, Button } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import Review from "./Review";
import { loadStripe } from "@stripe/stripe-js";
const stripePromiss = loadStripe(
  "pk_test_51K1sWJB5iaFCck7D7nuxV0ewI0vJs3RMBaG8bOdi6jrzp0v8oqZh7yrtcsA9pFRJfYIHeZNxnYNWNbnOvceR8nWJ00wcKPrV88"
);
const PaymentForm = ({
  cartData,
  cartItems,
  backStep,
  shippingData,
  onCaptureCheckout,
  nextStep,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!elements || !stripe) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: cartData.items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckout(orderData);
      nextStep();
      // console.log(orderData);
    }
  };
  return (
    <>
      <Review cartData={cartData} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromiss}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disapled={!stripe}
                  color="primary"
                >
                  Pay {"$" + cartData.cart.cost}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
