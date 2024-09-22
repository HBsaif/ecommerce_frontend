import React from "react";
import Banner from "../components/banner";
import BannerBox from "../components/bannerBox";
import Features from "../components/features";
import Layout from "../components/layout/mainlayout";
import NewArrivals from "../components/newArrivals";
import Poster from "../components/poster";
import Products from "../components/products";
import Salesbox from "../components/salesBox";
function HomePage() {
    return (
        <Layout>
            <Banner/>
            <Features/>
            <Products/>
            <Poster/>
            <NewArrivals/>
            <BannerBox/>
            <Salesbox/>
        </Layout>

    )
}

export default HomePage;