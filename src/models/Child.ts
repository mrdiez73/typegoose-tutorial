import {getModelForClass, prop} from "@typegoose/typegoose";

export class Child {
    @prop()
    childName: string;
}

const ChildModel = getModelForClass(Child);

export default ChildModel;

