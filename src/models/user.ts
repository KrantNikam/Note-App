import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userId: {
      type: Number,
      unique: true,
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

UserSchema.pre('validate', autonIncrement);

const User = mongoose.model('User', UserSchema);

/**
 *
 * @param {*} next
 */
function autonIncrement(next) {
  const self = this;
  if (self.isNew) {
    this.wasNew = this.isNew;
    User.findOne({}).sort({ _id: -1 }).limit(1).then((newObj) => {
      self.userId = newObj && newObj.userId ? newObj.userId + 1 : 1;
      next();
    })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
}

export default User;