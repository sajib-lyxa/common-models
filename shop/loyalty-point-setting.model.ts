import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { collection: 'loyaltyPointSettings' } })
export class LoyaltyPointSetting extends TimeStamps {
	@prop({ required: true, type: Number })
	public earnedValue!: number;

	@prop({ required: true, type: Number })
	public usedValue!: number;

	@prop({ required: true, type: [Number] })
	public rewardBundles!: number[];

	@prop({ type: Number, default: 1 })
	public expirationInDays?: number;
}

export const LoyaltyPointSettingModel: ReturnModelType<typeof LoyaltyPointSetting> =
	getModelForClass(LoyaltyPointSetting);
