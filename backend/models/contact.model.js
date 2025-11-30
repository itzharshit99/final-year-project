import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "छात्र / Student",
        "अभिभावक / Parent",
        "शिक्षक / Teacher",
        "स्कूल प्रशासन / School Admin",
        "अन्य / Other",
      ],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    preferredLanguage: {
      type: String,
      enum: ["hindi", "english"],
      default: "hindi",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
