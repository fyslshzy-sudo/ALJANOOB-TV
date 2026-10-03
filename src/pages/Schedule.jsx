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
}
