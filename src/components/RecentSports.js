import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const RecentSports = () => {
  const [recentSports, setRecentSports] = useState(null);

  useEffect(() => {
    const fetchRecentSports = async () => {
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
          { categoryId: "73597382-5a42-4c81-ab03-b491e162685a" }
        );

        setRecentSports(data);
      } catch (error) {
        console.error("Error fetching recent sports posts:", error);
      }
    };

    fetchRecentSports();
  }, []);

  if (!recentSports || !recentSports.slug) {
    return (
      <div>
        <h1>
          <span>New In Sports</span>
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
          <span>New In Sports</span>
        </h1>
        <div key={recentSports.slug.current} className="lastPost">
          {recentSports.mainImage !== undefined && (
            <p align="center" className="smallImg">
              <img
                src={recentSports.mainImage.asset.url}
                alt={recentSports.title}
              />
            </p>
          )}
          <p className="postDetails">
            {new Date(recentSports.publishedAt).toLocaleDateString()} &bull;{" "}
            {recentSports.author.name}
          </p>
          <h2>
            <Link to={`/article/${recentSports.slug.current}`}>
              {recentSports.title}
            </Link>
          </h2>
          {recentSports.summary}
        </div>
      </div>
    );
  }
};

export default RecentSports;
