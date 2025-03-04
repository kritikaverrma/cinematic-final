"use client";
import CategoryList, {
  CategoryListFallback,
} from "../../components/sections/CategoryList";
import { buttonVariants } from "../../components/ui/button";
import { FolderLockIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const WatchListPage = (props) => {
  const userData = useSelector((state) => state.user);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData.isLoggedIn) {
      const fetchWishlist = async () => {
        try {
          const res = await axios.get(
            `https://4yffsl-4001.csb.app/api/user/wishlist/${userData.user.userId}`,
            { withCredentials: true }
          );
          setWishlistItems(res.data.wishlistItems);
        } catch (err) {
          setError("Failed to fetch wishlist");
        } finally {
          setLoading(false);
        }
      };
      fetchWishlist();
    }
  }, [userData.isLoggedIn, userData.user.userId]);

  if (!userData.isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] w-full gap-4">
        <FolderLockIcon className="w-32 h-32 text-slate-400" strokeWidth={1.2} />
        <p className="text-base text-slate-400">Login to see your watchlist</p>
        <Link href={"/login"} className={cn(buttonVariants(), "rounded-full px-6 mt-4")}>
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-[80px] p-4">
      <h1 className="text-2xl font-medium mb-6">Watchlist</h1>
      {loading ? (
        <CategoryListFallback />
      ) : error ? (
        <p>{error}</p>
      ) : !wishlistItems || wishlistItems.length === 0? 
            (<div className="flex flex-col items-center justify-center w-full h-[80vh] py-12">
              <InboxIcon
                className="w-32 h-32 text-slate-400 mb-10"
                strokeWidth={1.2}
              />
              <p className="text-lg text-gray-500">No items found.</p>
            </div>
            ):
            (
              <ul
      className={cn(
        "flex gap-4 w-full overflow-scroll scrollbar-hide",
        className
      )}
    >
      {wishlistItems?.map((item, index) => (
        <Link key={index} href={getWatchUrl(item.id, item.media_type)}>
          <Image
            src={media(item?.poster_path)}
            alt=""
            width={200}
            height={300}
            className="min-w-[200px] h-[300px] rounded-lg object-cover"
            quality={30}
          />
        </Link>
      ))}
    </ul>
            )
      }
    </div>
  );
};

export default WatchListPage;
