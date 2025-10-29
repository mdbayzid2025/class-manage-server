
import mongoose from "mongoose";
import { INote } from "./note.interface";
import { Note } from "./note.model";
import { Subject } from "../subject/subject.model";
import { User } from "../user/user.model";
import { sendNotifications } from "../../../helpers/notificationHelper";
import QueryBuilder from "../../builder/QueryBuilder";



class NoteService {
  // Create Note with uploaded files
  async createNote(payload: any, files?: any): Promise<INote> {

    if (files?.images?.length > 0) {
      payload.images = files?.images?.map(
        (file: any) => `/image/${file.filename}`,
      );
    }

    if (files?.document?.length > 0) {
      payload.document = files?.document?.map(
        (file: any) => `/document/${file.filename}`,
      );
    }

    const note = await Note.create(payload);

    const subject = await Subject.findByIdAndUpdate(
      payload.subject,
      { $push: { notes: note._id } },
      { new: true }
    ).select("name");

    const users = await User.find();

    await Promise.all(
      users.map((user: any) =>
        sendNotifications({
          title: "New Note Added",
          message: `New note added for <b>${subject?.name}</b>.`,
          receiver: user?._id,
          type: "Note",
          read: false,
          reference: subject?._id,
        })
      )
    );

    return note;
  }

  // Update Note with uploaded files
  async updateNote(
    id: string,
    data: any,
    files?: any
  ): Promise<INote | null> {
    const note = await Note.findById(id);
    if (!note) throw new Error("Note not found");

    // Handle old images/documents
    const oldImages =
      typeof (data as any).oldImages === "string"
        ? [(data as any).oldImages]
        : (data as any).oldImages ?? [];
    const oldDocuments =
      typeof (data as any).oldDocuments === "string"
        ? [(data as any).oldDocuments]
        : (data as any).oldDocuments ?? [];

    const updatedImages = [...oldImages];
    const updatedDocuments = [...oldDocuments];

    // Add new uploaded images
    if (files?.images && files?.images?.length > 0) {
      const newImagePaths = files?.images?.map(
        (file: any) => `/uploads/image/${file.filename}`,
      );
      updatedImages.push(...newImagePaths);
    }

    // Add new uploaded documents
    if (files?.documents && files.documents.length > 0) {
      const newDocumentPaths = files?.documents?.map(
        (file: any) => `/uploads/document/${file.filename}`,
      );
      updatedDocuments.push(...newDocumentPaths);
    }

    // Parse tags if sent as string
    const tags =
      typeof (data as any).tags === "string"
        ? JSON.parse((data as any).tags)
        : (data as any).tags ?? [];

    Object.assign(note, {
      ...data,
      tags,
      images: updatedImages,
      documents: updatedDocuments,
    });

    await note.save();
    return note;
  }

  async getAllNotes(query?: any) {

    const baseQuery = Note.find()    
    .populate("subject", 'name');

    const notesQueryBuilder = new QueryBuilder(
      baseQuery,
      query
    )
      .search(["title", "tags", "subject.name"])
      .filter()
      .sort()
      .fields()
      .paginate();

    const notes = await notesQueryBuilder.modelQuery.lean();
    const meta = await   notesQueryBuilder.getPaginationInfo()
    return {data: notes, meta };
  }

  async getNoteById(id: string): Promise<INote | null> {
    return await Note.findById(id).populate("subject", "name");
  }

  async deleteNote(id: string): Promise<INote | null> {
    return await Note.findByIdAndDelete(id);
  }
}

export default new NoteService();
