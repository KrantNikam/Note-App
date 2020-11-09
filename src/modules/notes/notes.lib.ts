import Note from "../../models/note";

export const createNote = async (obj) => Note(obj).save();

export const updateNote = (condition, fields) =>
  Note.findOneAndUpdate(condition, fields, {
    new: true,
    useFindAndModify: false,
  });

export const deleteNote = async (condition) => {
  await Note.deleteOne(condition);
};

export const getNote = async (conditions, fields = null) =>
  Note.findOne(conditions, fields);

export const getNotes = async (conditions, page, limit) =>
  Note.find(conditions)
    .skip((page - 1) * limit)
    .limit(limit);

export const getNoteDocCount = async (conditions) =>
  Note.countDocuments(conditions);
