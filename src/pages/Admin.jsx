import React from 'react';

export default function Admin() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-black font-heading text-foreground">لوحة تحكم المشرفين</h1>
        <p className="text-sm text-muted-foreground">إدارة محتوى منصة قناة الجنوب الرقمية</p>
      </div>
      <div className="p-8 bg-card border border-border rounded-2xl text-center space-y-3 shadow-sm">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
        </div>
        <h3 className="text-lg font-heading font-bold text-foreground">إدارة المحتوى والمستندات</h3>
        <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">
          يمكنك إدارة الأخبار، الفيديوهات، وجدول البرامج مباشرة عبر لوحة تحكم منصة باص المربوطة بالتطبيق لإجراء التعديلات الفورية.
        </p>
      </div>
    </div>
  );
}
