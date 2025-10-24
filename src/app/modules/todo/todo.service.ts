import { ToDo } from './todo.model';
import { Subject } from '../subject/subject.model';
import { TToDo } from './todo.interface';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const createToDoToDB = async (payload: TToDo) => {
  const todo = await ToDo.create(payload);

  // Attach to subject
  const subject = await Subject.findByIdAndUpdate(
    payload.subject,
    { $push: { todos: todo._id } },
    { new: true },
  );

  if (!subject) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid subject reference');
  }

  return todo;
};

const getAllToDosFromDB = async () => {
  return await ToDo.find()
    .populate('subject', 'name _id')
    .sort({ createdAt: -1 });
};

const getToDoByIdFromDB = async (id: string) => {
  const todo = await ToDo.findById(id).populate('subject');
  if (!todo) throw new ApiError(StatusCodes.NOT_FOUND, 'ToDo not found');
  return todo;
};

const updateToDoToDB = async (id: string, payload: Partial<TToDo>) => {
  const updated = await ToDo.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) throw new ApiError(StatusCodes.NOT_FOUND, 'ToDo not found');
  return updated;
};

const deleteToDoFromDB = async (id: string) => {
  const deleted = await ToDo.findByIdAndDelete(id);
  if (!deleted) throw new ApiError(StatusCodes.NOT_FOUND, 'ToDo not found');

  // Optional: remove from Subject.todos array
  await Subject.findByIdAndUpdate(
    deleted.subject,
    { $pull: { todos: deleted._id } },
    { new: true },
  );

  return deleted;
};

export const ToDoService = {
  createToDoToDB,
  getAllToDosFromDB,
  getToDoByIdFromDB,
  updateToDoToDB,
  deleteToDoFromDB,
};
