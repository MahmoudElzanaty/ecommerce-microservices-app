import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type CouponDocument = Coupon & Document;

@Schema()
export class Coupon {
    @Prop()
    coupon_code: string;

    @Prop()
    coupon_percentage: number;

    @Prop()
    limited: boolean;

    @Prop({ required: function(this: Coupon) { return this.limited; } })
    quantity?: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
