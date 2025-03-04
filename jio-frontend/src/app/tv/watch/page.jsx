import { buttonVariants } from "@/components/ui/button";
import ShareButton from "@/components/ui/share-button";
import WishlistButton from "@/components/ui/wishlist-button";
import { api, ENDPOINT } from "@/lib/api";
import { FilmIcon } from "lucide-react";
import Link from "next/link";
import React from "react";


const page = async ({ searchParams: { id } }) => {
  const details = (await api.get(ENDPOINT.getTvShowsDetails(id))).data.data
    .results?.[0];
  return (
    <div className="mt-[80px]">
      {details ? (
        <>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${details?.key}`}
            className="w-full aspect-video lg:h-[78vh]"
          />
          <div className="flex flex-wrap gap-4 px-4 lg:px-10 py-8 items-center">
            <h1 className="text-2xl font-bold">{details?.name}</h1>
            <WishlistButton
              wishlist={{
                id: details.id,
                poster_path: details.poster_path,
                name: details.name,
                media_type: details.media_type || "tv",
              }}
            />
            <ShareButton />
          </div>
        </>
      ) : (
        <div className="w-full h-[60vh] flex flex-col gap-4 items-center justify-center text-slate-400">
          <FilmIcon className="w-[100px] h-[100px]" />
          <p>Uh Oh! Video is unavailable.</p>
          <Link href={"/"} className={buttonVariants()}>
            Take me Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;