import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { collection: 'mealPlans' } })
export class MealPlan extends TimeStamps {
	@prop({ required: true, type: String })
	public name!: string;

	@prop({ required: true, type: String })
	public image!: string;

	@prop({ required: true, type: String })
	public shortDescription!: string;

	@prop({ required: true, type: String })
	public fullDescription!: string;

	@prop({ type: () => [String], default: [] })
	public suitedFor?: string[];

	@prop({ type: () => [String], default: [] })
	public dietContains?: string[];

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const MealPlanModel: ReturnModelType<typeof MealPlan> = getModelForClass(MealPlan);
