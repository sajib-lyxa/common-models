import { getModelForClass, index, modelOptions, mongoose, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum NotificationAccountType {
	USER = 'user',
	PARENT = 'parent',
	SHOP = 'shop',
	RIDER = 'rider',
	ADMIN = 'admin',
	CUSTOMER_SERVICE = 'customerService',
}

export enum ClickType {
	CLICKABLE_URL = 'clickableUrl',
	CLICKABLE_ORDER = 'clickableOrder',
	CLICKABLE_SHOP = 'clickableShop',
	CLICKABLE_PRODUCT = 'clickableProduct',
	CLICKABLE_LIST_CONTAINER = 'clickableListContainer',
	CLICKABLE_PAYOUT = 'clickablePayout',
	CLICKABLE_BOB_FINANCE = 'clickableBOBFinance',
	CLICKABLE_REQUEST_AREA = 'clickableRequestArea',
}

@modelOptions({ schemaOptions: { collection: 'notifications' } })
@index({ user: 1, accountType: 1, status: 1, seenBy: 1, createdAt: 1 })
@index({ shop: 1, accountType: 1, status: 1, seenBy: 1, createdAt: 1 })
@index({ accountType: 1, status: 1, type: 1, seenBy: 1, createdAt: 1 })
export class Notification extends TimeStamps {
	@prop({ required: true, type: String })
	public title?: string;

	@prop({ required: true, type: String })
	public body!: string;

	@prop({ type: String })
	public image?: string;

	@prop({ type: String })
	public sound?: string;

	@prop({ required: true, type: String, enum: NotificationAccountType })
	public accountType!: NotificationAccountType;

	@prop({ type: Boolean, default: false })
	public isGlobal?: boolean;

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public users?: mongoose.Types.ObjectId[];
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public parents?: mongoose.Types.ObjectId[];
	// public get_parent() // TODO: Implement this method - return the parent object by calling the parent microservice

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public shops?: mongoose.Types.ObjectId[];
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public riders?: mongoose.Types.ObjectId[];
	// public get_rider() // TODO: Implement this method - return the rider object by calling the rider microservice

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public admins?: mongoose.Types.ObjectId[];
	// public get_admin() // TODO: Implement this method - return the admin object by calling the admin microservice

	@prop({ type: Boolean, default: false })
	public isClickable?: boolean;

	@prop({ type: String, enum: ClickType })
	public clickType?: ClickType;

	@prop({ type: String, trim: true })
	public clickableUrl?: string;

	@prop({ type: mongoose.Types.ObjectId })
	public clickableOrder?: mongoose.Types.ObjectId;
	// public get_order() // TODO: Implement this method - return the order object by calling the order microservice

	@prop({ type: mongoose.Types.ObjectId })
	public clickableShop?: mongoose.Types.ObjectId;
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ type: mongoose.Types.ObjectId })
	public clickableProduct?: mongoose.Types.ObjectId;
	// public get_product() // TODO: Implement this method - return the product object by calling the product microservice

	@prop({ type: mongoose.Types.ObjectId })
	public clickableListContainer?: mongoose.Types.ObjectId;
	// public get_listContainer() // TODO: Implement this method - return the listContainer object by calling the listContainer microservice

	@prop({ type: mongoose.Types.ObjectId })
	public clickablePayout?: mongoose.Types.ObjectId;
	// public get_payout() // TODO: Implement this method - return the payout object by calling the payout microservice

	@prop({ type: mongoose.Types.ObjectId })
	public clickableBOBFinance?: mongoose.Types.ObjectId;
	// public get_bobFinance() // TODO: Implement this method - return the bobFinance object by calling the bobFinance microservice

	@prop({ type: mongoose.Types.ObjectId })
	public clickableRequestArea?: mongoose.Types.ObjectId;
	// public get_requestArea() // TODO: Implement this method - return the requestArea object by calling the requestArea microservice

	@prop({ type: Boolean, default: false })
	public isSendByAdmin?: boolean;

	@prop({ type: () => [mongoose.Types.ObjectId], default: [] })
	public seenBy?: mongoose.Types.ObjectId[];

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const NotificationModel: ReturnModelType<typeof Notification> = getModelForClass(Notification);
