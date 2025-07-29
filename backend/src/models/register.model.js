import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
	rollNo: {
  type: String,  // ✅ This allows "IIT2022165" format
  required: true
},

	outDateAndTime:
	{
		type: Date,
		default: Date.now,
		required: true,
	},
	inDateAndTime:
	{
		type: Date,
		default: "",
	},
}, { timestamps: true });

registerSchema.methods.getOutDateTime = () => {
	const date = this.outDateAndTime.toLocaleDateString()
	const time = this.outDateAndTime.toLocaleTimeString()
	return { date, time }
}

registerSchema.methods.getInDateTime = () => {
	const date = this.inDateAndTime.toLocaleDateString()
	const time = this.inDateAndTime.toLocaleTimeString()
}

export const Register = mongoose.model("Register", registerSchema);