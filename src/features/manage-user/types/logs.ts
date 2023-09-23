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
