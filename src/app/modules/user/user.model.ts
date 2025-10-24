import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import config from '../../../config';
import { BLOOD_GROUP, USER_ROLES, USER_STATUS } from './user.constant';
import { IUser, UserModel } from './user.interface';

const addressSchema = new Schema(
  {
    area: { type: String, trim: true },
    thana: { type: String, trim: true },
    district: { type: String, trim: true },
  },
  { _id: false }
);

const emergencyContactSchema = new Schema(
  {
    name: { type: String, trim: true },
    relation: { type: String, trim: true },
    mobile: { type: String, trim: true },
    address: { type: String, trim: true },
  },
  { _id: false }
);

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, trim: true, required: true },
    idNo: { type: String, trim: true },
    contact: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    profession: { type: String, trim: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    address: { type: addressSchema, default: {} },
    district: { type: String, trim: true },
    bloodGroup: { type: String, enum: Object.values(BLOOD_GROUP) },
    emergencyContact: { type: emergencyContactSchema, default: {} },
    photo: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    isVerified: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    authentication: {
      type: {
        isResetPassword: {
          type: Boolean,
          default: false,
        },
        oneTimeCode: {
          type: Number,
          default: null,
        },
        expireAt: {
          type: Date,
          default: null,
        },
      },
      select: 0,
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ===============================
   🔹 Static Methods
================================*/
userSchema.statics.isExistUserById = async function (id: string) {
  const isExist = await this.findById(id);
  return isExist;
};

userSchema.statics.isExistUserByEmail = async function (email: string) {
  const isExist = await this.findOne({ email });
  return isExist;
};

userSchema.statics.isMatchPassword = async function (
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
};

/* ===============================
   🔹 Pre-save Middleware
================================*/
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  // Check if email already exists
  const isExist = await User.findOne({ email: user.email });
  if (isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exists!');
  }

  // Hash password before saving
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
