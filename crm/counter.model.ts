import { getModelForClass, modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum CounterName {
	ORDER = 'order',
	CRM_NUMBER = 'crm_number',
	shop = 'shop',
}

@modelOptions({ schemaOptions: { collection: 'counters' } })
export class Counter extends TimeStamps {
	@prop({ required: true, unique: true, type: String, enum: CounterName })
	public name!: CounterName;

	@prop({ required: true, default: 0 })
	public value!: number;
}

export const CounterModel: ReturnModelType<typeof Counter> = getModelForClass(Counter);
