import { getModelForClass, modelOptions, mongoose, prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class DishWithPortion {
	@prop({ type: mongoose.Types.ObjectId })
	public dish?: mongoose.Types.ObjectId;
	// public get_dish() // TODO: Implement this method - return the dish object by calling the dish microservice

	@prop({ type: () => [Number], default: [] })
	public portionPercentageForPackage?: number[];
}

class MealCategory {
	@prop({ type: String })
	public name?: string;

	@prop({ type: () => [DishWithPortion], default: [] })
	public dishes?: DishWithPortion[];
}

class CalorieRange {
	@prop({ type: Number })
	public from?: number;

	@prop({ type: Number })
	public to?: number;
}

class PackageRange {
	@prop({ type: String })
	public title?: string;

	@prop({ type: CalorieRange })
	public calorieRange?: CalorieRange;

	@prop({ type: Number })
	public price?: number;

	@prop({ type: () => [MealCategory], default: [] })
	public categories?: MealCategory[];
}

class Package {
	@prop({ type: String })
	public name?: string;

	@prop({ type: () => [PackageRange], default: [] })
	public ranges?: PackageRange[];
}

@modelOptions({ schemaOptions: { collection: 'shopMealPlans' } })
export class ShopMealPlan extends TimeStamps {
	@prop({ required: true, type: mongoose.Types.ObjectId })
	public mealPlan!: mongoose.Types.ObjectId;

	@prop({ required: true, type: mongoose.Types.ObjectId })
	public shop!: mongoose.Types.ObjectId;
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public dishes?: mongoose.Types.ObjectId[];
	// public get_dish() // TODO: Implement this method - return the dish object by calling the dish microservice

	@prop({ type: () => [Package], default: [] })
	public packages?: Package[];

	@prop({ type: Date, default: null })
	public deletedAt?: Date | null;
}

export const MealPlanModel: ReturnModelType<typeof ShopMealPlan> = getModelForClass(ShopMealPlan);
