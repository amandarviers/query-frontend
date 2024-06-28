import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import BlockContent from "@sanity/block-content-to-react";

const About = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await sanityClient.fetch(
          `
            *[_type == 'aboutPage'] | order(order asc) {
              header,
              body
            }`
        );

        setAbout(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAbout();
  }, []);

  if (about.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="articlePage">
      <h1>
        <span>About</span>
      </h1>
      {about.map((post) => (
        <div key={post.order}>
          <h2>{post.header}</h2>
          <BlockContent blocks={post.body} />
        </div>
      ))}
    </div>
  );
};

export default About;
