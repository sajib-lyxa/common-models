import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum Status {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

@modelOptions({ schemaOptions: { collection: 'nutritions' } })
export class Nutrition extends TimeStamps {
	@prop({ required: true, type: String })
	public name!: string;

	@prop({ enum: Status, default: Status.ACTIVE })
	public status?: Status;

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const NutritionModel: ReturnModelType<typeof Nutrition> = getModelForClass(Nutrition);
