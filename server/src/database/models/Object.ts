import { model, Schema } from "mongoose";

interface IObject {
  name: string;
  description: string;
}

const objectSchema = new Schema<IObject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Object = model<IObject>("Object", objectSchema);

export default Object;
