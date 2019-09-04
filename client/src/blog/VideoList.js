import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, onVideoSelect }) => {
  const renderedList = videos.map(v => {
    return <VideoItem key={v._id} onVideoSelect={onVideoSelect} video={v} />;
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default VideoList;
