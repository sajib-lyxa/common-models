import { getModelForClass, modelOptions, mongoose, prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { collection: 'punchMarketingHistories' } })
export class PunchMarketingHistory extends TimeStamps {
	@prop({ required: true, type: mongoose.Types.ObjectId })
	public user!: mongoose.Types.ObjectId;
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice

	@prop({ required: true, type: mongoose.Types.ObjectId })
	public marketing!: mongoose.Types.ObjectId;
	// public get_marketing() // TODO: Implement this method - return the marketing object by calling the marketing microservice

	@prop({ type: Number, default: 1 })
	public completedOrders?: number;

	@prop({ type: Date })
	public expiredAt?: Date;
}

export const PunchMarketingHistoryModel: ReturnModelType<typeof PunchMarketingHistory> =
	getModelForClass(PunchMarketingHistory);
