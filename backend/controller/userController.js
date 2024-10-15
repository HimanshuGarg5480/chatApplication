import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.find({ $or: [{ username }, { email }] });

    if (user.length) {
      return res.status(400).send({
        error: "user with this username and email already exist",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginUser: ", error.message);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in logoutUser: ", err.message);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
};

const authCheck = async (req, res) => {
  return res.json({ authenticated: true, user: req.user });
};

const updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    const profilePic = req.file?.path;

    let userProfileImage;
    if (profilePic) {
      userProfileImage = await uploadOnCloudinary(profilePic);
      if (!userProfileImage) {
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }
    let updatedFields = userProfileImage
      ? { profilePic: userProfileImage?.url, bio }
      : { bio };
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: userProfileImage?.url, bio }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username,
        bio: updatedUser.bio,
        profilePic: updatedUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  getUserProfile,
  authCheck,
  updateProfile,
};
