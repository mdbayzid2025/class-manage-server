import { Event } from './event.model';
import { Subject } from '../subject/subject.model';
import { TEvent } from './event.interface';

import { NotificationService } from '../notification/notification.service';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { calendarService } from '../calendar/calendar.service';
import { ICalendarEvent } from '../calendar/calendar.interface';

const createEventToDB = async (payload: TEvent) => {
  const event = await Event.create(payload);

  // Attach event to subject
   await Subject.findByIdAndUpdate(
    payload.subject,
    { $push: { events: event._id } },
    { new: true },
  ).select('name');

  // Create calendar entry
  const calendarData : ICalendarEvent = {
    title: 'Event',
    type: 'Event',
    start: event?.date,
    item: event?._id,
    color: '#003877',
  };
  await calendarService.createCalendar(calendarData);

  
  // Send notification
//   await NotificationService.createNotification({
//     title: 'New Event Scheduled',
//     message: `Added new event for <b>${subject?.name}</b>`,
//     receiver: '68dcfbd20fa1a936d5ce1c39', // TODO: Replace with dynamic user ID
//     type: 'Event',
//     read: false,
//     reference: subject?._id,
//   });

  return event;
};

const getAllEventsFromDB = async () => {
  return await Event.find().populate('subject').sort({ createdAt: -1 });
};

const getEventByIdFromDB = async (id: string) => {
  const event = await Event.findById(id).populate('subject');
  if (!event) throw new ApiError(StatusCodes.NOT_FOUND, 'Event not found');
  return event;
};

const updateEventToDB = async (id: string, payload: Partial<TEvent>) => {
  const updated = await Event.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) throw new ApiError(StatusCodes.NOT_FOUND, 'Event not found');
  return updated;
};

const deleteEventFromDB = async (id: string) => {
  const deleted = await Event.findByIdAndDelete(id);
  if (!deleted) throw new ApiError(StatusCodes.NOT_FOUND, 'Event not found');
  return deleted;
};

export const EventService = {
  createEventToDB,
  getAllEventsFromDB,
  getEventByIdFromDB,
  updateEventToDB,
  deleteEventFromDB,
};
