import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../Client";
import BlockContent from "@sanity/block-content-to-react";

const ArticlePage = () => {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == 'post' && slug.current == $slug][0] {
            title,
            publishedAt,
            body,
            author->{name},
            mainImage {
              _type,
              asset->{
                url
              }
            },
          }`,
          { slug }
        );

        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const { title, publishedAt, body, author, mainImage } = article;

  return (
    <div className="articlePage">
      {mainImage !== undefined && (
        <p align="center">
          <img className="mainImage" src={mainImage.asset.url} alt={title} />
        </p>
      )}
      <p className="postDetails">
        Published on {new Date(publishedAt).toLocaleDateString()} &bull;{" "}
        {author.name}
      </p>
      <h2>{title}</h2>

      <BlockContent blocks={body} />
    </div>
  );
};

export default ArticlePage;
