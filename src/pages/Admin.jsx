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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Tv, LogOut, Globe, Loader2 } from "lucide-react";
import NewsManager from "@/components/admin/NewsManager";
import VideoManager from "@/components/admin/VideoManager";
import ProgramManager from "@/components/admin/ProgramManager";
import ScheduleManager from "@/components/admin/ScheduleManager";
import LiveManager from "@/components/admin/LiveManager";
import BreakingManager from "@/components/admin/BreakingManager";
import LiveTickerManager from "@/components/admin/LiveTickerManager";

const TABS = [
  { id: "live", label: " " },
  { id: "breaking", label: " " },
  { id: "ticker", label: " " },
  { id: "news", label: "" },
  { id: "videos", label: "" },
  { id: "programs", label: "" },
  { id: "schedule", label: "" },
];

export default function Admin() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState("live");
  const navigate = useNavigate();

  useEffect(() => {
    const authed = localStorage.getItem("janoob_editor_auth") === "true";
    if (!authed) { navigate("/login?returnTo=/admin"); return; }
    setChecking(false);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("janoob_editor_auth");
    navigate("/");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-[#14161a] border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button onClick={logout} className="flex items-center gap-2 text-red-500 text-sm font-bold hover:opacity-80">
            <LogOut className="w-4 h-4" /> 
          </button>
          <Link to="/" className="flex items-center gap-2 text-muted-foreground text-sm font-bold hover:text-white">
            <Globe className="w-4 h-4" /> 
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm"> /  </span>
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Tv className="w-5 h-5 text-background" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Sub nav */}
      <div className="bg-[#14161a] border-b border-border overflow-x-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1 min-w-max">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {tab === "live" && <LiveManager />}
        {tab === "breaking" && <BreakingManager />}
        {tab === "ticker" && <LiveTickerManager />}
        {tab === "news" && <NewsManager />}
        {tab === "videos" && <VideoManager />}
        {tab === "programs" && <ProgramManager />}
        {tab === "schedule" && <ScheduleManager />}
      </div>
    </div>
  );
  }
