import React from 'react';
import { useParams } from 'react-router-dom';

export default function Embed() {
  const { type, id } = useParams();

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="w-full h-full relative flex items-center justify-center text-white font-body text-sm text-center p-4">
        <div className="space-y-2">
          <p className="font-heading font-bold text-primary text-base">مشغل قناة الجنوب الرقمي</p>
          <p className="text-xs text-zinc-400">جاري تحميل البث المتوافق لـ {type || 'المحتوى'}...</p>
        </div>
      </div>
    </div>
  );
}
