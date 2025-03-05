import { modelOptions, prop, getModelForClass, ReturnModelType, mongoose, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum Status {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export enum ItemType {
	FOOD = 'food',
	GROCERY = 'grocery',
	PHARMACY = 'pharmacy',
	COFFEE = 'coffee',
	FLOWER = 'flower',
	PET = 'pet',
	HEALTHY_CORNER = 'healthy_corner',
}

export enum BannerClickType {
	LINK = 'link',
	SHOP = 'shop',
	PRODUCT = 'product',
	LIST_CONTAINER = 'list_container',
	PLUS = 'plus',
}

export enum BannerLinkType {
	URL = 'url',
	APP_ROUTE = 'app-route',
}

export enum BannerUserType {
	ALL = 'all',
	PLUS = 'plus',
	NORMAL = 'normal',
}

@modelOptions({ schemaOptions: { collection: 'banners' } })
export class Banner extends TimeStamps {
	@prop({ required: true, type: String })
	public title!: string;

	@prop({ required: true, type: String })
	public image!: string;

	@prop({ required: true, type: String, enum: ItemType })
	public itemType!: ItemType;

	@prop({
		type: String,
		enum: Status,
		default: Status.ACTIVE,
	})
	public status?: Status;

	@prop({ type: String, enum: BannerUserType, default: BannerUserType.ALL })
	public visibility?: BannerUserType;

	@prop({ type: Boolean, default: false })
	public isClickable?: boolean;

	@prop({ type: String, enum: BannerClickType })
	public clickType?: BannerClickType;

	@prop({ type: String, enum: BannerLinkType })
	public linkType?: BannerLinkType;

	@prop({ type: String, trim: true })
	public link?: string;

	@prop({ type: mongoose.Types.ObjectId })
	public shop?: mongoose.Types.ObjectId;
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ type: mongoose.Types.ObjectId })
	public product?: mongoose.Types.ObjectId;
	// public get_product() // TODO: Implement this method - return the product object by calling the product microservice

	@prop({ type: mongoose.Types.ObjectId })
	public listContainer?: mongoose.Types.ObjectId;
	// public get_listContainer() // TODO: Implement this method - return the listContainer object by calling the listContainer microservice

	@prop({ type: Number, default: 0 })
	public sortingOrder?: number;

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const BannerModel: ReturnModelType<typeof Banner> = getModelForClass(Banner);
