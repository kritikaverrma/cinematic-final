import { buttonVariants } from "../../../components/ui/button";
import ShareButton from "../../../components/ui/share-button";
import WishlistButton from "../../../components/ui/wishlist-button.jsx";
import { api, ENDPOINT } from "../../../lib/api";
import { FilmIcon, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import axios from "axios";

const page = async ({ searchParams: { id } }) => {
  const res = await api.get(ENDPOINT.getMovieDetails(id));
  const details = res.data.belongs_to_collection;
  console.log("details", details);

  //const { id, media_type } = req.body;
  return (
    <div className="mt-[80px]">
      {details ? (
        <>
          <iframe
            title={details?.id}
            src={`https://www.youtube-nocookie.com/embed/${details?.id}`}
            className="w-full aspect-video lg:h-[78vh]"
          />
          <div className="flex flex-wrap gap-4 px-4 lg:px-10 py-8 items-center">
            <h1 className="text-2xl font-bold">{details.name}</h1>
            <WishlistButton
              wishlist={{
                id: id,
                poster_path: details.poster_path,
                name: details.name,
                media_type: "movie",
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
