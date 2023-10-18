import {prop, getModelForClass, Ref, getName} from '@typegoose/typegoose';
import {Child} from "./Child";
import {Types} from "mongoose";

type MyRef<T> = Ref<T & { _id: Types.ObjectId }, Types.ObjectId & { _id: Types.ObjectId }>

export class Parent {
    @prop()
    parentName: string;

    @prop({ ref: () => getName(Child) }) // Establishing the reference to Child
    children: MyRef<Child>;
}

const ParentModel = getModelForClass(Parent);
export default ParentModel
