import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			minLength: 6,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
		}
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;