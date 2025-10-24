import { Semester } from './semester.model';
import { TSemester } from './semester.interface';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const createSemesterToDB = async (payload: TSemester) => {
  const result = await Semester.create(payload);
  return result;
};

const getAllSemestersFromDB = async () => {
  const result = await Semester.find({ status: 'Active' })
    .populate({
      path: 'subjects',
      populate: { path: 'teacher', model: 'Teacher' },
    })
    .sort({ createdAt: -1 });
  return result;
};

const getSemesterByIdFromDB = async (id: string) => {
  const result = await Semester.findById(id);
  if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'Semester not found');
  return result;
};

const updateSemesterToDB = async (id: string, payload: Partial<TSemester>) => {
  const result = await Semester.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'Semester not found');
  return result;
};

const deleteSemesterFromDB = async (id: string) => {
  const result = await Semester.findByIdAndDelete(id);
  if (!result) throw new ApiError(StatusCodes.NOT_FOUND, 'Semester not found');
  return result;
};

export const SemesterService = {
  createSemesterToDB,
  getAllSemestersFromDB,
  getSemesterByIdFromDB,
  updateSemesterToDB,
  deleteSemesterFromDB,
};
