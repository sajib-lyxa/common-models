import { getModelForClass, modelOptions, prop, ReturnModelType, mongoose } from '@typegoose/typegoose';
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

@modelOptions({ schemaOptions: { collection: 'listContainers' } })
export class ListContainer extends TimeStamps {
	@prop({ required: true, type: String })
	public name!: string;

	@prop({ required: true, type: String })
	public image!: string;

	@prop({ required: true, type: String })
	public banner!: string;

	@prop({ type: () => [String], default: [] })
	public deals?: string[];

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public tags?: mongoose.Types.ObjectId[];
	// public get_tag() // TODO: Implement this method - return the tag object by calling the tag microservice

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public shops?: mongoose.Types.ObjectId[];
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ type: String, enum: ItemType })
	public itemType?: ItemType;

	@prop({ enum: Status, default: Status.ACTIVE })
	public status?: Status;

	@prop({ type: Number, default: 0 })
	public sortingOrder?: number;

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const ListContainerModel: ReturnModelType<typeof ListContainer> = getModelForClass(ListContainer);
