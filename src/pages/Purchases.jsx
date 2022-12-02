import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();

  const purchases = useSelector(state => state.purchases);
  
  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  return (
    <div className="purchaseBack">
      <h1>Purchases <img src="../box.png" alt="" /> </h1> 
      <ul>
        {purchases && purchases.map(purchase => (
            <li className="purchases" key={purchase.id}>
                {purchase.cart.products.map(product => (
                    <li>
                        <Link to={`/product/${product.id}`}>
                            <img src="../order.png" alt="" className="order"/>
                            <h4 className="date">{product.updatedAt} </h4>
                            <h4>{product.title}</h4> <br />
                            $ {product.price}
                        </Link>
                    </li>
                ))}
            </li>
                ))
        }

      </ul>
    </div>
  );
};


export default Purchases;