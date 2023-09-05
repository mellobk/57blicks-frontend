/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unicorn/prevent-abbreviations */
type ApiConfig = {
	ENDPOINT: string;
};

export type CognitoConfig = {
	REGION: string;
	USER_POOL_ID: string;
	APP_CLIENT_ID: string;
};

export type AppConfig = {
	api: ApiConfig;
	cognito: CognitoConfig;
	MAX_ATTACHMENT_SIZE?: number;
};

const local: AppConfig = {
	api: {
		ENDPOINT: "http://localhost:3000",
	},
	cognito: {
		REGION: "us-east-1",
		USER_POOL_ID: "us-east-1_LDY3n6kau",
		APP_CLIENT_ID: "5m24a4n8i13jo7avvan25dtcvc",
	},
};

const development: AppConfig = {
	api: {
		ENDPOINT: "https://api.dev.dkclending.com/",
	},
	cognito: {
		REGION: "us-east-1",
		USER_POOL_ID: "us-east-1_LDY3n6kau",
		APP_CLIENT_ID: "5m24a4n8i13jo7avvan25dtcvc",
	},
};

const stage: AppConfig = {
	api: {
		ENDPOINT: "https://api.test.dkclending.com/",
	},
	cognito: {
		REGION: "us-east-1",
		USER_POOL_ID: "us-east-1_LDY3n6kau",
		APP_CLIENT_ID: "5m24a4n8i13jo7avvan25dtcvc",
	},
};

const production: AppConfig = {
	api: {
		ENDPOINT: "https://api.dkclending.com/",
	},
	cognito: {
		REGION: "us-east-1",
		USER_POOL_ID: "us-east-1_LDY3n6kau",
		APP_CLIENT_ID: "5m24a4n8i13jo7avvan25dtcvc",
	},
};

const config: AppConfig =
	import.meta.env["VITE_APP_STAGE"] === "prod"
		? production
		: import.meta.env["VITE_APP_STAGE"] === "test"
		? stage
		: import.meta.env["VITE_APP_STAGE"] === "dev"
		? development
		: local;

const sharedObject: AppConfig = {
	...config,
};
export default sharedObject;
