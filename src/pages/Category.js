import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../Client";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const [category, setCategory] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const data = await sanityClient.fetch(
          `
            *[_type == 'post' && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
              title,
              slug,
              summary,
              categories[]->{
                title,
                slug
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
          { categorySlug: slug }
        );

        setCategory(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPostsByCategory();
  }, [slug]);

  console.log(category);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="articlePage">
      <h1>
        <span>{slug}</span>
      </h1>
      {category.map((post, index) => (
        <div
          key={post.slug.current}
          className={index === category.length - 1 ? "lastPost" : "post"}
        >
          <p className="postDetails">
            {new Date(post.publishedAt).toLocaleDateString()} &bull;{" "}
            {post.author.name}
          </p>
          <h2>
            <Link to={`/article/${post.slug.current}`}>{post.title}</Link>
          </h2>
          {post.summary}
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
