import { Teacher } from './teacher.model';
import { TTeacher } from './teacher.interface';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const getAllTeachersFromDB = async () => {
  return await Teacher.find()
    .populate('subjects', 'name subjectCode semester')
    .sort({ createdAt: -1 });
};

const getTeacherByIdFromDB = async (id: string) => {
  const teacher = await Teacher.findById(id).populate('subjects');
  if (!teacher) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Teacher not found');
  }
  return teacher;
};

const createTeacherToDB = async (payload: TTeacher, file?: Express.Multer.File) => {
  if (file) {
    const folder = file.destination.split('public')[1];
    payload.photo = `${process.env.BASE_URL}${folder}/${file.filename}`;
  }

  const teacher = await Teacher.create(payload);
  return teacher;
};

const updateTeacherToDB = async (id: string, payload: Partial<TTeacher>, file?: Express.Multer.File) => {
  if (file) {
    const folder = file.destination.split('public')[1];
    payload.photo = `${process.env.BASE_URL}${folder}/${file.filename}`;
  }

  const updatedTeacher = await Teacher.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedTeacher) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Teacher not found');
  }

  return updatedTeacher;
};

const deleteTeacherFromDB = async (id: string) => {
  const deleted = await Teacher.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Teacher not found');
  }
  return deleted;
};

export const TeacherService = {
  getAllTeachersFromDB,
  getTeacherByIdFromDB,
  createTeacherToDB,
  updateTeacherToDB,
  deleteTeacherFromDB,
};
