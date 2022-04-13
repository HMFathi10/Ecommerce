import React from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import useStyles from "./sytles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
const Cart = ({
  cart,
  handleUpdateCart,
  handleDeleteCart,
  handleDeleteWholeCart,
}) => {
  const classes = useStyles();
  // var ProductData;
  // const findProduct = (number) => {
  //   products.forEach((product) => {
  //     if (product.number == number) {
  //       ProductData = product;
  //       return;
  //     }
  //   });
  // };
  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping cart,
        <Link to="/" className={classes.link}>
          start adding some
        </Link>
        !
      </Typography>
    );
  };
  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.items.map((item) => {
            return (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem
                  item={item.product}
                  cartItem={item.cartItem}
                  onUpdateCartQty={handleUpdateCart}
                  onRemoveCartQty={handleDeleteCart}
                />
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4"> Subtotals: {cart.cart.cost}</Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="Button"
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteWholeCart(cart[0].id)}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
              className={classes.checkoutButton}
              size="large"
              type="Button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };
  if (!cart.items) return "Loading ... ";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3">
        Your Shopping Cart
      </Typography>
      {!cart.items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
