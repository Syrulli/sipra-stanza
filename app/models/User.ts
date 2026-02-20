import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, select: false },
    image: { type: String },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
  },
  {
    timestamps: true,
    collection: 'tbl_users', 
  }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
