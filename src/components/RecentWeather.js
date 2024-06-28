import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const RecentWeather = () => {
  const [recentWeather, setRecentWeather] = useState(null);

  useEffect(() => {
    const fetchRecentWeather = async () => {
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
          { categoryId: "3053fea8-68cb-4ea7-9337-d859940c5766" }
        );

        setRecentWeather(data);
      } catch (error) {
        console.error("Error fetching recent weather posts:", error);
      }
    };

    fetchRecentWeather();
  }, []);

  if (!recentWeather || !recentWeather.slug) {
    return (
      <div>
        <h1>
          <span>New In Weather</span>
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
          <span>New In Weather</span>
        </h1>
        <div key={recentWeather.slug.current} className="lastPost">
          {recentWeather.mainImage !== undefined && (
            <p align="center" className="smallImg">
              <img
                src={recentWeather.mainImage.asset.url}
                alt={recentWeather.title}
              />
            </p>
          )}
          <p className="postDetails">
            {new Date(recentWeather.publishedAt).toLocaleDateString()} &bull;{" "}
            {recentWeather.author.name}
          </p>
          <h2>
            <Link to={`/article/${recentWeather.slug.current}`}>
              {recentWeather.title}
            </Link>
          </h2>
          {recentWeather.summary}
        </div>
      </div>
    );
  }
};

export default RecentWeather;
