import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

export default function Home() {
  // Fetch latest news from base44
  const { data: latestNews, isLoading: newsLoading } = useQuery({
    queryKey: ['latestNews'],
    queryFn: async () => {
      try {
        return await base44.items.getMany({
          collection: 'news',
          limit: 3,
          sort: '-created_at'
        });
      } catch (e) {
        return [];
      }
    }
  });

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner Section */}
      <section className="relative h-[65vh] bg-gradient-to-r from-card to-background flex items-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 space-y-6 max-w-6xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-signal-red live-pulse"></span>
            قناة الجنوب الفضائية
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-foreground tracking-tight leading-none">
            صوت الجنوب العربي <br />
            <span className="text-primary gold-underline">ونبض وطنه الدائم</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-body leading-relaxed">
            منصة البث الرقمي الرسمية لقناة الجنوب الفضائية. تابع برامجنا الثقافية، السياسية، ومكتبة الفيديو المتكاملة بأعلى جودة.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/live" className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-95 transition-all shadow-lg shadow-primary/10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4.263 15.918a1 1 0 01-1.385-.302L.373 11.455a1 1 0 010-1.077l2.505-4.16a1 1 0 111.716 1.033l-2.193 3.64 2.193 3.64a1 1 0 01-.331 1.387zM15.737 15.918a1 1 0 001.385-.302l2.505-4.161a1 1 0 000-1.077l-2.505-4.16a1 1 0 10-1.716 1.033l2.193 3.64-2.193 3.64a1 1 0 00.331 1.387zM7.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
              شاهد البث المباشر
            </Link>
            <Link to="/programs" className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors border border-border">
              تصفح برامجنا
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Highlights Component */}
      <section className="container mx-auto px-4 max-w-6xl space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
            آخر الأخبار والتقارير
          </h2>
          <Link to="/news" className="text-sm font-medium text-primary hover:underline">
            عرض كل الأخبار ←
          </Link>
        </div>

        {newsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-card rounded-xl border border-border"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews?.map((item) => (
              <Link to={`/news/${item.id}`} key={item.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all flex flex-col">
                {item.image && (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-body">
                    {new Date(item.created_at).toLocaleDateString('ar-YE')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
