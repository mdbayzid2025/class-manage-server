import { Request, Response } from "express";
import noticeService from "./notice.service";

class NoticeController {
  async createNotice(req: Request, res: Response) {
    try {
      const notice = await noticeService.createNotice(req.body, req.files as Express.Multer.File[]);
      res.status(201).json({ success: true, message: "Notice created", data: notice });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateNotice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const notice = await noticeService.updateNotice(id, req.body, req.files as Express.Multer.File[]);
      res.status(200).json({ success: true, message: "Notice updated", data: notice });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAllNotices(req: Request, res: Response) {
    try {
      const notices = await noticeService.getAllNotices();
      res.status(200).json({ success: true, data: notices });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getNoticeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const notice = await noticeService.getNoticeById(id);
      if (!notice) return res.status(404).json({ success: false, message: "Notice not found" });
      res.status(200).json({ success: true, data: notice });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteNotice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const notice = await noticeService.deleteNotice(id);
      if (!notice) return res.status(404).json({ success: false, message: "Notice not found" });
      res.status(200).json({ success: true, message: "Notice deleted" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new NoticeController();
