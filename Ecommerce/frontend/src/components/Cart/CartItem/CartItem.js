import React from "react";
import {
  Typography,
  Card,
  Button,
  CardActions,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import useStyles from "./styles";
const CartItem = ({ item, cartItem, onUpdateCartQty, onRemoveCartQty }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={item.get_image}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">${cartItem.total_price}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => {
              onUpdateCartQty(
                cartItem.number,
                cartItem.quantity - 1,
                item.price
              );
            }}
          >
            -
          </Button>
          <Typography>{cartItem.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => {
              onUpdateCartQty(
                cartItem.number,
                cartItem.quantity + 1,
                item.price
              );
            }}
          >
            +
          </Button>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => {
              onRemoveCartQty(cartItem.number);
            }}
          >
            Remove
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartItem;
