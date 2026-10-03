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
