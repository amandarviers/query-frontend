import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const RecentInternational = () => {
  const [recentInternational, setRecentInternational] = useState(null);

  useEffect(() => {
    const fetchRecentInternational = async () => {
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
          { categoryId: "4a83b603-04d9-4c53-b265-8baca7413815" }
        );

        setRecentInternational(data);
      } catch (error) {
        console.error("Error fetching recent arts posts:", error);
      }
    };

    fetchRecentInternational();
  }, []);

  if (!recentInternational || !recentInternational.slug) {
    return (
      <div>
        <h1>
          <span>New In International</span>
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
          <span>New In Arts</span>
        </h1>
        <div key={recentInternational.slug.current} className="lastPost">
          {recentInternational.mainImage !== undefined && (
            <p align="center" className="smallImg">
              <img
                src={recentInternational.mainImage.asset.url}
                alt={recentInternational.title}
              />
            </p>
          )}
          <p className="postDetails">
            {new Date(recentInternational.publishedAt).toLocaleDateString()}{" "}
            &bull; {recentInternational.author.name}
          </p>
          <h2>
            <Link to={`/article/${recentInternational.slug.current}`}>
              {recentInternational.title}
            </Link>
          </h2>
          {recentInternational.summary}
        </div>
      </div>
    );
  }
};

export default RecentInternational;
