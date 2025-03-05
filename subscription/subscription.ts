import { modelOptions, prop, Ref, getModelForClass, mongoose } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// Define subscription package enum
enum SubscriptionPackage {
	MONTHLY = 'monthly',
	YEARLY = 'yearly',
}

// Define subscription status enum
enum SubscriptionStatus {
	ONGOING = 'ongoing',
	EXPIRED = 'expired',
}

// Define payment method enum
enum PaymentMethod {
	CASH = 'cash',
	CARD = 'card',
}

// Define payment status enum
enum PaymentStatus {
	PAID = 'paid',
	PENDING = 'pending',
}

enum PaidCurrency {
	BASE = 'base',
	SECONDARY = 'secondary',
	MIXED = 'mixed',
}

// Define summary class
class SubscriptionSummary {
	@prop({ type: Number, default: 0 })
	public wallet?: number;

	@prop({ type: Number, default: 0 })
	public secondaryWallet?: number;

	@prop({ type: Number, default: 0 })
	public card?: number;

	@prop({ type: Number, default: 0 })
	public secondaryCard?: number;

	@prop({ type: Number, default: 0 })
	public cash?: number;

	@prop({ type: Number, default: 0 })
	public secondaryCash?: number;
}

// Define duration class
class Duration {
	@prop({ type: Date, default: new Date() })
	public start?: Date;

	@prop({ type: Date })
	public end?: Date;
}

@modelOptions({ schemaOptions: { collection: 'subscriptions' } })
export class Subscription extends TimeStamps {
	@prop({ required: true, type: mongoose.Types.ObjectId })
	public user!: mongoose.Types.ObjectId;

	@prop({ type: String, enum: SubscriptionPackage, default: SubscriptionPackage.MONTHLY })
	public package?: SubscriptionPackage;

	@prop({ required: true, type: Number })
	public fee!: number;

	@prop({ required: true, type: Number })
	public secondaryFee!: number;

	@prop({ type: SubscriptionSummary })
	public summary?: SubscriptionSummary;

	@prop({ required: true, type: Duration })
	public duration!: Duration;

	@prop({ type: String, enum: SubscriptionStatus, default: SubscriptionStatus.ONGOING })
	public status?: SubscriptionStatus;

	@prop({ type: Boolean, default: true })
	public autoRenew?: boolean;

	@prop({ type: String })
	public cancelReason?: string;

	@prop({ required: true, type: String, enum: PaymentMethod })
	public paymentMethod!: PaymentMethod;

	@prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
	public paymentStatus?: PaymentStatus;

	@prop({ type: () => [mongoose.Types.ObjectId] })
	public transactions?: mongoose.Types.ObjectId[];

	@prop({ type: String, enum: PaidCurrency, default: PaidCurrency.BASE })
	public paidCurrency?: PaidCurrency;
}

export const SubscriptionModel = getModelForClass(Subscription);
