import { getModelForClass, modelOptions, mongoose, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum DishCategory {
	BREAKFAST = 'breakfast',
	LUNCH = 'lunch',
	DINNER = 'dinner',
	SNACKS = 'snacks',
}

@modelOptions({ schemaOptions: { collection: 'dishes' } })
export class Dish extends TimeStamps {
	@prop({ required: true, type: mongoose.Types.ObjectId })
	public shop!: mongoose.Types.ObjectId;
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ required: true, type: String })
	public name!: string;

	@prop({ type: String })
	public image?: string;

	@prop({ type: String })
	public description?: string;

	@prop({ required: true, enum: DishCategory })
	public category!: DishCategory;

	@prop({ type: () => [String], default: [] })
	public ingredients?: string[];

	@prop({ required: true, type: Number })
	public calories!: number;

	@prop({ required: true, type: Number })
	public fat!: number;

	@prop({ required: true, type: Number })
	public fibers!: number;

	@prop({ required: true, type: Number })
	public protein!: number;

	@prop({ required: true, type: () => [Number] })
	public portionPercentage!: number[];

	@prop({ type: Number, default: 0 })
	public sortingOrder?: number;

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const DishModel: ReturnModelType<typeof Dish> = getModelForClass(Dish);
