import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

export default function News() {
  // Fetch all news items from base44 collection
  const { data: newsItems, isLoading, error } = useQuery({
    queryKey: ['newsList'],
    queryFn: async () => {
      return await base44.items.getMany({
        collection: 'news',
        sort: '-created_at'
      });
    }
  });

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
      <div className="border-b border-border pb-4 space-y-1">
        <h1 className="text-3xl font-black font-heading text-foreground">مركز الأخبار والتقارير</h1>
        <p className="text-sm text-muted-foreground">تغطية شاملة ومستمرة لآخر المستجدات والأحداث على الساحة</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-card rounded-xl border border-border"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">فشل في تحميل الأخبار، يرجى المحاولة لاحقاً.</p>
        </div>
      ) : newsItems?.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">لا توجد أخبار منشورة حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems?.map((item) => (
            <Link to={`/news/${item.id}`} key={item.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all flex flex-col shadow-sm">
              {item.image && (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h2>
                  {item.summary && (
                    <p className="text-sm text-muted-foreground font-body line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
                  <span className="font-body">قناة الجنوب</span>
                  <span className="font-body">
                    {new Date(item.created_at).toLocaleDateString('ar-YE')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}'
  
import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import NewsCard from "@/components/NewsCard";
export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    base44.entities.News.list("-publish_date", 50)
      .then((data) => { setNews(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["", ...Array.from(new Set(news.map((n) => n.category).filter(Boolean)))];
  const filtered = category === "" ? news : news.filter((n) => n.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white gold-underline inline-block"></h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
              category === c ? "bg-primary text-background" : "bg-card border border-border text-muted-foreground hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <div key={i} className="h-72 rounded-xl bg-card animate-pulse" />)}
        </div>
      ) : filtered.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((n) => <NewsCard key={n.id} news={n} />)}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm py-12 text-center">      .</p>
      )}
    </div>
  );
}
