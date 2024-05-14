import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
    save() {
        throw new Error('Method not implemented.');
    }

    @Prop()
    user_id?: MongooseSchema.Types.ObjectId;  // For authenticated users

    @Prop()
    sessiond_id?: string; // For guest users

    @Prop()
    items: {
        productId: any;
        rentalDuration: string;
        isRented: boolean; name: string, amount_cents: number /*call the function from laineymclainpants*/, description: string, color: string, size: string, material: string, quantity: number
    }[];

    @Prop()
    total_price_pre_coupon: number; //lained

    @Prop()
    total_price_post_coupon: number | null;

    @Prop()
    coupon_code: string | null;

    @Prop()
    coupon_percentage: number;

    @Prop()
    is_checkout: boolean;

    @Prop({ default: Date.now })
    updated_at: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);