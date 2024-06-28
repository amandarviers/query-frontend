import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const OtherNews = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == 'post' && featured == false] | order(publishedAt desc) [0..2] {
            title,
            slug,
            summary,
            publishedAt,
            body,
            author->{name}
          }
        `);
        setFeaturedPosts(data);
      } catch (error) {
        console.error("Error fetching featured blog posts:", error);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return (
    <div className="featuredArticle">
      <h1>
        <span>Recent News</span>
      </h1>
      {featuredPosts.map((post, index) => (
        <div
          key={post.slug.current}
          className={index === featuredPosts.length - 1 ? "lastPost" : "post"}
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

export default OtherNews;
