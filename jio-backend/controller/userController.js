const UserModel = require("../model/UserModel");
const { tmdbApi, TMDB_ENDPOINT } = require("../services/tmdb");
const axios = require("axios");

/*********************users********************/

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, name, email, createdAt, wishlist, isPremium } =
      await UserModel.findById(userId);
    res.status(200).json({
      user: {
        _id: _id,
        name: name,
        email: email,
        createdAt: createdAt,
        wishlist: wishlist,
        isPremium: isPremium,
      },
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Nothing as such",
      status: "failure",
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, media_type } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    let postItem;
    if (media_type == "tv") {
      postItem = (await tmdbApi.get(TMDB_ENDPOINT.fetchTvShowDetails(id))).data;
    } else {
      postItem = (
        await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=6d32249cd6759d1009f163e7b2a84742`
        )
      ).belongs_to_collection;
    }
    const wishlistItem = {
      poster_path: postItem.poster_path,
      name: postItem.title,
      id: postItem.id,
      media_type: media_type,
    };

    user.wishlist.push(wishlistItem);
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { wishlist: wishlistItem } },
      { new: true, upsert: true } // options to return the updated document and create if it doesn't exist
    );

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({
      message: error.message,
      status: "failure",
    });
  }
};

const getWishlist = async (req, res) => {
  console.log("user id from getwishlist");
  try {
    const userId = req.params.userId;
    console.log(userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: 'Invalid userId format',
        status: 'failure',
      });
    }
    const user = await UserModel.findById(userId);
    console.log("user in db", user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const wishlistItems = user.wishlist;
    if (!user.wishlist || user.wishlist.length === 0) {
      return res.status(200).json({ message: "Wishlist is empty" });
    }

    res.status(200).json({
      status: "success",
      wishlistItems,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({
      message: error.message,
      status: "failure",
    });
  }
};

module.exports = {
  getCurrentUser,
  addToWishlist,
  getWishlist,
};
