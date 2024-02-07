import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";

export default function OldFeatured() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/reviews?populate=*&sort=publishedAt:desc&filters[Featured][$eq]=True"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error. Refresh and try again.</p>;

  return (
    <div className="featuredArticle">
      <h1>Featured Article</h1>
      {data.slice(0, 1).map((review) => (
        <div key={review.id} className="review-card">
          {console.log(review)}
          <img
            alt=""
            src={
              "http://localhost:1337" +
              review.attributes.Cover.data.attributes.url
            }
          />
          <h2>{review.attributes.Title}</h2>

          <small>
            {dayjs(review.attributes.publishedAt).format("MMMM D, YYYY h:mm A")}
          </small>

          <ReactMarkdown>{review.attributes.Body}</ReactMarkdown>
          {/* <p>{review.attributes.Body}</p> */}
          <Link to={`/article/${review.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );

  // return (
  //   <>
  //     <div className="primarySection">
  //       <div className="homepageContainer">
  //         <div className="homepageLeft">
  //           <h1>Breaking News</h1>
  //           <p>
  //             Yr authentic snackwave echo park YOLO lo-fi poutine asymmetrical
  //             you probably haven't heard of them venmo. Synth ramps echo park
  //             street art etsy. Brunch coloring book godard knausgaard, bitters
  //             enamel pin lomo sartorial four dollar toast humblebrag VHS
  //             ethical. Gentrify chartreuse cardigan biodiesel. Yr skateboard
  //             ethical solarpunk. Selvage 8-bit helvetica XOXO distillery bruh
  //             blackbird spyplane pickled before they sold out hashtag shaman
  //             keytar.
  //           </p>
  //           <p>
  //             I'm baby lomo taiyaki marfa vexillologist chartreuse knausgaard.
  //             Salvia microdosing green juice, DIY marfa slow-carb man bun 8-bit.
  //             Sriracha fashion axe deep v butcher selfies occupy kitsch. Kitsch
  //             pabst truffaut distillery 8-bit hoodie listicle heirloom banjo
  //             wolf poutine. Truffaut fixie tumeric fanny pack.
  //           </p>
  //           <p>
  //             Poke XOXO pour-over banh mi typewriter. Jawn food truck schlitz,
  //             tilde activated charcoal leggings squid. Disrupt selvage bruh
  //             enamel pin, subway tile venmo gorpcore jean shorts pabst.
  //             Typewriter DIY portland cray mlkshk, migas XOXO health goth photo
  //             booth. Fashion axe VHS ethical scenester DSA enamel pin gastropub
  //             hammock taxidermy YOLO tumeric artisan chambray. Pitchfork
  //             portland beard freegan polaroid swag kinfolk seitan etsy mlkshk
  //             butcher everyday carry ugh subway tile mukbang.
  //           </p>
  //           <p>
  //             Air plant locavore solarpunk, lyft selvage +1 scenester man braid
  //             leggings try-hard pitchfork gatekeep cloud bread bruh. Marfa
  //             fingerstache yuccie vice. Affogato sartorial hella, pug quinoa
  //             vaporware chillwave bitters keffiyeh taiyaki. Organic shaman
  //             pop-up snackwave, shabby chic vibecession 8-bit pok pok mukbang
  //             intelligentsia XOXO Brooklyn pork belly blue bottle. Blackbird
  //             spyplane kickstarter quinoa selfies.
  //           </p>
  //         </div>
  //         <div className="homepageRight">
  //           <h1>Top Articles</h1>
  //           <p>
  //             Typewriter ascot viral prism yes plz. Cronut man bun solarpunk
  //             portland jianbing. Tote bag occupy semiotics irony vice, artisan
  //             praxis four loko scenester portland la croix PBR&B chartreuse
  //             pabst.
  //           </p>
  //           <p>
  //             YOLO grailed listicle single-origin coffee praxis bruh poutine
  //             sartorial chartreuse williamsburg viral leggings.
  //           </p>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="secondarySection">
  //       <div className="primarySection">
  //         <h1>Recent Happenings</h1>
  //         <p>
  //           Poke XOXO pour-over banh mi typewriter. Jawn food truck schlitz,
  //           tilde activated charcoal leggings squid. Disrupt selvage bruh enamel
  //           pin, subway tile venmo gorpcore jean shorts pabst. Typewriter DIY
  //           portland cray mlkshk, migas XOXO health goth photo booth. Fashion
  //           axe VHS ethical scenester DSA enamel pin gastropub hammock taxidermy
  //           YOLO tumeric artisan chambray. Pitchfork portland beard freegan
  //           polaroid swag kinfolk seitan etsy mlkshk butcher everyday carry ugh
  //           subway tile mukbang.
  //         </p>
  //         <p>
  //           Air plant locavore solarpunk, lyft selvage +1 scenester man braid
  //           leggings try-hard pitchfork gatekeep cloud bread bruh. Marfa
  //           fingerstache yuccie vice. Affogato sartorial hella, pug quinoa
  //           vaporware chillwave bitters keffiyeh taiyaki. Organic shaman pop-up
  //           snackwave, shabby chic vibecession 8-bit pok pok mukbang
  //           intelligentsia XOXO Brooklyn pork belly blue bottle. Blackbird
  //           spyplane kickstarter quinoa selfies.
  //         </p>
  //       </div>
  //     </div>

  //     <div className="primarySection">
  //       <h1>Celebrity Sightings</h1>
  //       <p>
  //         Poke XOXO pour-over banh mi typewriter. Jawn food truck schlitz, tilde
  //         activated charcoal leggings squid. Disrupt selvage bruh enamel pin,
  //         subway tile venmo gorpcore jean shorts pabst. Typewriter DIY portland
  //         cray mlkshk, migas XOXO health goth photo booth. Fashion axe VHS
  //         ethical scenester DSA enamel pin gastropub hammock taxidermy YOLO
  //         tumeric artisan chambray. Pitchfork portland beard freegan polaroid
  //         swag kinfolk seitan etsy mlkshk butcher everyday carry ugh subway tile
  //         mukbang.
  //       </p>
  //       <p>
  //         Air plant locavore solarpunk, lyft selvage +1 scenester man braid
  //         leggings try-hard pitchfork gatekeep cloud bread bruh. Marfa
  //         fingerstache yuccie vice. Affogato sartorial hella, pug quinoa
  //         vaporware chillwave bitters keffiyeh taiyaki. Organic shaman pop-up
  //         snackwave, shabby chic vibecession 8-bit pok pok mukbang
  //         intelligentsia XOXO Brooklyn pork belly blue bottle. Blackbird
  //         spyplane kickstarter quinoa selfies.
  //       </p>
  //     </div>
  //   </>
  // );
}
