import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
const Review = ({ cartData }) => {
  return (
    <>
      <Typography varaint="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cartData.items.map((item) => {
          return (
            <ListItem style={{ padding: "10px 0" }} key={item.product.name}>
              <ListItemText
                primary={item.product.name}
                secondary={`Quantity: ${item.cartItem.quantity}`}
              />
              <Typography varaint="body2">
                ${item.cartItem.total_price}
              </Typography>
            </ListItem>
          );
        })}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography varaint="subtitle1" style={{ fontWeight: 700 }}>
            $
            {/* {cart.map((subCart) => {
              return subCart.cost;
            })} */}
            {cartData.cart.cost}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
