import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum FaqAccountType {
	USER = 'user',
	SHOP = 'shop',
	RIDER = 'rider',
}

export enum Status {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

@modelOptions({ schemaOptions: { collection: 'faqs' } })
export class Faq extends TimeStamps {
	@prop({ required: true, type: String })
	public question!: string;

	@prop({ required: true, type: String })
	public answer!: string;

	@prop({ required: true, enum: FaqAccountType })
	public accountType!: FaqAccountType;

	@prop({ enum: Status, default: Status.ACTIVE })
	public status?: Status;

	@prop({ type: Number, default: 0 })
	public sortingOrder?: number;

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const FaqModel: ReturnModelType<typeof Faq> = getModelForClass(Faq);
