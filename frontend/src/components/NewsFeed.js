import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
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
      <div> {loading && <Loading />}</div>
      <div>
        {newsFeed.map((item, i) => (
          <div className="newsfeed-overall-container" key={i}>
            <div className="newsfeed-inner-container">
              <img className="newsfeed-img" src={item.enclosure.url} alt="newsfeed"/>
              <div className="news-container">
                <div>
                  <a className="newsfeed-link" href={item.link} target="_blank" rel="noreferrer">
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
