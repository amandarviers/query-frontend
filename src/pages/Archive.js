import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const Archive = () => {
  const [archive, setArchive] = useState([]);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const data = await sanityClient.fetch(
          `
            *[_type == 'post'] | order(publishedAt desc) {
              title,
              slug,
              summary,
              author->{name},
              publishedAt,
              body
            }`
        );

        setArchive(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchArchive();
  }, []);

  if (!archive) {
    return <div>Loading...</div>;
  }

  return (
    <div className="articlePage">
      <h1>
        <span>Archive</span>
      </h1>
      {archive.map((post, index) => (
        <div
          key={post.slug.current}
          className={index === archive.length - 1 ? "lastPost" : "post"}
        >
          <p className="postDetails">
            {new Date(post.publishedAt).toLocaleDateString()} &bull;{" "}
            {post.author.name}
          </p>
          <h2>
            <Link to={`/article/${post.slug.current}`}>{post.title}</Link>
          </h2>
          {post.summary}
        </div>
      ))}
    </div>
  );
};

export default Archive;
