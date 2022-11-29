import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [categoriesList, setCategoriesList] = useState([]);


  useEffect(() => {
    dispatch(getProductsThunk());

    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
        .then(res => setCategoriesList(res.data.data.categories))
  }, []);

  return (
    <div>
        <h1 className="wordHome">Home</h1>
        {categoriesList.map((category) => (
            <Button key={category.name}>{category.name}</Button>   
        ))}
        <div className="productsHome">
            {products && products.map((product) => {
                console.log(product);
                return (
                    <li key={product.id} className="productHome" >
                        <Link to={`/product/${product.id}`}> <img src={product.productImgs[0]} alt="" className="imgHome"/> <div className="infoHome"> {product.title} <h4>${product.price}</h4> <div className="buttonHome"><button><img src="../cart.png" alt="" /></button></div> </div> </Link>
                    </li>
            )})}
        </div>
    </div>
  );
};

export default Home;

