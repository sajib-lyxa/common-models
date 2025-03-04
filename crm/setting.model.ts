import { modelOptions, prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum WeekDay {
	Sunday = 0,
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6,
}

export enum ValueType {
	PERCENTAGE = 'percentage',
	FIXED = 'fixed',
}

export enum PaymentMethod {
	CASH = 'cash',
	CARD = 'card',
}

export enum WorkStatus {
	OPEN = 'open',
	CLOSED = 'closed',
	FULL_DAY = 'full_day',
}

class DeliveryCharge {
	@prop({ required: true, type: Number })
	public from!: number;

	@prop({ required: true, type: Number })
	public to!: number;

	@prop({ required: true, type: Number })
	public charge!: number;

	@prop({ required: true, type: Number })
	public riderCut!: number;
}

class Currency {
	@prop({ required: true, type: String })
	public symbol!: string;

	@prop({ required: true, type: String })
	public name!: string;

	@prop({ required: true, type: String })
	public symbol_native!: string;

	@prop({ required: true, type: Number })
	public decimal_digits!: number;

	@prop({ required: true, type: Number })
	public rounding!: number;

	@prop({ required: true, type: String })
	public code!: string;

	@prop({ required: true, type: String })
	public name_plural!: string;

	@prop({ required: true, type: String })
	public flag!: string;
}

class ChargeSetting {
	@prop({ type: String, enum: ValueType, default: ValueType.PERCENTAGE })
	public valueType?: ValueType;

	@prop({ type: Number })
	public value?: number;

	@prop({ type: () => [DeliveryCharge], default: [] })
	public deliveryCharges?: DeliveryCharge[];

	@prop({ type: () => [DeliveryCharge], default: [] })
	public deliveryChargesForCourier?: DeliveryCharge[];
}

class ServiceFeeSetting {
	@prop({ type: String, enum: ValueType, default: ValueType.PERCENTAGE })
	public valueType?: ValueType;

	@prop({ type: Number })
	public value: number;
}

class CourierSetting {
	@prop({ type: Number, default: Infinity })
	maxTotalEstItemsPrice?: number;

	@prop({ type: Number })
	maxDistance?: number;
}

class RiderSetting {
	@prop({ type: Number, default: 8 })
	dailyWorkingHours?: number;

	@prop({ type: Number, default: 0 })
	bobCashSettlementLimit?: number;

	@prop({ type: () => [Number], default: [] })
	tips?: number[];

	@prop({ type: () => [String], default: [] })
	equipments?: string[];
}

class BusinessDevelopmentSetting {
	@prop({ type: Number, default: 0 })
	monthlyShopTarget?: number;

	@prop({ type: Number, default: 0 })
	monthlyRewardPrize?: number;
}

class CurrencySetting {
	@prop({ required: true, type: Currency })
	baseCurrency!: Currency;

	@prop({ type: Currency })
	secondaryCurrency?: Currency;

	@prop({ type: Boolean, default: false })
	isDualCurrencyEnabled?: boolean;

	@prop({ type: Number, default: 0 })
	exchangeRate?: number;
}

class PayoutSetting {
	@prop({ required: true, type: Number, enum: WeekDay })
	issuanceDay!: WeekDay;

	@prop({ type: Number, default: 1 })
	overDuePeriods?: number;
}

class StartEndTime {
	@prop({ type: String })
	public start?: string;

	@prop({ type: String })
	public end?: string;
}

class NormalHour {
	@prop({ required: true, unique: true, type: Number, enum: WeekDay })
	public day!: WeekDay;

	@prop({ required: true, type: String, enum: WorkStatus })
	public status!: WorkStatus;

	@prop({ type: () => [StartEndTime], default: [] })
	public openingHours?: StartEndTime[];
}

export type HolidayWorkStatus = Exclude<WorkStatus, WorkStatus.OPEN>;

class HolidayHour {
	@prop({ type: Date })
	public date?: Date;

	@prop({ required: true, type: String, enum: [WorkStatus.CLOSED, WorkStatus.FULL_DAY] })
	public status!: HolidayWorkStatus;

	@prop({ type: StartEndTime })
	public closingHour?: StartEndTime[];
}

export class WrokHourSetting {
	@prop({ type: () => [NormalHour], default: [] })
	public normalHours?: NormalHour[];

	@prop({ type: () => [HolidayHour], default: [] })
	public holidayHours?: HolidayHour[];
}

@modelOptions({ schemaOptions: { collection: 'settings' } })
export class Setting extends TimeStamps {
	@prop({ type: ChargeSetting })
	public chargeSetting?: ChargeSetting;

	@prop({ type: ServiceFeeSetting })
	public serviceFeeSetting?: ServiceFeeSetting;

	@prop({ type: PayoutSetting })
	public payoutSetting?: PayoutSetting;

	@prop({ type: WrokHourSetting })
	public wrokHourSetting?: WrokHourSetting;

	@prop({ type: CourierSetting })
	public courierSetting?: CourierSetting;

	@prop({ type: RiderSetting })
	public riderSetting?: RiderSetting;

	@prop({ type: BusinessDevelopmentSetting })
	public businessDevelopmentSetting?: BusinessDevelopmentSetting;

	@prop({ type: Number, default: 0 })
	public payLimitForUser?: number;

	@prop({ type: Number, default: 0 })
	public vatPercentage?: number;

	@prop({ type: () => [Number], default: [] })
	public riderSearchRanges?: number[];

	@prop({ type: Number })
	public nearByShopDistance?: number;

	@prop({ type: Number })
	public nearByShopDistanceInHomeScreen?: number;

	@prop({ type: () => [String], default: [] })
	public units?: string[];

	@prop({ type: CurrencySetting })
	public currencySetting?: CurrencySetting;

	@prop({ type: () => [String], enum: PaymentMethod, default: [] })
	public paymentMethods?: PaymentMethod[];

	@prop({ type: Boolean, default: false })
	public isGroudOrderEnabled?: boolean;

	@prop({ type: Number })
	public customerSupportPhoneNumber?: number;

	@prop({ type: Date })
	public deletedAt?: Date | null;
}

export const SettingModel: ReturnModelType<typeof Setting> = getModelForClass(Setting);
