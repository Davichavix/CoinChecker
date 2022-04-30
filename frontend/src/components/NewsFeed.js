import axios from "axios";
import React, { useEffect } from "react";

export const NewsFeed = () => {

  useEffect(() => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/xml; charset=utf-8",
      },
    };
  
    axios
      .get("https://cointelegraph.com/rss", config)
      .then((res) => {
        console.log(res.data);
      });

  }, [])

  return <div>NewsFeed</div>;
};
