import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function VideoDetail() {
  const { id } = useParams();

  // Fetch single video object details from base44 collection
  const { data: video, isLoading, error } = useQuery({
    queryKey: ['videoDetail', id],
    queryFn: async () => {
      return await base44.items.getOne({
        collection: 'videos',
        id: id
      });
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-4xl space-y-6 animate-pulse">
        <div className="h-6 w-24 bg-muted rounded"></div>
        <div className="aspect-video w-full bg-muted rounded-2xl"></div>
        <div className="h-8 w-2/3 bg-muted rounded"></div>
        <div className="h-4 w-full bg-muted rounded"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="container mx-auto px-4 py-12 text-center max-w-md">
        <div className="bg-card border border-border p-8 rounded-xl space-y-4">
          <p className="text-muted-foreground">الفيديو المطلوب غير موجود أو تم حذفه.</p>
          <Link to="/videos" className="text-sm text-primary hover:underline block">العودة لمكتبة الفيديو ←</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-6">
      <Link to="/videos" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
        ← العودة لمكتبة الفيديو
      </Link>

      {/* Video Player Box Frame */}
      <div className="bg-card border border-border aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
        {video.youtube_url || video.video_url ? (
          <iframe
            src={video.youtube_url ? `https://youtube.com{new URL(video.youtube_url).searchParams.get('v')}` : video.video_url}
            title={video.title}
            className="w-full h-full border-none"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted font-body">
            رابط الفيديو غير صالح أو غير مدعوم حالياً.
          </div>
        )}
      </div>

      {/* Title & Metadata Descriptions */}
      <div className="space-y-3 border-b border-border/40 pb-5">
        <h1 className="text-2xl md:text-3xl font-black font-heading text-foreground leading-snug">
          {video.title}
        </h1>
        <p className="text-xs text-muted-foreground font-body">
          تاريخ النشر: {new Date(video.created_at).toLocaleDateString('ar-YE')}
        </p>
      </div>

      {video.description && (
        <div className="text-muted-foreground font-body text-base leading-relaxed whitespace-pre-wrap">
          {video.description}
        </div>
      )}
    </div>
  );
}
