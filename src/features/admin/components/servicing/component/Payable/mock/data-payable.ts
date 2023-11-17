import { PayableStatus, type Payable } from "../types";
import moment from "moment";

export const initialPayable: Array<Payable> = [
	{
		id: "5d0e3691-ceac-4613-92c7-c92b9ee2629f",
		date: moment("2023-11-20 00:00:00").toDate(),
		month: moment("2023-11-20").toDate(),
		amount: 395,
		amountPaid: 0,
		status: PayableStatus.PAID,
	},
	{
		id: "b49cca8c-9df3-4c92-8032-8994bf888441",

		date: moment("2023-12-20 00:00:00").toDate(),
		month: moment("2023-12-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PAID,
	},
	{
		id: "33d441cd-cb43-4616-84e9-686ba34b6b04",

		date: moment("2024-01-20 00:00:00").toDate(),
		month: moment("2024-01-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PAID,
	},
	{
		id: "1589a7b8-ffc1-4ace-961d-8af2643ed4ec",

		date: moment("2024-02-20 00:00:00").toDate(),
		month: moment("2024-02-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PENDING,
	},
	{
		id: "04babe89-879a-495e-b1e9-bb578feb143f",

		date: moment("2024-03-20 00:00:00").toDate(),
		month: moment("2024-03-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PENDING,
	},
	{
		id: "0542344f-d3cb-468c-a842-1570ef88db48",

		date: moment("2024-04-20 00:00:00").toDate(),
		month: moment("2024-04-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PENDING,
	},
	{
		id: "d9dd720c-fe99-44f2-9792-9f16053d846f",

		date: moment("2024-05-20 00:00:00").toDate(),
		month: moment("2024-05-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PENDING,
	},
	{
		id: "b85a8244-8224-4906-a4ab-c8bd4ed7e6fc",

		date: moment("2024-06-20 00:00:00").toDate(),
		month: moment("2024-06-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PENDING,
	},
	{
		id: "08caaed1-04cd-46cb-9b59-e0a5fb89f392",

		date: moment("2024-07-20 00:00:00").toDate(),
		month: moment("2024-07-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PENDING,
	},
	{
		id: "dda89538-b2cf-45cd-9e10-e6e4f1548b3a",

		date: moment("2024-08-20 00:00:00").toDate(),
		month: moment("2024-08-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PENDING,
	},
	{
		id: "2fa585e2-f557-4605-8261-7bec3279c204",

		date: moment("2024-09-20 00:00:00").toDate(),
		month: moment("2024-09-20").toDate(),
		amount: 1200,
		amountPaid: 0,
		status: PayableStatus.PENDING,
	},
	{
		id: "42246bd0-9302-4391-9c2a-546e253602a8",

		date: moment("2024-10-20 00:00:00").toDate(),
		month: moment("2024-10-20").toDate(),
		amount: 789,
		amountPaid: 0,
		status: PayableStatus.PENDING,
	},
];
