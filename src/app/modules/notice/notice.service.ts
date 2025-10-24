import { INotice } from "./notice.interface";
import Notice from "./notice.model";


interface INoticeInput {
  description: string;
  publishDate?: Date;
}

class NoticeService {
  // Create a new notice
  async createNotice(data: INoticeInput, files?: any): Promise<INotice> {
    const payload: any = { ...data };

    // For multiple images
    if (files?.images?.length > 0) {
      payload.images = files.images.map((file: any) => `/uploads/image/${file.filename}`);
    }

    // For multiple documents
    if (files?.documents?.length > 0) {
      payload.documents = files.documents.map((file: any) => `/uploads/document/${file.filename}`);
    }

    const notice = await Notice.create(payload);
    return notice;
  }

  // Update notice
  async updateNotice(
    id: string,
    data: Partial<INoticeInput & { oldImages?: string[]; oldDocuments?: string[] }>,
    files?: any
  ): Promise<INotice | null> {
    const notice = await Notice.findById(id);
    if (!notice) throw new Error("Notice not found");

    const payload: any = { ...data };

    // Keep old images/documents
    payload.images = data.oldImages ?? notice.images ?? [];
    payload.documents = data.oldDocuments ?? notice.documents ?? [];

    // Append new uploaded files
    if (files?.images?.length > 0) {
      payload.images.push(...files.images.map((file: any) => `/uploads/image/${file.filename}`));
    }

    if (files?.documents?.length > 0) {
      payload.documents.push(...files.documents.map((file: any) => `/uploads/document/${file.filename}`));
    }

    Object.assign(notice, payload);
    await notice.save();
    return notice;
  }

  async getAllNotices(): Promise<INotice[]> {
    return await Notice.find().sort({ publishDate: -1 });
  }

  async getNoticeById(id: string): Promise<INotice | null> {
    return await Notice.findById(id);
  }

  async deleteNotice(id: string): Promise<INotice | null> {
    return await Notice.findByIdAndDelete(id);
  }
}

export default new NoticeService();
