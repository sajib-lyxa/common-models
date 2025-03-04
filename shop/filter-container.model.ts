import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
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

export enum Status {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

@modelOptions({ schemaOptions: { collection: 'filterContainers' } })
export class FilterContainer extends TimeStamps {
	@prop({ required: true, type: String })
	public name!: string;

	@prop({ required: true, type: [String] })
	public deals!: string[]; // e.g., "5", "10", "20", "30", "double_menu"

	@prop({ type: String, enum: ItemType })
	public itemType?: ItemType;

	@prop({ type: String, enum: Status, default: Status.ACTIVE })
	public status?: Status;

	@prop({ type: Number, default: 0 })
	public sortingOrder?: number;

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const FilterContainerModel = getModelForClass(FilterContainer);
