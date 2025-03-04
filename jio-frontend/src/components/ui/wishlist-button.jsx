"use client";
import axios from "axios";
import React from "react";
import { Button } from "./button";
import { PlusIcon } from "lucide-react";
import { api, ENDPOINT } from "../../lib/api";
import { toast } from "./use-toast";
import { useSelector } from "react-redux";

const WishlistButton = ({ wishlist }) => {
  const user = useSelector((state) => state.user);
  console.log(user);
  if (!user.isLoggedIn) return <></>;
  const addToWishList = async () => {
    console.log("done");
    try {
      const res = await axios.post(
        "https://4yffsl-4001.csb.app/api/user/wishlist",
        wishlist
      );
      console.log(res);
      if (res.data) {
        toast({
          title: "Added to Wishlist!",
        });
      }
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <>
      <button className="sm:ml-auto" onClick={addToWishList}>
        <PlusIcon className="w-4 h-4 mr-2" />
        Add to Watchlist
      </button>
    </>
  );
};

export default WishlistButton;
