import axios from "axios";
import React from "react";

export default function Resources() {
  return (
    <div>
      <h1>Resources</h1>
    </div>
  );
}
axios.get("http://localhost:1337/api/reviews").then((response) => {
  console.log(response);
});
