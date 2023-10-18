import * as mongoose from "mongoose";
import {Ref, isDocument, isRefTypeArray, isDocumentArray} from '@typegoose/typegoose';
import {Types} from 'mongoose';

import User from "./models/User";
import Product from "./models/Product";
import Second from "./models/SecondClass";
import {Comment} from "./models/Comments";
import {ObjectId} from "mongodb";
import Order from "./models/Order";
import product from "./models/Product";

// import ChildModel from "./models/Child";
// import ParentModel, {Parent} from "./models/Parent";
//



async function connectDB() {
    mongoose.set('debug', true);
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log('database is connected to', db.connection?.db.databaseName);
}


connectDB();

type MyRef<T> = Ref<T & { _id: Types.ObjectId }, Types.ObjectId & { _id: Types.ObjectId }>

// export class FirstClass {
//     @prop()
//     private name!: string;
//
//     public getName(): string {
//         return this.name;
//     }
//     public setName(value: string): void {
//         this.name = value;
//     }
// }
//
// export const First = getModelForClass(FirstClass)

// export class SecondClass {
//     @prop()
//     name: string;
//
//     @prop()
//     status: string;
//
//     @prop({ type: [String], default: [] })
//     tags: string[];
//
//     // @prop({ ref: getName(FirstClass) })
//     // first!: MyRef<FirstClass>;
//
//     @prop({ ref: () => FirstClass })
//     first!: Ref<FirstClass>;
//
// }
//
// export const Second = getModelForClass(SecondClass)

async function run() {

    const second = await Second.findById("6528f8c3664a5ce41afdd149").populate("first").exec();
    console.log(second);
    if (!isDocument(second)) {
        throw new Error("no doc");
    }

    // const id1 = second.first._id; // Typescript doesn't complain

    if (!isDocument(second.first)) {
        throw new Error("no doc");
    }
    const id2 = second.first._id; // Typescript doesn't complain
    const name = second.first.getName(); // Typescript doesn't complain

    console.log(second.first.getName());

    second.name = 'test second - 4';
    // second.tags.push('test-3-3');
    second.first.setName('test - 5');
    await second.save()
    await second.first.save()
}

// run()


async function createProduct() {
    const product = new Product({
        name: "keyboard",
        price: 200,
        url: "product-03",
        tags: ["keyboard", "gaming", "logi"],
        comments: [
            {
                text: "great product!"
            },
            {
                text: "not bad product"
            }
        ],
        owner: "6528dae54e6a1ffa8a7c1a37"
    })

    await product.save();

}


async function executeQueries() {
    // const user = new User({
    //     firstName: "Joe",
    //     lastName: "Doe",
    //     email: "joe.doe@yopmail.com",
    //     password: "123456"
    // })

    // await user.save();
    // console.log(user);

    // const product = new Product({
    //     name: "laptop",
    //     price: 300,
    //     url: "product-01",
    //     tags: ["laptop", "gaming", "razer"],
    //     comments: [
    //         {
    //             text: "awesome product!"
    //         },
    //         {
    //             text: "so so product"
    //         }
    //     ],
    //     owner: "6528dae54e6a1ffa8a7c1a37"
    // })

    // await product.save();


    const product = await Product.findOne({url: 'product-01'})
        .populate('first')
        .populate('owner')
        .exec();
    // const product = await Product.findById('6528e4f8d4c47b8eba4a57fc').populate('owner').exec();
    if (!isDocument(product)) {
        throw new Error("no product");
    }

    // if (!isDocument(product.comments)) {
    //     throw new Error("no comments");
    // }

    if (!isDocument(product.owner)) {
        throw new Error("no owner");
    }

    if (!isDocument(product.first)) {
        throw new Error("no first");
    }


    console.log(product);

    if (product) {

        const comment = product.comments.find(e => e._id.toString() === '6528e4f8d4c47b8eba4a57fe');
        if (comment) {
            comment.text = "so so product v3";
        }

        for (let i=0; i < 0; i++) {
            const newComment = new Comment({title: 'my title', text: `testing comment: 6-${i}`});
            newComment._id = new ObjectId()
            product.comments.push(newComment);
        }

        product.name = 'laptop 4';
        product.owner.password = '654321';
        await product.save();
        await product.owner.save();

        console.log(product.owner.firstName);
        console.log(product.first.getName());

    }
    // console.log(product);
}

// executeQueries();
// createProduct();
// createOrder();
getOrder();

async function createOrder() {
    const order = new Order({
        date: new Date()
    })

    const product = await Product.findOne({url: 'product-01'}).exec();

    if (product) order.products.push(product);

    await order.save();

}

async function getOrder() {
    const order = await Order.findOne({_id: "652f72dba84d6eab84c61036"})
        .populate("products")
        .exec()

    if (!isDocument(order)) {
        throw new Error("no order");
    }

    // if (!isDocument(order.products)) {
    //    throw new Error("no products");
    // }

    if (!isDocumentArray(order.products)) throw new Error("no products");

    const product = order.products.find(e => e.url === "product-01");
    if (product) {
        product.price = 303;

        await product.save()
        await order.save()

    }


    console.log(order)
}


//
// async function createParent() {
//     const child1 = new ChildModel({ childName: 'Child 1' });
//     // const child2 = new ChildModel({ childName: 'Child 2' });
//
//     // const parent = new ParentModel({ name: 'Parent', children: [child1, child2] });
//     const parent = new ParentModel({ parentName: 'Parent', children: child1 });
//
//     await child1.save();
//     // await child2.save();
//     await parent.save();
//
// }
//
// // createParent();
//
// async function findParent() {
//     const parent = await ParentModel.findOne({parentName: 'Parent'})
//         .populate('children') as Parent
//
//     if (!isDocument(parent)) {
//         throw new Error('no parent')
//     }
//     console.log(parent?.children.chidlName);
// }
//
// findParent();
//
//
// async function updateParent() {
//     // const parent = await ParentModel.findOne({ name: 'Parent' }).populate('children');
//     //
//     // if (parent && parent.children.length > 1) {
//     //     // Get the actual child document by using .populate('children')
//     //     const childToUpdate = parent.children[1];
//     //
//     //     // Now, you can update the name property of the child document
//     //     childToUpdate.name = 'New Name for Child 1';
//     // }
//     //
//     // if (parent) {
//     //     parent.markModified('children');
//     //     await parent.save();
//     // }
//
//     const parent = await ParentModel.findOne({ name: 'Parent' })
//         .populate('children', 'name'); // Populate the 'name' property of children
//
//     // if (parent && parent.children.length > 1) {
//     //     parent.children[1].name = 'New Name for Child 1';
//     // }
//     //
//     // if (parent) {
//     //     parent.markModified('children');
//     //     await parent.save();
//     // }
//
//
//     // console.log(populatedParent.children[1].name);
// }
//
// // updateParent();
