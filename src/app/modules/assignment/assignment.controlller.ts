import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AssignmentService } from './assignment.service';
import { StatusCodes } from 'http-status-codes';

const createAssignment = catchAsync(async (req: Request, res: Response) => {
  const result = await AssignmentService.createAssignmentToDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Assignment created successfully',
    data: result,
  });
});

const getAllAssignments = catchAsync(async (_req: Request, res: Response) => {
  const result = await AssignmentService.getAllAssignmentsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Assignments retrieved successfully',
    data: result,
  });
});

const getAssignmentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AssignmentService.getAssignmentByIdFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Assignment retrieved successfully',
    data: result,
  });
});

const updateAssignment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AssignmentService.updateAssignmentToDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Assignment updated successfully',
    data: result,
  });
});

const deleteAssignment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AssignmentService.deleteAssignmentFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Assignment deleted successfully',
    data: result,
  });
});

export const AssignmentController = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
