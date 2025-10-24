import { Model } from 'mongoose';
import { BLOOD_GROUP, USER_ROLES, USER_STATUS } from './user.constant';

export interface IAddress {
  area?: string;
  thana?: string;
  district?: string;
}

export interface IEmergencyContact {
  name?: string;
  relation?: string;
  mobile?: string;
  address?: string;
}

export interface IUser {
  name: string;
  idNo?: string;
  contact?: string;
  email: string;
  password: string;
  profession?: string;
  role: USER_ROLES;
  address?: IAddress;
  district?: string;
  bloodGroup?: BLOOD_GROUP;
  emergencyContact?: IEmergencyContact;
  photo?: string;
  coverImage?: string;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
  isVerified?: boolean;
  isDeleted?: boolean;
  status: USER_STATUS;
}

// 🔹 Extending static methods
export interface UserModel extends Model<IUser> {
  isExistUserById(id: string): Promise<IUser | null>;
  isExistUserByEmail(email: string): Promise<IUser | null>;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
}
