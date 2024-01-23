/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { authApiClient } from "@/utils/api-client";

export async function signInWithEmailMfa(
	email: string,
	password: string
): Promise<any> {
	const body = {
		email,
		password,
	};
	return authApiClient.post<any>("/auth/login", body);
}

export async function sendMfaCode(email: string, code: string): Promise<any> {
	const body = {
		email,
		code,
	};
	return authApiClient.post<any>("/auth/verify", body);
}
