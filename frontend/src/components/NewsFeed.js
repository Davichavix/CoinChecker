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
      <div> {loading && <Loading />}</div>
      <div>
        {newsFeed.map((item, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              marginBottom: "2rem",
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                alignItems: "center",
                marginLeft: "5rem",
              }}
            >
              <img
                src={item.enclosure.url}
                style={{ width: "450px", height: "200px" }}
              />
              <div
                style={{ textAlign: "left", width: "60%", marginLeft: "2rem" }}
              >
                <div>
                  <a
                    href={item.link}
                    target="_blank"
                    style={{ fontSize: "1.5rem" }}
                  >
                    {item.title}
                  </a>
                </div>
                <div>{item.pubDate.slice(0, 16)}</div>
                <div style={{ width: "75%", fontSize: "1.5rem" }}>
                  {item.contentSnippet}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
