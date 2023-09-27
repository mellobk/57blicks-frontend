import { accessToken } from "./../../../utils/constant";
export interface NumberOfLogin {
	logins: string;
	date: string;
}

export interface LastLogin {
	id: string;
	createdAt: string;
	updatedAt: string;
	ipAddress: string;
	entity: string;
	event: string;
}

export interface UserActivity {
	userActivity: Array<unknown>;
	numberOfLogins: Array<NumberOfLogin>;
	lastLogin: LastLogin;
}

export enum LogTable {
	USER = "user",
}

export enum LogAction {
	USER_LOGIN = "user:login",
	USER_LOGOUT = "user:logout",
}

export interface Log {
	event: LogAction;
	entity: LogTable;
}

export interface LogLoign {
	event: LogAction;
	entity: LogTable;
	accessToken: string;
}
