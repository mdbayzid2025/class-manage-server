import { Assignment } from './assignment.model';
import { TAssignment } from './assignment.interface';
import { Subject } from '../subject/subject.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

import { sendNotifications } from '../../../helpers/notificationHelper';
import { calendarService } from '../calendar/calendar.service';
import { ICalendarEvent } from '../calendar/calendar.interface';

const createAssignmentToDB = async (payload: TAssignment) => {
  // create assignment
  const assignment = await Assignment.create(payload);

  // attach to subject
  const subject = await Subject.findByIdAndUpdate(
    payload.subject,
    { $push: { assignments: assignment._id } },
    { new: true },
  );

  if (!subject) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid subject reference');
  }

  // create calendar entry
  const calendarData : ICalendarEvent = {
    title: 'Assignment',
    type: 'Assignment',
    item: assignment?._id,
    start: assignment.submissionDate,
    color: '#830a69ff',
  };
  await calendarService.createCalendar(calendarData);

  // send notification (example receiver, adjust logic as needed)
//   await sendNotifications({
//     title: 'Scheduled new assignment',
//     message: `Scheduled new assignment of <b>${subject.name}</b>.`,
//     receiver: '68dcfbd20fa1a936d5ce1c39',
//     type: 'Assignment',
//     read: false,
//     reference: subject._id,
//   });

  return assignment;
};

const getAllAssignmentsFromDB = async () => {
  return await Assignment.find().populate('subject').sort({ createdAt: -1 });
};

const getAssignmentByIdFromDB = async (id: string) => {
  const assignment = await Assignment.findById(id).populate('subject');
  if (!assignment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Assignment not found');
  }
  return assignment;
};

const updateAssignmentToDB = async (id: string, payload: Partial<TAssignment>) => {
  const updatedAssignment = await Assignment.findByIdAndUpdate(id, payload, { new: true });

  if (!updatedAssignment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Assignment not found');
  }

  return updatedAssignment;
};

const deleteAssignmentFromDB = async (id: string) => {
  const deletedAssignment = await Assignment.findByIdAndDelete(id);
  if (!deletedAssignment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Assignment not found');
  }

  // remove from subject
  await Subject.findByIdAndUpdate(
    deletedAssignment.subject,
    { $pull: { assignments: deletedAssignment._id } },
    { new: true },
  );

  return deletedAssignment;
};

export const AssignmentService = {
  createAssignmentToDB,
  getAllAssignmentsFromDB,
  getAssignmentByIdFromDB,
  updateAssignmentToDB,
  deleteAssignmentFromDB,
};
