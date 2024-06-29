import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import BlockContent from "@sanity/block-content-to-react";

const Staff = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await sanityClient.fetch(
          `
            *[_type == 'author'] | order(name desc) {
              name,
              slug,
              image {
                _type,
                asset->{
                  url
                }
              },
              bio
            }`
        );

        setStaff(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchStaff();
  }, []);

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div className="articlePage">
      <h1>
        <span>Staff Directory</span>
      </h1>
      {staff.map((author, index) => (
        <div
          key={author.slug.current}
          className={index === staff.length - 1 ? "lastPost" : "post"}
        >
          {author.image !== undefined && (
            <p align="center">
              <img
                className="mainImage"
                src={author.image.asset.url}
                alt={author.name}
              />
            </p>
          )}
          <h2>{author.name}</h2>
          <BlockContent blocks={author.bio} />
        </div>
      ))}
    </div>
  );
};

export default Staff;
