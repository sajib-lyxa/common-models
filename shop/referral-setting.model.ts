import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum ValueType {
	PERCENTAGE = 'percentage',
	FIXED = 'fixed',
}

class DiscountConfig {
	@prop({
		required: true,
		type: String,
		enum: ValueType,
		default: ValueType.PERCENTAGE,
	})
	public valueType!: ValueType;

	@prop({ required: true, type: Number })
	public value!: number;

	@prop({ type: Number, default: 0 })
	public minimumOrderValue?: number;
}

@modelOptions({ schemaOptions: { collection: 'referralSettings' } })
export class ReferralSetting extends TimeStamps {
	@prop({ type: DiscountConfig })
	public sender?: DiscountConfig;

	@prop({ type: DiscountConfig })
	public receiver?: DiscountConfig;
}

export const ReferralSettingModel: ReturnModelType<typeof ReferralSetting> =
	getModelForClass(ReferralSetting);
