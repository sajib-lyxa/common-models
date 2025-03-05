import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum RatingAccountType {
	SHOP = 'shop',
	RIDER = 'rider',
}

@modelOptions({ schemaOptions: { collection: 'ratingSettings' } })
export class RatingSetting extends TimeStamps {
	@prop({ required: true, unique: true, type: Number, min: 1, max: 5 })
	public rating!: number;

	@prop({ required: true, type: () => [String] })
	public tags!: string[];

	@prop({ required: true, type: String, enum: RatingAccountType })
	public accountType!: RatingAccountType;
}

export const RatingSettingModel: ReturnModelType<typeof RatingSetting> = getModelForClass(RatingSetting);
