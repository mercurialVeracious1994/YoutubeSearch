import React from "react";
import "./style.scss";

const Video = ({ videoData }) => {
  return (
    <section className="video">
      <section className="video--thumbnail">
      <a href={`https://www.youtube.com/watch?${videoData.id.videoId}`} target="_blank" rel="noreferrer">
        <img
          src={videoData.snippet.thumbnails.high.url}
          width="200"
          height="200"
        />
        </a>
      </section>
      <section className="video--title-and-description">
        <a href={`https://www.youtube.com/watch?${videoData.id.videoId}`} target="_blank" >
          {videoData.snippet.title}
        </a>
        <p>{videoData.snippet.description}</p>
      </section>
    </section>
  );
};
export default Video;
