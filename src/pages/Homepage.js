import React from "react";
// import { Link } from "react-router-dom";
import FeaturedBlogPosts from "../components/Featured";
import OtherNews from "../components/OtherNews";
import RecentSports from "../components/RecentSports";
import RecentBusiness from "../components/RecentBusiness";
import RecentArts from "../components/RecentArts";
import RecentWeather from "../components/RecentWeather";
import RecentCelebrity from "../components/RecentCelebrity";
import RecentInternational from "../components/RecentInternational";
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
      <div className="homepage-content">
        <div>
          <RecentArts />
        </div>
        <div>
          <RecentBusiness />
        </div>
        <div>
          <RecentSports />
        </div>
        <div>
          <RecentWeather />
        </div>
        <div>
          <RecentCelebrity />
        </div>
        <div>
          <RecentInternational />
        </div>
      </div>
    </>
  );
}
