import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const FeaturedBlogPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == 'post' && featured == true] {
            title,
            slug,
            summary,
            author->{name},
            mainImage {
              _type,
              asset->{
                url
              }
            },
            publishedAt,
            body
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
        <span>Featured Articles</span>
      </h1>
      {featuredPosts.map((post) => (
        <div key={post.slug.current} className="post">
          {post.mainImage !== undefined && (
            <p align="center">
              <img src={post.mainImage.asset.url} alt={post.title} />
            </p>
          )}
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

export default FeaturedBlogPosts;
