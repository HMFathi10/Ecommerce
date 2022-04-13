import React, { useState, useEffect } from "react";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [cartitems, setCartItems] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const calculateTotalPrice = (price, quantity) => {
    const total = (parseInt(quantity) * parseFloat(price) * 1.1925).toFixed(2);
    return total;
  };

  const fetchItems = async () => {
    const data = await fetch("http://127.0.0.1:8000/api/v1/latest-products/");

    const products = await data.json();
    setProducts(products);
  };

  const fetchCart = async () => {
    const data = await fetch("http://127.0.0.1:8000/api/v1/latest-carts/");

    const cart = await data.json();
    setCart(cart);
    setCartItems(cart.items);
    // console.log(cart);
  };

  const handleAddToCart = async (product, quantity, price) => {
    const productItem = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product,
        quantity: quantity,
        price_ht: price,
        total_price: calculateTotalPrice(price, quantity),
        cart: cart.cart.number,
      }),
    };
    const cartResponse = await fetch(
      `http://127.0.0.1:8000/api/v1/latest-cartitems/`,
      productItem
    );
    const responseData = await cartResponse.json();
    fetchCart();
  };

  const handleUpdateCart = async (itemId, quantity, price) => {
    if (quantity < 1) {
      handleDeleteCart(itemId);
    } else {
      const productItem = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: itemId,
          quantity: quantity,
          total_price: calculateTotalPrice(price, quantity),
        }),
      };
      const cartResponse = await fetch(
        `http://127.0.0.1:8000/api/v1/latest-cartitemsmaintainable/${itemId}/`,
        productItem
      );
      const responseData = await cartResponse.json();
      fetchCart();
    }
  };

  const handleDeleteCart = async (itemId) => {
    const productItem = {
      method: "DELETE",
    };

    const cartResponse = await fetch(
      `http://127.0.0.1:8000/api/v1/latest-cartitemsmaintainable/${itemId}/`,
      productItem
    );
    const responseData = await cartResponse;
    fetchCart();
  };

  const handleCaptureCheckout = async (newOrder) => {
    try {
      setOrder(newOrder);
      handleDeleteWholeCart(cart.cart.number);
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  const handleDeleteWholeCart = async (cartId) => {
    const productItem = {
      method: "DELETE",
    };
    const cartResponse = await fetch(
      `http://127.0.0.1:8000/api/v1/latest-cartitems/${cartId}/`,
      productItem
    );
    fetchCart();
  };
  useEffect(() => {
    fetchItems();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cartitems.length} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          ></Route>
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCart={handleUpdateCart}
                handleDeleteCart={handleDeleteCart}
                handleDeleteWholeCart={handleDeleteWholeCart}
              />
            }
          ></Route>
          <Route
            exact
            path="/checkout"
            element={
              <Checkout
                cartData={cart}
                cartItems={cartitems}
                products={products}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
