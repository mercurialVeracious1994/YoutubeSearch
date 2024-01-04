import React, { useState, useEffect } from "react";
import axios from "axios";

function useSearchVideos(query, pageNum) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = "https://www.googleapis.com/youtube/v3/search?";
  const PART="snippet";
  const MAX_RESULTS =20;
  const TYPE = "video";
  
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await axios.get(
          `${API_URL}part=${PART}&maxResults=${MAX_RESULTS}&q=${query}&type=${TYPE}&key=${API_KEY}&pageToken=${nextPageToken}`
        );
        const response = res.data;
        const tokenForNextPage = response.nextPageToken;
        setVideos((prev) => {
          if (pageNum === 1) {
            return [...new Set([...response.items])];
          }
          return [...new Set([...prev, ...response.items])];
        });
        setNextPageToken(tokenForNextPage);
      } catch (e) {
        console.error(e);
        setError(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, pageNum]);

  return { isLoading, error, videos };
}

export default useSearchVideos;
