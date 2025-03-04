import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum ItemType {
	HOME = 'home',
	FOOD = 'food',
	GROCERY = 'grocery',
	PHARMACY = 'pharmacy',
	COFFEE = 'coffee',
	FLOWER = 'flower',
	PET = 'pet',
}

export enum SectionType {
	STORE_PUNCHES = 'store_punches',
	NEARBY_RESTAURANT = 'nearby_restaurant',
	NEARBY_GROCERY = 'nearby_grocery',
	NEARBY_PHARMACY = 'nearby_pharmacy',
	DISCOUNT = 'discount',
	FREE_DELIVERY = 'free_delivery',
	CRAZY_OFFER_SHOPS = 'crazy_offer_shops',
	ORDER_AGAIN = 'order_again',
	FEATURED = 'featured',
	LOVE = 'love',
	AUTHENTIC_BEIRUT = 'authentic_beirut',
	NEAR_ME = 'near_me',
}

export enum Status {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

@modelOptions({ schemaOptions: { collection: 'appScreenSettings' } })
export class AppScreenSetting extends TimeStamps {
	@prop({ required: true, enum: ItemType })
	public itemType!: ItemType;

	@prop({ required: true, enum: SectionType })
	public section!: SectionType;

	@prop({ required: true, type: String })
	public alise!: string;

	@prop({ enum: Status, default: Status.ACTIVE })
	public status?: Status;

	@prop({ type: Number, default: 0 })
	public sortingOrder?: number;

	@prop({ type: Date, default: null })
	public deletedAt?: Date | null;
}

export const AppScreenSettingModel: ReturnModelType<typeof AppScreenSetting> =
	getModelForClass(AppScreenSetting);
