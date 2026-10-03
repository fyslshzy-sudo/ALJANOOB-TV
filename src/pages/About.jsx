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
}
