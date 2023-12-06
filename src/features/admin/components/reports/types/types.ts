/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IReportAverageDays {
	loanProductDaysAverage: Array<any>;
	averagePaidLoans: number;
	loansPaidByAsset: Array<{ [key: string]: number }>;
}
