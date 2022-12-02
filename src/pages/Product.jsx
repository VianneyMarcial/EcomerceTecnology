import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from "../store/slices/products.slice";

const Product = () => {

    const {id} =useParams();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProductsThunk());
    }, []);


    const productList = useSelector(state => state.products);

    const products = productList.find(product => product.id === Number(id))

    const relateProducts = productList.filter(product =>
        product.category.id === products.category.id && product.id!==products.id
    );

    const [quantity, setQuantity] = useState("");

    const addProduct = () => {
        const productToCart = {
            id: products?.id,
            quantity: quantity
        }

        dispatch(createCartThunk(productToCart));
    }

    return (
        <div>
            <div className='product'>
                { products?.productImgs.length && <img src={products?.productImgs[0]} alt="" className='imgProduct'/> }
                <h1>{products?.title}</h1>
                <h4>${products?.price}</h4>

                <div className='addProduct'>
                    <input type="text" placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                    <button onClick={addProduct} className='add'>Add</button>
                </div>

                <div className='description'>
                    <h6>{products?.description}</h6>
                </div>
                <button className='addProduct'>Add to cart <img src="../cart.png" alt="" /> </button>
            </div>
            <br />
            <h3 className='relatedH3'>Related Produts:</h3>
                <div className='relatedProducts'>
                    {relateProducts.map((product) => (
                        <li className='related' key={product.id}>
                        <div className='productRelated'>
                            <Link to={`/product/${product.id}`}> <img src={product.productImgs[0]} alt="" className='imgRelated'/> <div><h5>{product.title}</h5></div> </Link>
                        </div>
                        </li>
                ))}
                </div>
        </div>
    );
};

export default Product;
