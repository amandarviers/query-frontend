import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const RecentBusiness = () => {
  const [recentBusiness, setRecentBusiness] = useState(null);

  useEffect(() => {
    const fetchRecentBusiness = async () => {
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
          { categoryId: "8ba37fa7-5793-46f2-bcc7-f3543270f260" }
        );

        setRecentBusiness(data);
      } catch (error) {
        console.error("Error fetching recent business posts:", error);
      }
    };

    fetchRecentBusiness();
  }, []);

  if (!recentBusiness || !recentBusiness.slug) {
    return (
      <div>
        <h1>
          <span>New In Business</span>
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
          <span>New In Business</span>
        </h1>
        <div key={recentBusiness.slug.current} className="lastPost">
          {recentBusiness.mainImage !== undefined && (
            <p align="center" className="smallImg">
              <img
                src={recentBusiness.mainImage.asset.url}
                alt={recentBusiness.title}
              />
            </p>
          )}
          <p className="postDetails">
            {new Date(recentBusiness.publishedAt).toLocaleDateString()} &bull;{" "}
            {recentBusiness.author.name}
          </p>
          <h2>
            <Link to={`/article/${recentBusiness.slug.current}`}>
              {recentBusiness.title}
            </Link>
          </h2>
          {recentBusiness.summary}
        </div>
      </div>
    );
  }
};

export default RecentBusiness;
