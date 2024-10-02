// src/pages/ProductDetails.js
import React from "react";
import Details from "../components/details";
import Layout from "../components/layout/mainlayout";
import { CartProvider } from '../context/cartContext'; // Import the CartProvider

function ProductDetails(){
    return(
        <CartProvider> {/* Wrap the layout with CartProvider */}
            <Layout>
                <Details/>
            </Layout>
        </CartProvider>
    )
}

export default ProductDetails;
