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

@modelOptions({ schemaOptions: { collection: 'dealSettings' } })
export class DealSetting extends TimeStamps {
	@prop({ required: true, unique: true, type: String, enum: ItemType })
	public itemType?: ItemType;

	@prop({ type: [Number], default: [] })
	public percentageBundles?: number[];

	@prop({ type: Boolean, default: true })
	public isDiscount?: boolean;

	@prop({ type: Boolean, default: true })
	public isBuy1Get1?: boolean;

	@prop({ type: Boolean, default: true })
	public isFreeDelivery?: boolean;

	@prop({ type: Boolean, default: true })
	public isPunchMarketing?: boolean;
}

export const DealSettingModel: ReturnModelType<typeof DealSetting> = getModelForClass(DealSetting);
