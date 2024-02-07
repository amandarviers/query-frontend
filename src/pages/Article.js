import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ReactMarkdown from "react-markdown";

export default function Article() {
  const { id } = useParams();
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/reviews/" + id + "?populate=*"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error. Refresh and try again.</p>;

  return (
    <div className="individual-review">
      {data.attributes.Cover.data !== null && (
        <img
          alt=""
          src={
            "http://localhost:1337" + data.attributes.Cover.data.attributes.url
          }
        />
      )}
      <h1>{data.attributes.Title}</h1>
      <small>console list</small>

      <ReactMarkdown>{data.attributes.Body}</ReactMarkdown>
    </div>
  );
}
