import {getModelForClass, prop, Ref} from "@typegoose/typegoose";
import {Product} from "./Product";


export class Order {
    @prop()
    date: Date;

    @prop({ ref: () => Product, default: [] })
    products: Ref<Product>[]
}

const OrderModel = getModelForClass(Order);
export default OrderModel;
