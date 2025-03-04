import mongoose, { SchemaTypes } from 'mongoose';
import { modelOptions, prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

enum ZoneStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
	BUSY = 'busy',
}

// Define ZoneGeometry class
class ZoneGeometry {
	@prop({ required: true, type: String, enum: ['Polygon'] })
	public type!: string;

	@prop({ required: true, type: () => [[[Number]]] }) // [longitude, latitude]
	public coordinates!: number[][][];
}

@modelOptions({ schemaOptions: { collection: 'zones' } })
export class Zone extends TimeStamps {
	@prop({ required: true, type: String })
	public zoneName!: string;

	@prop({ type: String })
	public zoneArea?: string;

	@prop({ required: true, type: ZoneGeometry })
	public zoneGeometry!: ZoneGeometry;

	@prop({ type: String, enum: ZoneStatus, default: ZoneStatus.ACTIVE })
	public status?: ZoneStatus;

	@prop({ type: String })
	public zoneBusyTitle?: string;

	@prop({ type: String })
	public zoneBusyDescription?: string;

	// Rider reward feature when he reached the target
	@prop({ type: Number, default: 0 })
	public riderWeeklyTarget?: number;

	@prop({ type: Number, default: 0 })
	public riderWeeklyReward?: number;
}

export const ZoneModel: ReturnModelType<typeof Zone> = getModelForClass(Zone);
