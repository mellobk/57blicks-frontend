export interface AxisConfig {
	x: number | string | Date;
	y: number | string | Date;
}

export interface AxisChart {
	id: string;
	data: Array<AxisConfig>;
}

export interface DataEntry {
	minutes?: number | string;
	hour: number;
	date: string;
	fullDate: string;
}
