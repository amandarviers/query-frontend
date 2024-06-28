import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const RecentArts = () => {
  const [recentArts, setRecentArts] = useState(null);

  useEffect(() => {
    const fetchRecentArts = async () => {
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
          { categoryId: "2512d3a4-1023-47cf-b05b-78438719ce9d" }
        );

        setRecentArts(data);
      } catch (error) {
        console.error("Error fetching recent arts posts:", error);
      }
    };

    fetchRecentArts();
  }, []);

  if (!recentArts || !recentArts.slug) {
    return (
      <div>
        <h1>
          <span>New In Entertainment & Arts</span>
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
          <span>New In Entertainment & Arts</span>
        </h1>
        <div key={recentArts.slug.current} className="lastPost">
          {recentArts.mainImage !== undefined && (
            <p align="center" className="smallImg">
              <img
                src={recentArts.mainImage.asset.url}
                alt={recentArts.title}
              />
            </p>
          )}
          <p className="postDetails">
            {new Date(recentArts.publishedAt).toLocaleDateString()} &bull;{" "}
            {recentArts.author.name}
          </p>
          <h2>
            <Link to={`/article/${recentArts.slug.current}`}>
              {recentArts.title}
            </Link>
          </h2>
          {recentArts.summary}
        </div>
      </div>
    );
  }
};

export default RecentArts;
