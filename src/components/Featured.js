import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const FeaturedBlogPosts = () => {
  const [featuredPost, setFeaturedPost] = useState(null); // Change here

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == 'post' && featured == true] | order(publishedAt desc) [0] {
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
        setFeaturedPost(data);
      } catch (error) {
        console.error("Error fetching featured blog posts:", error);
      }
    };

    fetchFeaturedPost();
  }, []);

  return (
    <div className="featuredArticle">
      <h1>
        <span>Featured Article</span>
      </h1>
      {featuredPost && (
        <div key={featuredPost.slug.current} className="lastPost">
          {featuredPost.mainImage !== undefined && (
            <p align="center">
              <img
                src={featuredPost.mainImage.asset.url}
                alt={featuredPost.title}
              />
            </p>
          )}
          <p className="postDetails">
            {new Date(featuredPost.publishedAt).toLocaleDateString()} &bull;{" "}
            {featuredPost.author.name}
          </p>
          <h2>
            <Link to={`/article/${featuredPost.slug.current}`}>
              {featuredPost.title}
            </Link>
          </h2>
          {featuredPost.summary}
        </div>
      )}
    </div>
  );
};

export default FeaturedBlogPosts;
