
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { JwtPayload } from 'jsonwebtoken';

// ✅ Create user
const createUserToDB = async (payload: IUser): Promise<IUser> => {
  const existingUser = await User.isExistUserByEmail(payload.email);
  if (existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User with this email already exists!');
  }

  const result = await User.create(payload);
  return result;
};

// ✅ Get all users
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const usersQueryBuilder = new QueryBuilder(User.find(), query)
    .search(['name', 'idNo', 'email', 'bloodGroup', 'contact'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const users = await usersQueryBuilder.modelQuery;
  const meta = await usersQueryBuilder.getPaginationInfo();

  return { data: users, meta };
};

// ✅ Get single user by ID
const getUserByIdFromDB = async (id: string) => {
  const user = await User.isExistUserById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  const result = await User.findById(id).select('-password');
  return result;
};

// ✅ Get profile
const getProfileFromDB = async (user: any) => {
  const result = await User.findOne({ _id: user.id }).select('-password');
  return result;
};

// ✅ Update user info
const updateUserToDB = async (user: JwtPayload, payload: IUser, files:any) => {
  const photo = files?.photo?.[0];
  if (photo) {
    payload.photo = `/uploads/image/${photo.filename}`;
  }
  
  const existingUser = await User.isExistUserById(user.id);
  if (!existingUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  const result = await User.findByIdAndUpdate(user.id, payload, {
    new: true,
    runValidators: true,
  }).select('-password');
  return result;
};

// ✅ Update profile
const updateProfileToDB = async (payload: Partial<IUser>, user: any) => {
  const existingUser = await User.isExistUserById(user.id);
  if (!existingUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Profile not found!');
  }

  const result = await User.findByIdAndUpdate(user.id, payload, {
    new: true,
    runValidators: true,
  }).select('-password');
  return result;
};

// ✅ Delete user
const deleteUserFromDB = async (id: string) => {
  const existingUser = await User.isExistUserById(id);
  if (!existingUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUserToDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  getProfileFromDB,
  updateUserToDB,
  updateProfileToDB,
  deleteUserFromDB,
};
