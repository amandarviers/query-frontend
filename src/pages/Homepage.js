import React from "react";
// import { Link } from "react-router-dom";
import FeaturedBlogPosts from "../components/Featured";
import OtherNews from "../components/OtherNews";
// import dayjs from "dayjs";

export default function Homepage() {
  return (
    <>
      <div className="homepage-content">
        <FeaturedBlogPosts />
        <div class="additional-articles">
          <OtherNews />
        </div>
      </div>
    </>
  );
}
