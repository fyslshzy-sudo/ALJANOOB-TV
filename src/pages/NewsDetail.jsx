import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function NewsDetail() {
  const { id } = useParams();

  // Fetch single news record by record ID
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['newsArticle', id],
    queryFn: async () => {
      return await base44.items.getOne({
        collection: 'news',
        id: id
      });
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-6 animate-pulse">
        <div className="h-6 w-1/4 bg-muted rounded"></div>
        <div className="h-10 w-full bg-muted rounded"></div>
        <div className="aspect-video w-full bg-muted rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-4 w-5/6 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center max-w-md">
        <div className="bg-card border border-border p-8 rounded-xl space-y-4">
          <p className="text-muted-foreground">الخبر المطلوب غير موجود أو تم حذفه.</p>
          <Link to="/news" className="text-sm text-primary hover:underline block">العودة لمركز الأخبار ←</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <Link to="/news" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
        ← العودة لمركز الأخبار
      </Link>

      <div className="space-y-3">
        <h1 className="text-2xl md:text-4xl font-black font-heading text-foreground leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
          <span>الناشر: غرفة الأخبار</span>
          <span>•</span>
          <span>التاريخ: {new Date(article.created_at).toLocaleDateString('ar-YE')}</span>
        </div>
      </div>

      {article.image && (
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-lg">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Article Content Box */}
      <div className="text-foreground font-body text-base md:text-lg leading-relaxed whitespace-pre-wrap space-y-4 pt-4 border-t border-border/40">
        {article.content}
      </div>
    </article>
  );
},

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { formatDate } from "@/components/NewsCard";
import { ArrowRight, Radio } from "lucide-react";

export default function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.News.get(id)
      .then((data) => { setItem(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-20"><div className="h-80 rounded-xl bg-card animate-pulse" /></div>;
  if (!item) return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-muted-foreground mb-4">  .</p>
      <Link to="/news" className="text-primary font-bold"> </Link>
    </div>
  );

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Link to="/news" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowRight className="w-4 h-4" />  
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        {item.is_breaking && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-600 text-white text-xs font-extrabold">
            <Radio className="w-3.5 h-3.5 live-pulse" /> 
          </span>
        )}
        {item.category && <span className="px-3 py-1.5 rounded border border-primary text-primary text-xs font-bold">{item.category}</span>}
        <span className="text-xs text-muted-foreground">{formatDate(item.publish_date || item.created_date)}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{item.title}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">{item.summary}</p>

      {item.image_url && (
        <img src={item.image_url} alt={item.title} className="w-full rounded-xl object-cover max-h-[460px]" />
      )}

      {item.content && (
        <div className="prose prose-invert max-w-none">
          <p className="text-white/85 leading-loose whitespace-pre-line text-lg">{item.content}</p>
        </div>
      )}
    </article>
  );
          }
