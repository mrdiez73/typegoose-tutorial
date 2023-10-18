import {getModelForClass, prop} from "@typegoose/typegoose";

export class FirstClass {
    @prop()
    private name!: string;

    public getName(): string {
        return this.name;
    }
    public setName(value: string): void {
        this.name = value;
    }
}

const First = getModelForClass(FirstClass)
export default First
