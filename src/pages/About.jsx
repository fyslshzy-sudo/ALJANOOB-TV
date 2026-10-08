import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-black font-heading text-foreground">من نحن</h1>
        <p className="text-sm text-muted-foreground">نبذة عن قناة الجنوب الفضائية ورسالتها الإعلامية</p>
      </div>
      <div className="bg-card border border-border p-6 rounded-2xl space-y-4 font-body text-foreground/90 leading-relaxed text-base">
        <p>
          قناة الجنوب الفضائية هي منصة إعلامية عربية مكرسة لتقديم تغطية شاملة ومستقلة لكافة الأحداث والبرامج الثقافية، السياسية، والاجتماعية التي تهم المواطن في الجنوب العربي.
        </p>
        <p>
          نسعى من خلال شاشتنا ومنصاتنا الرقمية إلى تقديم الإعلام الصادق والملتزم بالمهنية والمصداقية، ونقل نبض الشارع وصوته إلى العالم بكل أمانة ووضوح.
        </p>
      </div>
    </div>
  );
},

import React from "react";
import { Tv, Radio, Satellite, Award, Users, Globe } from "lucide-react";
export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white gold-underline inline-block"> </h1>
      </div>

      <div className="rounded-xl bg-card border border-border p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
            <Tv className="w-7 h-7 text-background" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-extrabold text-white"> </h2>
        </div>
        <p className="text-muted-foreground leading-loose">
            (AL JANOOB)             .
                           .
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Radio, title: " ", desc: "    " },
          { icon: Globe, title: " ", desc: "   " },
          { icon: Award, title: " ", desc: "  " },
        ].map((f) => (
          <div key={f.title} className="rounded-xl bg-card border border-border p-5 text-center">
            <f.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-white mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-[#1a1d26] border border-border p-6">
        <div className="flex items-center gap-2 mb-4 text-primary">
          <Satellite className="w-5 h-5" />
          <span className="font-bold"></span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: "Arabsat 5A", freq: "11.900 GHz" },
            { name: "Nilesat 201", freq: "11.938 GHz" },
            { name: "Hotbird 13E", freq: "11.662 GHz" },
          ].map((s) => (
            <div key={s.name} className="rounded-lg bg-background/50 border border-border p-4 text-center">
              <div className="font-bold text-white text-sm">{s.name}</div>
              <div className="text-primary font-mono text-sm mt-1">{s.freq}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
          }
