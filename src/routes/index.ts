import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { SemesterRoutes } from '../app/modules/semester/semester.route';
import { EventRoutes } from '../app/modules/event/event.route';
import { CalendarRoutes } from '../app/modules/calendar/calendar.route';
import { NoteRoutes } from '../app/modules/note/note.route';
import { NoticeRoutes } from '../app/modules/notice/notice.route';
import { NotificationRoutes } from '../app/modules/notification/notification.route';
import { SubjectRoutes } from '../app/modules/subject/subject.route';
import { TeacherRoutes } from '../app/modules/teacher/teacher.route';
import { ToDoRoutes } from '../app/modules/todo/todo.route';
import { AssignmentRoutes } from '../app/modules/assignment/assignment.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/semesters',
    route: SemesterRoutes,
  },
  {
    path: '/subjects',
    route: SubjectRoutes,
  },
  {
    path: '/todos',
    route: ToDoRoutes,
  },
  {
    path: '/teachers',
    route: TeacherRoutes,
  },
  {
    path: '/assignments',
    route: AssignmentRoutes,
  },
  {
    path: '/events',
    route: EventRoutes,
  },
  {
    path: '/calendar',
    route: CalendarRoutes,
  },
  {
    path: '/notes',
    route: NoteRoutes,
  },
  {
    path: '/notice',
    route: NoticeRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  }
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;