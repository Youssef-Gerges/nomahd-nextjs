"use client";
import React, { useState } from "react";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { useGetAllProductReviews } from "@/api/review/getAllProductReviews";
import { useSubmitReview } from "@/api/review/submitReview";

const Reviews = ({ product }) => {
  const { data: reviews } = useGetAllProductReviews(product?.id);
  const submitReview = useSubmitReview();

  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReview.mutate({
      product_id: product?.id,
      user_id: localStorage.getItem("id"),
      comment: newReview.review,
      rating: newReview.rating,
    });
  };

  return (
    <div>
      {/* Todo: move to orders page */}
      {/* {localStorage?.getItem("id") && (
        <>
          {" "}
          <h6 className="fw-bold">Submit a Review</h6>
          <form
            style={{
              borderBottom: "1px solid var(--line)",
              paddingBottom: "2rem",
              marginBottom: "2rem",
            }}
            onSubmit={handleSubmit}
          >
            <div>
              <label>Review:</label>
              <textarea
                name="review"
                value={newReview.review}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex align-items-center my-2 gap-2">
              <label>Rating:</label>
              <Rating value={newReview.rating} onChange={val => setNewReview(old => ({...old, rating: val}))} style={{ maxWidth: 150 }} />
            </div>
            <div style={{ textAlign: "end" }}>
              <button
                className="tf-btn btn-fill radius-3 justify-content-center fw-6 fs-14 flex-grow-1 animate-hover-btn"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )} */}
      <h6 className="fw-bold">Customer Reviews</h6>
      <div className="d-flex align-items-center gap-2 fs-20 text-black my-0">
        <Rating readOnly value={product?.rating} style={{ maxWidth: 150 }} />{" "}
        {product?.rating} out of 5
      </div>
      <p className="mt-0">{product?.rating_count} global ratings</p>
      <ul>
        {reviews?.data?.map((review) => (
          <li key={review.id}>
            <div className="d-flex align-items-start mb-4 gap-2">
              <img src={review.avatar} width={60} className="rounded-full" />
              <div>
                <strong>{review.user_name}</strong>
                <p className="d-flex align-items-center gap-2 my-0">
                  <Rating
                    readOnly
                    value={review.rating}
                    style={{ maxWidth: 70 }}
                  />
                  <p>{review.time}</p>
                </p>
                <div >{review.comment}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
