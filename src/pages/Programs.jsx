import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

export default function Programs() {
  // Fetch all TV programs categories/metadata from base44
  const { data: programsList, isLoading, error } = useQuery({
    queryKey: ['programsList'],
    queryFn: async () => {
      return await base44.items.getMany({
        collection: 'programs',
        sort: 'title'
      });
    }
  });

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
      <div className="border-b border-border pb-4 space-y-1">
        <h1 className="text-3xl font-black font-heading text-foreground">برامج القناة</h1>
        <p className="text-sm text-muted-foreground">اكتشف باقة برامجنا السياسية، الثقافية، والاجتماعية المتنوعة</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-60 bg-card rounded-xl border border-border"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">فشل في تحميل البرامج، يرجى المحاولة لاحقاً.</p>
        </div>
      ) : programsList?.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">لا توجد برامج مضافة حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programsList?.map((program) => (
            <div key={program.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all flex flex-col shadow-sm">
              {program.image && (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {program.title}
                  </h2>
                  {program.description && (
                    <p className="text-sm text-muted-foreground font-body line-clamp-3 leading-relaxed">
                      {program.description}
                    </p>
                  )}
                </div>
                <div className="border-t border-border/50 pt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-body">تقديم: {program.host || 'مذيع القناة'}</span>
                  <Link to={`/videos?program=${program.id}`} className="text-xs font-medium text-primary hover:underline font-body">
                    عرض الحلقات ←
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
},
  
import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import ProgramCard from "@/components/ProgramCard";
export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Program.list("-created_date", 50)
      .then((data) => { setPrograms(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white gold-underline inline-block"></h1>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <div key={i} className="h-80 rounded-xl bg-card animate-pulse" />)}
        </div>
      ) : programs.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p) => <ProgramCard key={p.id} program={p} />)}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm py-12 text-center">   .     .</p>
      )}
    </div>
  );
              }
