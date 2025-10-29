import ApiError from '../../../errors/ApiError';
import { ICalendarEvent } from './calendar.interface';
import { Calendar } from './calendar.model';

import { StatusCodes } from 'http-status-codes';

class CalendarService {
  async createCalendar(data: ICalendarEvent) {
    try {
      const calendar = new Calendar({
        ...data,
        type: data.type || data.title,
      });
      await calendar.save();
      return calendar;
    } catch (error: any) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  async getCalendars() {
    try {
      return await Calendar.find();
    } catch (error: any) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  async getScheduledEventsById(id: string) {
    try {

      
      const result = await Calendar.findById(id)
        .populate({
          path: 'item',
          populate: {
            path: 'subject',
            select: 'name subjectCode teacher',
          },
        })
        .lean();
        
      return result;
    } catch (error: any) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  async getSingleCalendar(id: string) {
    const calendar = await Calendar.findById(id);
    if (!calendar) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Calendar event not found');
    }
    return calendar;
  }

  async updateCalendar(id: string, data: Partial<ICalendarEvent>) {
    const calendar = await Calendar.findByIdAndUpdate(id, data, { new: true });
    if (!calendar) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Calendar event not found');
    }
    return calendar;
  }

  async deleteCalendar(id: string) {
    const calendar = await Calendar.findByIdAndDelete(id);
    if (!calendar) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Calendar event not found');
    }
    return calendar;
  }
}

export const calendarService = new CalendarService();
