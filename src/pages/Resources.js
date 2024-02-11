import React, { useState, useEffect } from "react";
import sanityClient from "../Client";

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await sanityClient.fetch(
          `
            *[_type == 'resourcePage'] | order(name asc) {
              name,
              url,
              description
            }`
        );

        setResources(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchResources();
  }, []);

  console.log(resources);

  if (!resources) {
    return <div>Loading...</div>;
  }

  // Calculate the middle index for splitting
  const middleIndex = Math.ceil(resources.length / 2);

  // Split the resources into two arrays
  const firstHalf = resources.slice(0, middleIndex);
  const secondHalf = resources.slice(middleIndex);

  return (
    <div>
      <h1>
        <span>Resources</span>
      </h1>
      <div className="resourceColumns">
        {/* First column */}
        <div className="resourceColumn">
          {firstHalf.map((post) => (
            <div key={post.name}>
              <a href={post.url}>{post.name}</a>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
        {/* Second column */}
        <div className="resourceColumn">
          {secondHalf.map((post) => (
            <div key={post.name}>
              <a href={post.url}>{post.name}</a>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
