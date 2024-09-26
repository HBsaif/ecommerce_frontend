import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../components/css/test.css";
import { axiosInstanceWithoutAuth } from '../util/axiosInstance'; // Use your custom axios instance

function Details() {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstanceWithoutAuth.get(`/api/products/${productId}`);
        if (response.data.status === "SUCCESS") {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; // Optionally handle loading state
  }

  return (
    <section className="py-5 prod-details-wrap">
      <div className="container">
        <div className="row gx-5">
          <aside className="col-lg-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center">
              <a
                data-fslightbox="mygalley"
                className="rounded-4"
                target="_blank"
                data-type="image"
                href="{product.imageUrl}"
                rel="noreferrer"
              >
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100vh",
                    margin: "auto",
                  }}
                  className="rounded-4 fit"
                  src="https://picsum.photos/id/1/600/500"
                  alt={product.name}
                />
              </a>
            </div>
          </aside>
          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">{product.name}</h4>
              <div className="d-flex flex-row my-3">
                <div className="text-warning mb-1 me-2">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <span className="ms-1">4.5</span>
                </div>
                <span className="text-muted">
                  <i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders
                </span>
                <span className="text-success ms-2">In stock</span>
              </div>

              <div className="mb-3">
                <span className="h5">${product.price}</span>
                <span className="text-muted">/per item</span>
              </div>

              <p>{product.description}</p>

              <hr />

              <div className="row mb-4">
                <a href="#" className="btn btn-warning shadow-0">
                  Buy now
                </a>
                <a href="#" className="btn btn-primary shadow-0">
                  <i className="me-1 fa fa-shopping-basket"></i> Add to cart
                </a>
                <a href="#" className="btn btn-light border border-secondary py-2 icon-hover px-3">
                  <i className="me-1 fa fa-heart fa-lg"></i> Save
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default Details;
