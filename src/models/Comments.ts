import {modelOptions, prop} from "@typegoose/typegoose";
import {ObjectId} from "mongodb";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Comment {
    @prop()
    _id: ObjectId;

    @prop()
    text: string;

    constructor(data?) {
        const { _id, text } = data || {}

        this._id = _id;
        this.text = text
    }
}
