import Link from "next/link";
import React, { Suspense } from "react";
import BannerSection, { BannerSectionFallback } from "./BannerSection";
import CategorySection from "./CategorySection";

const ListingSection = ({ bannerFetcher, list }) => {
  return (
    <section>
      {/* Quick links----Links for all the category sections */}
      <div className="p-6 flex gap-4 mt-[64px] text-nowrap overflow-scroll scrollbar-hide">
        {list.map((item) => (
          <Link
            key={item.href}
            className="px-3 py-2 rounded-full bg-white/15 text-sm "
            href={`#${item.href}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {/* Banner/Hero Section  */}
      <div>
        <Suspense fallback={<BannerSectionFallback />}>
          <BannerSection fetcher={bannerFetcher} />
        </Suspense>
      </div>
      {/* Category Section */}
      {list.map((item) => (
        <CategorySection
          key={item.label}
          id={item.href}
          title={item.label}
          fetcher={item.fetcher}
        />
      ))}
    </section>
  );
};

export default ListingSection;
