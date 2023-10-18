import {prop, getModelForClass, Ref} from "@typegoose/typegoose";
import {Comment} from "./Comments";
import {User} from "./User";
import {FirstClass} from "./FirstClass";

export class Product {
    @prop({ type: String })
    name: string;

    @prop({ type: Number, default: 0 })
    price: number;

    @prop({ type: String, lowercase: true })
    url: string;

    @prop({ type: () => [String] })
    tags: string[]

    @prop({ type: () => [Comment] })
    comments: Comment[]

    @prop({ ref: () => User })
    owner!: Ref<User>;

    @prop({ ref: () => FirstClass })
    first!: Ref<FirstClass>;

}

const ProductModel = getModelForClass(Product);
export default ProductModel;
