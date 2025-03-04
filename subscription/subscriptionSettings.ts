import { modelOptions, prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// Define subscription package enum
enum Package {
	MONTHLY = 'monthly',
	YEARLY = 'yearly',
}

// Define status enum
enum Status {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

@modelOptions({ schemaOptions: { collection: 'subscription_setting' } })
export class SubscriptionSetting extends TimeStamps {
	@prop({ required: true, unique: true, type: String, enum: Package })
	public package!: Package;

	@prop({ required: true, type: Number })
	public amount!: number;

	@prop({ type: String, enum: Status, default: Status.ACTIVE })
	public status?: Status;
}

export const SubscriptionSettingModel: ReturnModelType<typeof SubscriptionSetting> =
	getModelForClass(SubscriptionSetting);
