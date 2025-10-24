import { Subject } from './subject.model';
import { Semester } from '../semester/semester.model';
import { TSubject } from './subject.interface';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { Teacher } from '../teacher/teacher.model';

const createSubjectToDB = async (payload: TSubject) => {
  // 1️⃣ Create subject
  const subject = await Subject.create(payload);

  // 2️⃣ Update semester subjects array
  await Semester.findByIdAndUpdate(
    payload.semester,
    { $push: { subjects: subject._id } },
    { new: true },
  );

  // 3️⃣ Update teacher subjects array
  await Teacher.findByIdAndUpdate(
    payload.teacher,
    { $push: { subjects: subject._id } },
    { new: true },
  );

  return subject;
};

const getAllSubjectsFromDB = async () => {
  return await Subject.find()
    .populate('semester', 'title status')
    .populate('teacher')
    .populate('todos', 'title status startDate endDate priority')
    .populate('events', 'eventTitle date time eventType location description')
    .sort({ createdAt: -1 });
};

const getSubjectByIdFromDB = async (id: string) => {
  const subject = await Subject.findById(id)
    .populate('semester', 'title')
    .populate('teacher')
    .populate({ path: 'notes', options: { sort: { createdAt: -1 } } })
    .populate({ path: 'todos', options: { sort: { createdAt: -1 } } })
    .populate({
      path: 'assignments',
      select: 'title submissionDate time detailedInstructions createdAt',
      options: { sort: { createdAt: -1 } },
    })
    .populate({
      path: 'events',
      select: 'eventTitle date time eventType location description',
      options: { sort: { createdAt: -1 } },
    });

  if (!subject) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subject not found');
  }

  return subject;
};

const updateSubjectToDB = async (id: string, payload: Partial<TSubject>) => {
  const updatedSubject = await Subject.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedSubject) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subject not found');
  }

  return updatedSubject;
};

const deleteSubjectFromDB = async (id: string) => {
  const deleted = await Subject.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subject not found');
  }
  return deleted;
};

export const SubjectService = {
  createSubjectToDB,
  getAllSubjectsFromDB,
  getSubjectByIdFromDB,
  updateSubjectToDB,
  deleteSubjectFromDB,
};
