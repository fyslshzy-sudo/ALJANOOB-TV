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
}
