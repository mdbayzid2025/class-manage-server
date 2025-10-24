import { Request, Response } from 'express';

import { calendarService } from './calendar.service';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

export const CalendarController = {
  createCalendarEvent: catchAsync(async (req: Request, res: Response) => {
    const result = await calendarService.createCalendar(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Calendar event created successfully',
      data: result,
    });
  }),

  getCalendarData: catchAsync(async (_req: Request, res: Response) => {
    const result = await calendarService.getCalendars();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Calendar events fetched successfully',
      data: result,
    });
  }),

  getScheduledEventsById: catchAsync(async (req: Request, res: Response) => {
    const result = await calendarService.getScheduledEventsById(req.params.id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Scheduled events fetched successfully',
      data: result,
    });
  }),

  getSingleCalendar: catchAsync(async (req: Request, res: Response) => {
    const result = await calendarService.getSingleCalendar(req.params.id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Calendar event fetched successfully',
      data: result,
    });
  }),

  updateCalendarEvent: catchAsync(async (req: Request, res: Response) => {
    const result = await calendarService.updateCalendar(req.params.id, req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Calendar event updated successfully',
      data: result,
    });
  }),

  deleteCalendarEvent: catchAsync(async (req: Request, res: Response) => {
    const result = await calendarService.deleteCalendar(req.params.id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Calendar event deleted successfully',
      data: result,
    });
  }),
};
