import {
	getDiscriminatorModelForClass,
	getModelForClass,
	modelOptions,
	mongoose,
	prop,
	ReturnModelType,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// Define enums for all the enum types
export enum ItemType {
	FOOD = 'food',
	GROCERY = 'grocery',
	PHARMACY = 'pharmacy',
	COFFEE = 'coffee',
	FLOWER = 'flower',
	PET = 'pet',
	HEALTHY_CORNER = 'healthy_corner',
}

export enum MarketingType {
	DISCOUNT = 'discount',
	BUY1GET1 = 'buy1get1',
	FREE_DELIVERY = 'free_delivery',
	FEATURED = 'featured',
	LOYALTY_POINT = 'loyalty_point',
	PUNCH_MARKETING = 'punch_marketing',
}

export enum Status {
	ACTIVE = 'active',
	PAUSED = 'paused',
	EXPIRED = 'expired',
	DELETED = 'deleted',
}

export enum ItemSelectionType {
	SINGLE = 'single',
	MULTIPLE = 'multiple',
}

export enum ValueType {
	PERCENTAGE = 'percentage',
	FIXED = 'fixed',
}

class Duration {
	@prop({ type: Date, default: new Date() })
	public start?: Date;

	@prop({ type: Date })
	public end?: Date;
}

@modelOptions({ schemaOptions: { collection: 'marketings', discriminatorKey: 'marektingType' } })
export class BaseMarketing extends TimeStamps {
	@prop({ required: true, type: mongoose.Types.ObjectId })
	public shop!: mongoose.Types.ObjectId;
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ required: true, type: String, enum: MarketingType })
	public marektingType!: MarketingType;

	@prop({ required: true, type: Boolean })
	public isAppliedByAdmin!: boolean;

	@prop({ required: true, type: Duration })
	public duration!: Duration;

	@prop({ type: String, enum: Status, default: Status.ACTIVE })
	public status?: Status;

	@prop({ type: Date, default: null })
	public pausedAt?: Date | null;
}

export const MarketingModel: ReturnModelType<typeof BaseMarketing> = getModelForClass(BaseMarketing);

@modelOptions({ schemaOptions: { collection: 'productMarketings' } })
class ProductMarketing {
	@prop({ required: true, type: mongoose.Types.ObjectId })
	public product!: mongoose.Types.ObjectId;
	// public get_product() // TODO: Implement this method - return the product object by calling the product microservice

	@prop({ required: true, type: mongoose.Types.ObjectId })
	public marketing!: mongoose.Types.ObjectId;
	// public get_marketing() // TODO: Implement this method - return the marketing object by calling the marketing microservice

	@prop({ type: mongoose.Types.ObjectId }) // this field only for loyalty markeitng
	public category?: mongoose.Types.ObjectId;
	// public get_category() // TODO: Implement this method - return the category object by calling the category microservice

	@prop({ type: String, enum: ValueType, default: ValueType.PERCENTAGE })
	public valueType?: ValueType;

	@prop({ required: true, type: Number })
	public value!: number;

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const ProductMarketingModel: ReturnModelType<typeof ProductMarketing> =
	getModelForClass(ProductMarketing);

export class DiscountMarketing extends BaseMarketing {
	public marektingType = MarketingType.DISCOUNT as const;

	@prop({ type: Boolean, default: false })
	public isEntireMenu?: boolean;

	@prop({ type: String, enum: ValueType })
	public valueType?: ValueType;

	@prop({ type: Number })
	public value?: number;

	@prop({ ref: () => ProductMarketing, default: [] })
	public products?: ProductMarketing[];

	@prop({ type: Number, default: 0 })
	public maxDiscountPerOrder?: number;

	@prop({ type: Number, default: 0 })
	public spendLimit?: number;

	@prop({ type: Boolean, default: false })
	public isOnlyForSubscriber?: boolean;
}

export const DiscountMarketingModel: ReturnModelType<typeof DiscountMarketing> =
	getDiscriminatorModelForClass(MarketingModel, DiscountMarketing, MarketingType.DISCOUNT);

export class Buy1Get1Marketing extends BaseMarketing {
	public marektingType = MarketingType.BUY1GET1 as const;

	@prop({ type: Boolean, default: false })
	public isEntireMenu?: boolean;

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public products?: mongoose.Types.ObjectId[];
	// public get_product() // TODO: Implement this method - return the product object by calling the product microservice

	@prop({ type: Number, default: 0 })
	public spendLimit?: number;

	@prop({ type: Boolean, default: false })
	public isOnlyForSubscriber?: boolean;
}

export const Buy1Get1MarketingModel: ReturnModelType<typeof Buy1Get1Marketing> =
	getDiscriminatorModelForClass(MarketingModel, Buy1Get1Marketing, MarketingType.BUY1GET1);

export class FreeDeliveryMarketing extends BaseMarketing {
	public marektingType = MarketingType.FREE_DELIVERY as const;

	@prop({ type: Number, default: 0 })
	public spendLimit?: number;
}

export const FreeDeliveryMarketingModel: ReturnModelType<typeof FreeDeliveryMarketing> =
	getDiscriminatorModelForClass(MarketingModel, FreeDeliveryMarketing, MarketingType.FREE_DELIVERY);

export class FeaturedMarketing extends BaseMarketing {
	public marektingType = MarketingType.FEATURED as const;

	@prop({ type: Number })
	public amount?: number;
}

export const FeaturedMarketingModel: ReturnModelType<typeof FeaturedMarketing> =
	getDiscriminatorModelForClass(MarketingModel, FeaturedMarketing, MarketingType.FEATURED);

export class LoyaltyPointMarketing extends BaseMarketing {
	public marektingType = MarketingType.LOYALTY_POINT as const;

	@prop({ type: Boolean, default: false })
	public isEntireMenu?: boolean;

	@prop({ type: String, enum: ValueType })
	public valueType?: ValueType;

	@prop({ type: Number })
	public value?: number;

	@prop({ type: mongoose.Types.ObjectId })
	public category?: mongoose.Types.ObjectId;

	@prop({ ref: () => ProductMarketing, default: [] })
	public products?: ProductMarketing[];

	@prop({ type: Number, default: 0 })
	public spendLimit?: number;
}

export const LoyaltyPointMarketingModel: ReturnModelType<typeof LoyaltyPointMarketing> =
	getDiscriminatorModelForClass(MarketingModel, LoyaltyPointMarketing, MarketingType.LOYALTY_POINT);

export class PunchMarketing extends BaseMarketing {
	public marektingType = MarketingType.PUNCH_MARKETING as const;

	@prop({ required: true, type: Number, min: 1, max: 7 })
	public targetOrders!: number;

	@prop({ required: true, type: Number })
	public minimumOrderValue!: number;

	@prop({ required: true, type: Number, min: 1 })
	public dayLimit!: number;

	@prop({ required: true, type: String, enum: ValueType })
	public couponValueType!: ValueType;

	@prop({ required: true, type: Number })
	public couponValue!: number;

	@prop({ required: true, type: Number, min: 1 })
	public couponDurationInDays?: number;
}

export const PunchMarketingModel: ReturnModelType<typeof PunchMarketing> = getDiscriminatorModelForClass(
	MarketingModel,
	PunchMarketing,
	MarketingType.PUNCH_MARKETING
);
