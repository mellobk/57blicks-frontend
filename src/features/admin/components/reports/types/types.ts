/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IReportAverageDays {
	data: never[];
	dataByProduct: any;
	dataByAsset: any;
	loanProductDaysAverage: Array<any>;
	averagePaidLoans: number;
	loansPaidByAsset: Array<{ [key: string]: number }>;
}
