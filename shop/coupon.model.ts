import {
	getDiscriminatorModelForClass,
	getModelForClass,
	modelOptions,
	mongoose,
	prop,
	Ref,
	ReturnModelType,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// Define enums for all the enum types
export enum CouponType {
	GLOBAL = 'global',
	INDIVIDUAL_STORE = 'individual_store',
	INDIVIDUAL_USER = 'individual_user',
	CUSTOM_COUPON = 'custom_coupon',
	REFERRAL_CODE = 'referral_code',
	REFERRAL_REWARD = 'referral_reward',
}

export enum ItemType {
	FOOD = 'food',
	GROCERY = 'grocery',
	PHARMACY = 'pharmacy',
	COFFEE = 'coffee',
	FLOWER = 'flower',
	PET = 'pet',
	HEALTHY_CORNER = 'healthy_corner',
}

export enum ValueType {
	PERCENTAGE = 'percentage',
	FIXED = 'fixed',
}

export enum Status {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export enum ExpirationReason {
	DURATION = 'duration',
	SPEND_LIMIT = 'spendLimit',
	TOTAL_ORDER_LIMIT = 'totalOrderLimit',
}

class Duration {
	@prop({ type: Date, default: new Date() })
	public start?: Date;

	@prop({ type: Date })
	public end?: Date;
}

@modelOptions({ schemaOptions: { collection: 'coupons', discriminatorKey: 'couponType' } })
export class Coupon extends TimeStamps {
	@prop({ required: true, uppercase: true, trim: true, type: String })
	public code!: string;

	@prop({ required: true, type: String, enum: CouponType })
	public couponType!: CouponType;

	@prop({ type: Number, default: null })
	public orderLimitPerUser?: number | null;
}

export const CouponModel: ReturnModelType<typeof Coupon> = getModelForClass(Coupon);

export class BaseCoupon extends Coupon {
	@prop({ required: true, type: String, enum: ValueType })
	public valueType!: ValueType;

	@prop({ required: true, type: Number })
	public value!: number;

	@prop({ type: Number, default: null }) // applicable when valueType percentage
	public maxDiscountLimit?: number | null;

	@prop({ required: true, type: Duration })
	public duration!: Duration;

	@prop({ type: Number, default: null })
	public spendLimit?: number | null;

	@prop({ type: Number, default: null })
	public totalOrderLimit?: number | null;

	@prop({ type: Number, default: null })
	public minOrderValue?: number | null;

	@prop({ type: Boolean, default: false })
	public forNewUserOnly?: boolean;

	@prop({ type: String, enum: Status, default: Status.ACTIVE })
	public status?: Status;

	@prop({ type: String, enum: ExpirationReason })
	public expirationReason?: ExpirationReason;

	@prop({ type: Date, default: null })
	public deletedAt?: Date | null;
}

export class GlobalCoupon extends BaseCoupon {
	public couponType = CouponType.GLOBAL as const;
}

export const GlobalCouponModel: ReturnModelType<typeof GlobalCoupon> = getDiscriminatorModelForClass(
	CouponModel,
	GlobalCoupon,
	CouponType.GLOBAL
);

export class IndividualStoreCoupon extends BaseCoupon {
	public couponType = CouponType.INDIVIDUAL_STORE as const;

	@prop({ type: [String], enum: ItemType, default: [] })
	public itemTypes?: ItemType[];

	@prop({ type: [mongoose.Types.ObjectId], default: [] })
	public shops?: mongoose.Types.ObjectId[];
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ type: Boolean, default: false })
	public isShopCoverExpenses?: boolean;
}

export const IndividualStoreCouponModel: ReturnModelType<typeof IndividualStoreCoupon> =
	getDiscriminatorModelForClass(CouponModel, IndividualStoreCoupon, CouponType.INDIVIDUAL_STORE);

export class IndividualUserCoupon extends BaseCoupon {
	public couponType = CouponType.INDIVIDUAL_USER as const;

	@prop({ required: true, type: [mongoose.Types.ObjectId] })
	public users!: mongoose.Types.ObjectId[];
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice

	@prop({ type: [String], enum: ItemType, default: [] })
	public itemTypes?: ItemType[];

	@prop({ type: [mongoose.Types.ObjectId], default: [] })
	public shops?: mongoose.Types.ObjectId[];
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice
}

export const IndividualUserCouponModel: ReturnModelType<typeof IndividualUserCoupon> =
	getDiscriminatorModelForClass(CouponModel, IndividualUserCoupon, CouponType.INDIVIDUAL_USER);

export class CustomCoupon extends BaseCoupon {
	public couponType = CouponType.CUSTOM_COUPON as const;

	@prop({ required: true, type: mongoose.Types.ObjectId })
	public influencer!: mongoose.Types.ObjectId;
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice

	@prop({ type: [String], enum: ItemType, default: [] })
	public itemTypes?: ItemType[];

	@prop({ type: [mongoose.Types.ObjectId], default: [] })
	public shops?: mongoose.Types.ObjectId[];
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice
}

export const CustomCouponModel: ReturnModelType<typeof CustomCoupon> = getDiscriminatorModelForClass(
	CouponModel,
	CustomCoupon,
	CouponType.CUSTOM_COUPON
);

export class ReferralCodeCoupon extends Coupon {
	public couponType = CouponType.REFERRAL_CODE as const;

	public orderLimitPerUser = 1 as const;

	@prop({ required: true, type: mongoose.Types.ObjectId })
	public referralUser!: mongoose.Types.ObjectId;
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice
}

export const ReferralCodeCouponModel: ReturnModelType<typeof ReferralCodeCoupon> =
	getDiscriminatorModelForClass(CouponModel, ReferralCodeCoupon, CouponType.REFERRAL_CODE);

export class ReferralRewardCoupon extends BaseCoupon {
	public couponType = CouponType.REFERRAL_REWARD as const;

	@prop({ required: true, type: [mongoose.Types.ObjectId] })
	public users!: mongoose.Types.ObjectId[];
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice

	@prop({ required: true, type: mongoose.Types.ObjectId })
	public referralCodeUsedBy!: mongoose.Types.ObjectId;
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice

	@prop({ required: true, type: mongoose.Types.ObjectId })
	public referralCodeUsedOnOrder!: mongoose.Types.ObjectId;
	// public get_order() // TODO: Implement this method - return the order object by calling the order microservice
}

export const ReferralRewardCouponModel: ReturnModelType<typeof ReferralRewardCoupon> =
	getDiscriminatorModelForClass(CouponModel, ReferralRewardCoupon, CouponType.REFERRAL_REWARD);
