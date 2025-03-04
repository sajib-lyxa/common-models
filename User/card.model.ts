import { modelOptions, getModelForClass, mongoose, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum CardType {
	AREEBA = 'areeba',
}

export enum CardStatus {
	ACTIVE = 'active',
	PENDING = 'pending',
}

@modelOptions({ schemaOptions: { collection: 'cards' } })
export class Card extends TimeStamps {
	@prop({ required: true, type: mongoose.Types.ObjectId })
	public user!: mongoose.Types.ObjectId;
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice

	@prop({ enum: CardType, default: CardType.AREEBA })
	public cardType?: CardType;

	@prop({ type: String })
	public orderId?: string;

	@prop({ type: String })
	public sessionId?: string;

	@prop({ type: String, default: 'USD' })
	public currency?: string;

	@prop({ type: String })
	public brand?: string;

	@prop({ type: String })
	public expiry?: string;

	@prop({ type: String })
	public fundingMethod?: string;

	@prop({ type: String })
	public nameOnCard?: string;

	@prop({ type: String })
	public number?: string;

	@prop({ type: String })
	public scheme?: string;

	@prop({ type: String })
	public token?: string;

	@prop({ enum: CardStatus, default: CardStatus.PENDING })
	public status?: CardStatus;

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const CardModel: ReturnModelType<typeof Card> = getModelForClass(Card);
