import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link, useSearchParams } from 'react-router-dom';

export default function Videos() {
  const [searchParams] = useSearchParams();
  const programId = searchParams.get('program');

  // Fetch videos filtered by program ID if exists
  const { data: videoItems, isLoading, error } = useQuery({
    queryKey: ['videosList', programId],
    queryFn: async () => {
      const params = {
        collection: 'videos',
        sort: '-created_at'
      };
      if (programId) {
        params.filter = { program: programId };
      }
      return await base44.items.getMany(params);
    }
  });

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
      <div className="border-b border-border pb-4 space-y-1">
        <h1 className="text-3xl font-black font-heading text-foreground">مكتبة الفيديو</h1>
        <p className="text-sm text-muted-foreground">شاهد الحلقات الكاملة والتقارير المصورة بأعلى جودة</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-card rounded-xl border border-border"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">فشل في تحميل الفيديوهات، يرجى المحاولة لاحقاً.</p>
        </div>
      ) : videoItems?.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">لا توجد فيديوهات منشورة في هذا القسم حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoItems?.map((video) => (
            <Link to={`/videos/${video.id}`} key={video.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all flex flex-col shadow-sm">
              <div className="aspect-video w-full overflow-hidden bg-muted relative">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-primary">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                    <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <h2 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h2>
                <span className="text-xs text-muted-foreground font-body block pt-2 border-t border-border/50">
                  {new Date(video.created_at).toLocaleDateString('ar-YE')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
