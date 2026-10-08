import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function Schedule() {
  // Fetch full programming schedule rows from base44 collection
  const { data: scheduleItems, isLoading } = useQuery({
    queryKey: ['scheduleList'],
    queryFn: async () => {
      try {
        return await base44.items.getMany({
          collection: 'schedule',
          sort: 'time_slot'
        });
      } catch (e) {
        return [];
      }
    }
  });

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      <div className="border-b border-border pb-4 space-y-1">
        <h1 className="text-3xl font-black font-heading text-foreground">جدول البرامج</h1>
        <p className="text-sm text-muted-foreground">تابع مواعيد البث اليومي وأوقات إعادة برامجك المفضلة على شاشة القناة</p>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-card rounded-xl border border-border"></div>
          ))}
        </div>
      ) : !scheduleItems || scheduleItems.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">لم يتم تحديث جدول البرامج لليوم بعد.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm divide-y divide-border/60">
          {scheduleItems.map((item) => (
            <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary font-heading font-bold text-sm tracking-wide min-w-[75px] text-center">
                  {item.time_slot}
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-foreground text-base md:text-lg">{item.program_title}</h3>
                  <p className="text-xs text-muted-foreground font-body">{item.type || 'بث مباشر'}</p>
                </div>
              </div>
              {item.host && (
                <div className="text-sm text-muted-foreground font-body sm:text-left">
                  تقديم: <span className="text-foreground/80 font-medium">{item.host}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
},
import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Clock } from "lucide-react";

const DAYS = ["", "", "", "", "", "", ""];

export default function Schedule() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Schedule.list("-created_date", 100)
      .then((data) => { setItems(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white gold-underline inline-block"> </h1>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-32 rounded-xl bg-card animate-pulse" />)}</div>
      ) : items.length ? (
        <div className="space-y-6">
          {DAYS.map((day) => {
            const dayItems = items.filter((s) => s.day === day).sort((a, b) => (a.start_time || "").localeCompare(b.start_time || ""));
            if (!dayItems.length) return null;
            return (
              <div key={day}>
                <h2 className="text-xl font-extrabold text-primary mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full" /> {day}
                </h2>
                <div className="space-y-2">
                  {dayItems.map((s) => (
                    <div key={s.id} className="flex items-center gap-4 rounded-lg bg-card border border-border p-4 hover:border-primary/40 transition-colors">
                      <div className="flex items-center gap-2 text-primary font-mono text-sm shrink-0 w-32">
                        <Clock className="w-4 h-4" />
                        {s.start_time}{s.end_time ? ` - ${s.end_time}` : ""}
                      </div>
                      <div>
                        <div className="font-bold text-white">{s.program_title}</div>
                        {s.description && <div className="text-sm text-muted-foreground">{s.description}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm py-12 text-center">    .     .</p>
      )}
    </div>
  );
      }
