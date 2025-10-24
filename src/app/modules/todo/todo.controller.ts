import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ToDoService } from './todo.service';
import { StatusCodes } from 'http-status-codes';

const createToDo = catchAsync(async (req: Request, res: Response) => {
  const result = await ToDoService.createToDoToDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'ToDo created successfully',
    data: result,
  });
});

const getAllToDos = catchAsync(async (_req: Request, res: Response) => {
  const result = await ToDoService.getAllToDosFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'ToDos retrieved successfully',
    data: result,
  });
});

const getToDoById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ToDoService.getToDoByIdFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'ToDo retrieved successfully',
    data: result,
  });
});

const updateToDo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ToDoService.updateToDoToDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'ToDo updated successfully',
    data: result,
  });
});

const deleteToDo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ToDoService.deleteToDoFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'ToDo deleted successfully',
    data: result,
  });
});

export const ToDoController = {
  createToDo,
  getAllToDos,
  getToDoById,
  updateToDo,
  deleteToDo,
};
