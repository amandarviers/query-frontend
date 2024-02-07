import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const OtherNews = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        // Fetch blog posts with the category 'featured'
        const data = await sanityClient.fetch(`
          *[_type == 'post'] {
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

  console.log(featuredPosts);

  return (
    <div className="featuredArticle">
      <h1>
        <span>Other News</span>
      </h1>
      {featuredPosts.map((post) => (
        <div key={post.slug.current} className="post">
          <p className="postDetails">
            {new Date(post.publishedAt).toLocaleDateString()} &bull;{" "}
            {post.author.name}
          </p>
          <h2>
            <Link to={`/article/${post.slug.current}`}>{post.title}</Link>
          </h2>
          {post.summary}
          {/* <BlockContent blocks={post.body} /> */}
        </div>
      ))}
    </div>
  );
};

export default OtherNews;
