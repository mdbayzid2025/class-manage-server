import { Router } from "express";
import noticeController from "./notice.controller";

const router = Router();

// Create Notice
router.post("/", (req, res) => noticeController.createNotice(req, res));

// Update Notice
router.put("/:id", (req, res) => noticeController.updateNotice(req, res));

// Get all notices
router.get("/", (req, res) => noticeController.getAllNotices(req, res));

// Get single notice by ID
router.get("/:id", (req, res) => noticeController.getNoticeById(req, res));

// Delete notice by ID
router.delete("/:id", (req, res) => noticeController.deleteNotice(req, res));


export const NoticeRoutes = router;