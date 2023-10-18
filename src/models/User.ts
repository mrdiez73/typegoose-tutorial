import {prop, getModelForClass} from "@typegoose/typegoose";

export class User {
    @prop()
    firstName: string;

    @prop()
    lastName: string;

    @prop()
    email: string;

    @prop()
    password: string;
}

const UserModel = getModelForClass(User);
export default UserModel;
