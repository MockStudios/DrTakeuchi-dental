"use client";

import { useState } from "react";

// Shows a self-hosted thumbnail and only loads YouTube (privacy-enhanced mode) once played,
// so the page makes no requests to Google until a visitor asks for the video.
export default function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="liteYouTube">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="liteYouTube" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
      <img src={`/images/reviews/video-${id}.webp`} alt="" loading="lazy" />
      <span className="liteYouTubePlay" aria-hidden="true" />
    </button>
  );
}
