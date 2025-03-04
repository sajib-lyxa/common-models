import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum ItemType {
	FOOD = 'food',
	GROCERY = 'grocery',
	PHARMACY = 'pharmacy',
	COFFEE = 'coffee',
	FLOWER = 'flower',
	PET = 'pet',
	HEALTHY_CORNER = 'healthy_corner',
}

export enum Status {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

class FeaturedItem {
	@prop({ required: true, type: Number })
	public durationInDays!: number;

	@prop({ required: true, type: Number })
	public amount!: number;

	@prop({ type: String, enum: Status, default: Status.ACTIVE })
	public status?: Status;
}

@modelOptions({ schemaOptions: { collection: 'featuredSettings' } })
export class FeaturedSetting extends TimeStamps {
	@prop({ required: true, unique: true, type: String, enum: ItemType })
	public itemType!: ItemType;

	@prop({ type: () => [FeaturedItem], default: [] })
	public featuredItems?: FeaturedItem[];
}

export const FeaturedSettingModel: ReturnModelType<typeof FeaturedSetting> =
	getModelForClass(FeaturedSetting);
