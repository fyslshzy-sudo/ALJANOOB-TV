import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function Live() {
  // Fetch live stream settings from app public settings via base44
  const { data: settings } = useQuery({
    queryKey: ['liveSettings'],
    queryFn: async () => {
      try {
        const res = await base44.app.getPublicSettings();
        return res.public_settings || {};
      } catch (e) {
        return {};
      }
    }
  });

  const streamUrl = settings?.live_stream_url || "https://sample-live-stream-url.com";

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-heading text-foreground flex items-center gap-3">
            البث المباشر
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-signal-red/10 border border-signal-red/20 text-signal-red text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-red live-pulse"></span>
              مباشر
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">شاهد قناة الجنوب الفضائية بجودة عالية وبدون انقطاع على مدار الساعة</p>
        </div>
      </div>

      {/* Video Player Container */}
      <div className="player-container bg-card border border-border aspect-video rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center">
        {settings?.live_stream_url ? (
          <iframe 
            src={`/embed/live`} 
            className="w-full h-full border-none"
            allowFullScreen
            scrolling="no"
          ></iframe>
        ) : (
          <div className="text-center space-y-3 p-6">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </div>
            <p className="text-muted-foreground text-sm font-body">إعدادات البث المباشر غير متوفرة حالياً في لوحة التحكم.</p>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="p-5 bg-card border border-border rounded-xl space-y-2">
        <h3 className="font-heading font-bold text-foreground text-base">تنويه للمشاهدين</h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-body">
          إذا واجهت أي انقطاع أو بطء في البث، يرجى التحقق من سرعة اتصالك بالإنترنت أو تحديث الصفحة. المنصة تدعم التكيف التلقائي مع سرعات الإنترنت المختلفة لضمان أفضل تجربة مشاهدة.
        </p>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import LivePlayer from "@/components/LivePlayer";
import { Radio, Satellite } from "lucide-react";

export default function Live() {
  const [live, setLive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.LiveStream.list("-updated_date", 1)
      .then((data) => { setLive((data && data[0]) || null); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white gold-underline inline-block"> </h1>
      </div>

      {/* Player */}
      {loading ? (
        <div className="aspect-video rounded-xl bg-card animate-pulse" />
      ) : (
        <LivePlayer
          url={live?.stream_url || ""}
          title={live?.current_title || "Al Janoob Live"}
          subtitle={live?.is_live ? "   " : "   "}
        />
      )}

      {/* Program info card */}
      <div className="rounded-xl bg-card border border-border p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1.5 rounded border-2 border-red-600 text-red-500 text-xs font-extrabold tracking-wide">NOW PLAYING</span>
          {live?.category && <span className="px-3 py-1.5 rounded bg-primary/15 text-primary text-xs font-bold">{live.category}</span>}
          <span className="text-sm text-muted-foreground font-mono">20:00 - 20:45</span>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white">{live?.current_title || "Panorama Al Janoob"}</h2>
          {live?.current_title_ar && <p className="text-lg text-primary font-bold mt-1">{live.current_title_ar}</p>}
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {live?.description || " :   —           ."}
        </p>
      </div>

      {/* Satellite info */}
      <div className="rounded-xl bg-[#1a1d26] border border-border p-5">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Satellite className="w-5 h-5" />
          <span className="font-bold"> </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: "Arabsat 5A", freq: "11.900 GHz" },
            { name: "Nilesat 201", freq: "11.938 GHz" },
            { name: "Hotbird 13E", freq: "11.662 GHz" },
          ].map((s) => (
            <div key={s.name} className="rounded-lg bg-background/50 border border-border p-4 text-center">
              <div className="font-bold text-white text-sm">{s.name}</div>
              <div className="text-primary font-mono text-sm mt-1">{s.freq}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
