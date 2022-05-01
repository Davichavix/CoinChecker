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
  // console.log(newsFeed);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {newsFeed.map((item, i) => (
        <div
          key={i}
          style={{
            width: "50%",
            marginBottom: "2rem",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={item.enclosure.url}
              style={{ width: "100%", height: "200px" }}
            />
            <div style={{ textAlign: "left" }}>
              <div>
                <a href={item.link} target="_blank">
                  {item.title}
                </a>
              </div>
              <div>{item.pubDate.slice(0, 16)}</div>
              <div style={{ width: "480px" }}>{item.contentSnippet}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
