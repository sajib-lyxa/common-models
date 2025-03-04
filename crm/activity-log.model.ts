import { modelOptions, prop, getModelForClass, ReturnModelType, mongoose } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { collection: 'activityLogs' } })
export class ActivityLog extends TimeStamps {
	@prop({ required: true, type: mongoose.Types.ObjectId })
	public admin!: mongoose.Types.ObjectId;
	// public get_admin() // TODO: Implement this method - return the admin object by calling the admin microservice

	@prop({ required: true, type: String })
	public name!: string;

	@prop({ required: true, type: String })
	public activityType!: string;

	@prop({ required: true, type: mongoose.Schema.Types.Mixed })
	public oldDocument!: any;

	@prop({ required: true, type: mongoose.Schema.Types.Mixed })
	public newDocument!: any;
}

export const ActivityLogModel: ReturnModelType<typeof ActivityLog> = getModelForClass(ActivityLog);
