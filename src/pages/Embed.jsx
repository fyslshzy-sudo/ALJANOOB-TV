import React from 'react';
import { useParams } from 'react-router-dom';

export default function Embed() {
  const { type, id } = useParams();

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="w-full h-full relative flex items-center justify-center text-white font-body text-sm text-center p-4">
        <div className="space-y-2">
          <p className="font-heading font-bold text-primary text-base">مشغل قناة الجنوب الرقمي</p>
          <p className="text-xs text-zinc-400">جاري تحميل البث المتوافق لـ {type || 'المحتوى'}...</p>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import LivePlayer from "@/components/LivePlayer";

export default function Embed() {
  const { type, id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (type === "live") {
      base44.entities.LiveStream.list("-updated_date", 1)
        .then((d) => setData(d?.[0] || {}))
        .catch(() => setData({}));
    } else if (type === "video" && id) {
      base44.entities.Video.get(id)
        .then((d) => setData(d || {}))
        .catch(() => setData({}));
    } else {
      setData({});
    }
  }, [type, id]);

  const url = type === "live" ? data?.stream_url : data?.video_url;

  if (!data) return <div className="w-screen h-screen bg-black" />;

  if (!url) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center text-muted-foreground text-sm">
        {type === "live" ? "   " : "  "}
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black">
      <LivePlayer
        url={url}
        poster={type === "video" ? data.thumbnail_url : undefined}
        title={data.title || data.current_title || "Al Janoob"}
        subtitle=""
        autoPlay
        fill
      />
    </div>
  );
}
