import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { TeacherService } from './teacher.service';

const getAllTeachers = catchAsync(async (_req: Request, res: Response) => {
  const result = await TeacherService.getAllTeachersFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teachers retrieved successfully',
    data: result,
  });
});

const getTeacherById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherService.getTeacherByIdFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teacher retrieved successfully',
    data: result,
  });
});

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherService.createTeacherToDB(req.body, req.file);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Teacher created successfully',
    data: result,
  });
});

const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherService.updateTeacherToDB(id, req.body, req.file);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teacher updated successfully',
    data: result,
  });
});

const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeacherService.deleteTeacherFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teacher deleted successfully',
    data: result,
  });
});

export const TeacherController = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
