import { getModelForClass, modelOptions, mongoose, prop, Ref, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Address {
	@prop({ type: () => String })
	public address?: string;

	@prop({ type: () => String })
	public addressDescription?: string;

	@prop({
		type: () => String,
		enum: ['Point', 'Polygon'],
		default: 'Point',
	})
	public locationType!: string;

	@prop({ type: () => [Number] })
	public coordinates?: number[];

	@prop({ type: () => Number })
	public latitude?: number;

	@prop({ type: () => Number })
	public longitude?: number;

	@prop({ type: () => String })
	public country?: string;

	@prop({ type: () => String })
	public state?: string;

	@prop({ type: () => String })
	public city?: string;

	@prop({ type: () => String })
	public postCode?: string;

	@prop({ type: () => String })
	public note?: string;

	@prop({ type: () => String })
	public placeId?: string;
}

@modelOptions({ schemaOptions: { collection: 'request-area' } })
export class RequestArea extends TimeStamps {
	@prop({ type: mongoose.Types.ObjectId })
	public user?: mongoose.Types.ObjectId;
	// public get_user() // TODO: Implement this method - return the user object by calling the user microservice

	@prop({ required: true, type: Address })
	public location!: Address;
}

export const RequestAreaModel: ReturnModelType<typeof RequestArea> = getModelForClass(RequestArea);
