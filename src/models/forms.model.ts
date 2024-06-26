import { model, Schema } from 'mongoose';

const FieldSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
});

const FormSchema: Schema = new Schema(
  {
    version: {
      type: String,
      default: '1.0',
    },
    name: {
      type: String,
      required: true,
    },
    fields: {
      type: [FieldSchema],
      require: true,
    },
  },
  { timestamps: true },
);

export const FormModel = model('Form', FormSchema);
