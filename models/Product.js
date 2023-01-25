const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxLength: [100, "Cannot be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      maxLength: [1000, "Cannot be more than 1000 characters"],
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
      enum: {
        values: ["Office", "Kitchen", "Bedroom"],
        messsage: "{VALUE} is not applicable to this category",
      },
    },
    company: {
      type: String,
      required: [true, "Please provide a product company"],
      enum: {
        values: ["Ikea", "Liddy", "Marcos"],
        message: `{VALUE} is not supported`,
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 25,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

module.exports = mongoose.model("Product", ProductSchema);
