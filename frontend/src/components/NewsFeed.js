import axios from "axios";
import React, { useEffect, useState } from "react";

export const NewsFeed = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchFeed = async () => {
      const feed = await axios.get("/api/coins/news");
      setNews(feed.data.items);
    };

    fetchFeed();
  }, []);

  const newsFeed = news;

  return (
    <div>
      {newsFeed.map((item) => (
        <>
          <div>{item.title}</div>
          <div>{item.link}</div>
          <div>{item.pubDate}</div>
        </>
      ))}
    </div>
  );
};
