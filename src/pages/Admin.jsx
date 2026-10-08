
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
