import { getModelForClass, modelOptions, mongoose, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum FavouriteType {
	PRODUCT = 'product',
	SHOP = 'shop',
}

@modelOptions({ schemaOptions: { collection: 'favourites' } })
export class Favourite extends TimeStamps {
	@prop({ required: true, type: mongoose.Types.ObjectId })
	public user!: mongoose.Types.ObjectId;
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice

	@prop({ enum: FavouriteType, required: true })
	public favouriteType!: FavouriteType;

	@prop({ type: mongoose.Types.ObjectId })
	public shop?: mongoose.Types.ObjectId;
	// public get_shop() // TODO: Implement this method - return the shop object by calling the shop microservice

	@prop({ type: mongoose.Types.ObjectId })
	public product?: mongoose.Types.ObjectId;
	// public get_product() // TODO: Implement this method - return the product object by calling the product microservice

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const FavouriteModel: ReturnModelType<typeof Favourite> = getModelForClass(Favourite);
