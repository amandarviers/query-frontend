import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function OtherNews() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/reviews?sort=publishedAt:desc&filters[featured][$eq]=False"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error. Refresh and try again.</p>;

  return (
    <>
      <h1>Other News</h1>
      {data.slice(0, 4).map((review) => (
        <div key={review.id} className="review-card">
          <h2>{review.attributes.Title}</h2>

          <small>
            {dayjs(review.attributes.publishedAt).format("MMMM D, YYYY h:mm A")}
          </small>

          <p>
            {review.attributes.Body.substring(0, 200)}... <br />
            <Link to={`/article/${review.id}`}>Read more</Link>
          </p>
          <hr />
        </div>
      ))}

      {data.slice(4, 5).map((review) => (
        <div key={review.id} className="review-card">
          <h2>{review.attributes.Title}</h2>

          <small>
            {dayjs(review.attributes.publishedAt).format("MMMM D, YYYY h:mm A")}
          </small>

          <p>
            {review.attributes.Body.substring(0, 200)}... <br />
            <Link to={`/article/${review.id}`}>Read more</Link>
          </p>
        </div>
      ))}
    </>
  );
}
