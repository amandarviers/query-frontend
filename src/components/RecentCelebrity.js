import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const RecentCelebrity = () => {
  const [recentCelebrity, setRecentCelebrity] = useState(null);

  useEffect(() => {
    const fetchRecentCelebrity = async () => {
      try {
        const data = await sanityClient.fetch(
          `
            *[_type == 'post' && $categoryId in categories[]._ref] | order(publishedAt desc) [0] {
              title,
              slug,
              summary,
              categories[]->{
                title
              },
              author->{name},
              mainImage {
                _type,
                asset->{
                  url
                }
              },
              publishedAt,
              body
            }`,
          { categoryId: "23fcc744-4a59-4c84-ae53-7f0aa2ac28b5" }
        );

        setRecentCelebrity(data);
      } catch (error) {
        console.error("Error fetching recent celebrity posts:", error);
      }
    };

    fetchRecentCelebrity();
  }, []);

  if (!recentCelebrity || !recentCelebrity.slug) {
    return (
      <div>
        <h1>
          <span>New In Celebrities</span>
        </h1>
        <p>
          <br />
          No available articles
        </p>
      </div>
    );
  } else {
    return (
      <div className="featuredArticle">
        <h1>
          <span>New In Celebrity</span>
        </h1>
        <div key={recentCelebrity.slug.current} className="lastPost">
          {recentCelebrity.mainImage !== undefined && (
            <p align="center" className="smallImg">
              <img
                src={recentCelebrity.mainImage.asset.url}
                alt={recentCelebrity.title}
              />
            </p>
          )}
          <p className="postDetails">
            {new Date(recentCelebrity.publishedAt).toLocaleDateString()} &bull;{" "}
            {recentCelebrity.author && recentCelebrity.author.name}
          </p>
          <h2>
            <Link to={`/article/${recentCelebrity.slug.current}`}>
              {recentCelebrity.title}
            </Link>
          </h2>
          {recentCelebrity.summary}
        </div>
      </div>
    );
  }
};

export default RecentCelebrity;
