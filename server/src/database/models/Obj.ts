import { model, Schema } from "mongoose";

interface IObj {
  name: string;
  description: string;
}

const objSchema = new Schema<IObj>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Obj = model<IObj>("Obj", objSchema);

export default Obj;
