import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {FirstClass} from "./FirstClass";

export class SecondClass {
    @prop()
    name: string;

    @prop()
    status: string;

    @prop({ type: [String], default: [] })
    tags: string[];

    // @prop({ ref: getName(FirstClass) })
    // first!: MyRef<FirstClass>;

    @prop({ ref: () => FirstClass })
    first!: Ref<FirstClass>;

}

const Second = getModelForClass(SecondClass);
export default Second;

