import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import noteService from "./note.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

class NoteController {
  // ✅ Create Note
  createNote = catchAsync(async (req: Request, res: Response) => {
    const noteData = {
      ...req.body,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
    };

    const note = await noteService.createNote(noteData, req.files as Express.Multer.File[]);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Note created successfully",
      data: note,
    });
  });

  // ✅ Get all Notes
  getAllNotes = catchAsync(async (req: Request, res: Response) => {
    const result = await noteService.getAllNotes(req.query);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Notes retrieved successfully",
      data: result?.data,
      pagination: result?.meta,
    });
  });

  // ✅ Get single Note by ID
  getNoteById = catchAsync(async (req: Request, res: Response) => {
    const note = await noteService.getNoteById(req.params.id);

    if (!note) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Note not found",
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Note retrieved successfully",
      data: note,
    });
  });

  // ✅ Update Note
  updateNote = catchAsync(async (req: Request, res: Response) => {
    const note = await noteService.updateNote(
      req.params.id,
      req.body,
      req.files as Express.Multer.File[]
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Note updated successfully",
      data: note,
    });
  });

  // ✅ Delete Note
  deleteNote = catchAsync(async (req: Request, res: Response) => {
    const note = await noteService.deleteNote(req.params.id);

    if (!note) {
      return sendResponse(res, {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Note not found",
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Note deleted successfully",
    });
  });
}

export default new NoteController();
