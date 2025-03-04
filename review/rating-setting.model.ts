import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum AccountType {
	SHOP = 'shop',
	RIDER = 'rider',
}

@modelOptions({ schemaOptions: { collection: 'ratingSettings' } })
export class RatingSetting extends TimeStamps {
	@prop({ required: true, unique: true, type: Number, min: 1, max: 5 })
	public rating!: number;

	@prop({ required: true, type: () => [String] })
	public tags!: string[];

	@prop({ required: true, type: String, enum: AccountType })
	public accountType!: AccountType;
}

export const RatingSettingModel: ReturnModelType<typeof RatingSetting> = getModelForClass(RatingSetting);
