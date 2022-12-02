import React, { useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCartThunk, getCartThunk } from "../store/slices/cart.slice";

const Cart = ({ show, handleClose }) => {

  const dispatch =useDispatch();
  
  const cart = useSelector(state => state.cart);

  useEffect(() =>{
    dispatch(getCartThunk());
  },[])


  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart <img src="../cartL.png" alt="" /> </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="cartBody">
        {cart.map(product =>(
          <div className="productCart">
            <h6>{product.title}</h6> <br />
            {product.brand} <br />
            <p>${product.price}</p> 
          </div>
        ))}
        <Button onClick={() => dispatch(checkoutCartThunk())} className='checkout'>Checkout</Button>

      </Offcanvas.Body>
    </Offcanvas>
  );
};




export default Cart;