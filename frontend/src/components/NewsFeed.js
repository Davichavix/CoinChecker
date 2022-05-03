import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

export const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFeed = async () => {
      const feed = await axios.get("/api/coins/news");
      setNews(feed.data.items);
      setLoading(false);
    };

    fetchFeed();
  }, []);

  const newsFeed = news;

  return (
    <>
      <div> {loading ? <Loading /> : ""}</div>
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
                style={{ width: "450px", height: "200px" }}
              />
              <div style={{ textAlign: "left", width: "450px" }}>
                <div>
                  <a href={item.link} target="_blank">
                    {item.title}
                  </a>
                </div>
                <div>{item.pubDate.slice(0, 16)}</div>
                <div>{item.contentSnippet}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
