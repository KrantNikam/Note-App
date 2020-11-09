import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    noteId: {
      type: Number,
      unique: true,
    },
    userId: {
      type: Number,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

NoteSchema.pre('validate', autonIncrement);

const Note = mongoose.model('Note', NoteSchema);

/**
 *
 * @param {*} next
 */
function autonIncrement(next) {
  const self = this;
  if (self.isNew) {
    this.wasNew = this.isNew;
    Note.findOne({}).sort({ _id: -1 }).limit(1).then((newObj) => {   
      self.noteId = newObj && newObj.noteId ? newObj.noteId + 1 : 1;
      next();
    })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
}

export default Note;