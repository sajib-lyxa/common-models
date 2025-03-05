import { getModelForClass, modelOptions, mongoose, prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum BobAccountType {
	RIDER = 'rider',
	SHOP = 'shop',
}

export enum BobSettlementType {
	SETTLE_CASH = 'settle_cash',
	SETTLE_PAYOUT = 'settle_Payout',
}

export enum BobSettlementStatus {
	NOT_PAID = 'not_paid',
	PAID = 'paid',
	REVOKED = 'revoked',
}

export enum BobModel {
	C2B = 'C2B',
	B2C = 'B2C',
}

export enum BobType {
	INWARD = 'inward',
	OUTWARD = 'outward',
}

export enum PaidCurrency {
	BASE = 'base',
	SECONDARY = 'secondary',
	MIXED = 'mixed',
}

@modelOptions({ schemaOptions: { collection: 'bobFinances' } })
export class BobFinance extends TimeStamps {
	@prop({ required: true, type: String })
	public referenceId!: string;

	@prop({ required: true, type: String, enum: BobAccountType })
	public accountType!: BobAccountType;

	@prop({ required: true, type: String, enum: BobSettlementType })
	public settlementType!: BobSettlementType;

	@prop({ type: Number, default: 0 })
	public amount?: number;

	@prop({ type: Number, default: 0 })
	public secondaryAmount?: number;

	@prop({ type: String, enum: BobSettlementStatus, default: BobSettlementStatus.NOT_PAID })
	public status?: BobSettlementStatus;

	@prop({ type: mongoose.Types.ObjectId })
	public admin?: mongoose.Types.ObjectId;
	// public get_admin() // TODO: Implement this method - return the admin object by calling the admin microservice

	@prop({ type: mongoose.Types.ObjectId })
	public shop?: mongoose.Types.ObjectId;
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ type: mongoose.Types.ObjectId })
	public rider?: mongoose.Types.ObjectId;
	// public get_rider() // TODO: Implement this method - return the rider object by calling the rider microservice

	@prop({ type: mongoose.Types.ObjectId })
	public payout?: mongoose.Types.ObjectId;
	// public get_payout() // TODO: Implement this method - return the payout object by calling the payout microservice

	@prop({ type: String, enum: BobModel, default: BobModel.C2B })
	public bobModel?: BobModel;

	@prop({ type: String, enum: BobType, default: BobType.INWARD })
	public bobType?: BobType;

	@prop({ type: String })
	public referenceNumber?: string;

	@prop({ type: String })
	public crmNumber?: string;

	@prop({ type: String })
	public bobLocation?: string;

	@prop({ type: Number })
	public riderTips?: number;

	@prop({ type: Number })
	public secondaryRiderTips?: number;

	@prop({ type: String, enum: PaidCurrency, default: PaidCurrency.BASE })
	public paidCurrency?: PaidCurrency;

	@prop({ type: Boolean, default: false })
	public isRiderSeen?: boolean;
}

export const BobFinanceModel: ReturnModelType<typeof BobFinance> = getModelForClass(BobFinance);
