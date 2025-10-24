import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SemesterService } from './semester.service';
import { StatusCodes } from 'http-status-codes';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterService.createSemesterToDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Semester created successfully',
    data: result,
  });
});

const getAllSemesters = catchAsync(async (_req: Request, res: Response) => {
  const result = await SemesterService.getAllSemestersFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semesters retrieved successfully',
    data: result,
  });
});

const getSemesterById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterService.getSemesterByIdFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester retrieved successfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterService.updateSemesterToDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester updated successfully',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SemesterService.deleteSemesterFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester deleted successfully',
    data: result,
  });
});

export const SemesterController = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
};
