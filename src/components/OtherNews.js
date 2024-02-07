import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import BlockContent from "@sanity/block-content-to-react";

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
        <span>Other News</span>
      </h1>
      {featuredPosts.map((post) => (
        <div key={post.slug.current} className="post">
          <h2>{post.title}</h2>
          <small>{new Date(post.publishedAt).toLocaleDateString()}</small>
          <BlockContent blocks={post.body} />
          {/* <ReactMarkdown>{post.body}</ReactMarkdown>
          <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}
        </div>
      ))}
    </div>
  );
};

export default OtherNews;
