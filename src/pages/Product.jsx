import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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

    return (
        <div>
            <div className='product'>
                { products.productImgs.length && <img src={products.productImgs[0]} alt="" className='imgProduct'/> }
                <h1>{products.title}</h1>
                <h4>${products.price}</h4>
                <div className='description'>
                    <h6>{products.description}</h6>
                </div>
                <button className='addProduct'>Add to cart <img src="../cart.png" alt="" /> </button>
            </div>
            <br />
            <h3>Related Produts:</h3>
                <div className='relatedProducts'>
                    {relateProducts.map((product) => (
                        <li className='related' key={product.id}>
                        <div className='productRelated'>
                            <Link to={`/product/${product.id}`}> <img src={product.productImgs[0]} alt="" className='imgRelated'/> <h5>{product.title}</h5> </Link>
                        </div>
                        </li>
                ))}
                </div>
        </div>
    );
};

export default Product;