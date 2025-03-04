import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum Status {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

@modelOptions({ schemaOptions: { collection: 'loyaltyPointCategories' } })
class LoyaltyPointCategory extends TimeStamps {
	@prop({ required: true, type: String })
	public name!: string;

	@prop({ type: String, enum: Status, default: Status.ACTIVE })
	public status?: Status;

	@prop({ type: Number, default: 0 })
	public sortingOrder?: number;
}

export const LoyaltyPointCategoryModel: ReturnModelType<typeof LoyaltyPointCategory> =
	getModelForClass(LoyaltyPointCategory);
