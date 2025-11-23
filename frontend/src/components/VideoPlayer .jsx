import React from "react";

export default function VideoPlayer({ videoUrl }) {
  const embedUrl = convertToEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <div className="w-full bg-red-100 text-red-700 p-4 rounded-lg">
        ⚠️ Invalid video URL!
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={embedUrl}
        width="100%"
        height="400"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full"
        style={{ border: 'none' }}
      />
    </div>
  );
}

function convertToEmbedUrl(url) {
  if (!url) return "";

  let videoId = "";

  // Regular YouTube URL: youtube.com/watch?v=
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  }
  // YouTube Shorts: youtube.com/shorts/
  else if (url.includes("youtube.com/shorts/")) {
    videoId = url.split("shorts/")[1]?.split("?")[0];
  }
  // Short URL: youtu.be/
  else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  }
  // Embed URL already
  else if (url.includes("youtube.com/embed/")) {
    return url;
  }
  // Direct video ID (11 characters)
  else if (url.length === 11 && !url.includes("/") && !url.includes(" ")) {
    videoId = url;
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}