import React from "react";
import { Video } from "../video/video";
import "./style.scss";

export const SearchResults = ({ videos = [] }) => {
    return <section className="search-results">
        {videos.map((video) => {
            return <Video key={video.id.videoId} videoData={video} />
        })}
    </section>
};