import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Meta from "./Meta";
import "./NewsFeed.css";

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
      <Meta title={"News"} />
      {loading && <div style={{width: "100vw", height: "100vh", backgroundColor: "black", display: "flex", justifyContent: "center", alignItems:"center"}}><Loading /></div>}
      {/* <div> { <Loading />}</div> */}
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        {newsFeed.map((item, i) => (
          <div className="newsfeed-overall-container" key={i}>
            <div className="newsfeed-inner-container">
              <img
                className="newsfeed-img"
                src={item.enclosure.url}
                alt="newsfeed"
              />
              <div className="news-container">
                <div style={{padding: "2px"}}>
                  <a
                    className="newsfeed-link"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title}
                  </a>
                </div>
                <div className="newsfeed-date">{item.pubDate.slice(0, 16)}</div>
                <div className="newsfeed-snippet">{item.contentSnippet}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
