import { model, Schema } from 'mongoose';

const SubmissionSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    formId: {
      type: Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const SubmissionModel = model('Submission', SubmissionSchema);
