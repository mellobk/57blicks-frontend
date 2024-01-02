/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from "@/config";
import { accessToken } from "@/utils/constant";
import { sendToLocalStorage } from "@/utils/local-storage";
import {
	AuthenticationDetails,
	CognitoRefreshToken,
	CognitoUser,
	CognitoUserAttribute,
	CognitoUserPool,
	type CognitoUserSession,
	type ICognitoUserAttributeData,
	type ISignUpResult,
} from "amazon-cognito-identity-js";

const poolData = {
	UserPoolId: COGNITO_USER_POOL_ID,
	ClientId: COGNITO_CLIENT_ID,
};

const userPool: CognitoUserPool = new CognitoUserPool(poolData);

let currentUser: CognitoUser | null = userPool.getCurrentUser();

export function getCurrentUser(): CognitoUser | null {
	return currentUser;
}

export function getCognitoUser(username: string): CognitoUser {
	const userData = {
		Username: username,
		Pool: userPool,
	};

	return new CognitoUser(userData);
}

export async function getSession(): Promise<CognitoUserSession> {
	if (!currentUser) {
		currentUser = userPool.getCurrentUser();
	}

	return new Promise((resolve, reject) => {
		currentUser?.getSession(
			(error: Error | null, sessionResult: CognitoUserSession | null) => {
				if (error) {
					reject(error);
				} else if (sessionResult) {
					resolve(sessionResult);
				} else {
					reject(new Error("No session and no error received from Cognito."));
				}
			}
		);
	});
}

export async function signUpUserWithEmail(
	username: string,
	email: string,
	password: string
): Promise<ISignUpResult | undefined> {
	return new Promise((resolve, reject) => {
		const attributeData: ICognitoUserAttributeData = {
			Name: "email",
			Value: email,
		};

		const attributeList = [new CognitoUserAttribute(attributeData)];

		userPool.signUp(
			username,
			password,
			attributeList,
			[],
			(error, signUpResult) => {
				if (error) {
					reject(error);
				} else {
					resolve(signUpResult);
				}
			}
		);
	});
}

export async function verifyCodeValidation(
	username: string,
	code: string
): Promise<unknown> {
	const cognitoUser = getCognitoUser(username);

	return new Promise((resolve, reject) => {
		cognitoUser.confirmRegistration(code, true, (error, confirmationResult) => {
			if (error) {
				reject(error);
			} else {
				resolve(confirmationResult);
			}
		});
	});
}

export async function verifyCode(
	username: string,
	code: string
): Promise<unknown> {
	const cognitoUser = getCognitoUser(username);

	return new Promise((resolve, reject) => {
		cognitoUser.confirmRegistration(code, true, (error, confirmationResult) => {
			if (error) {
				reject(error);
			} else {
				resolve(confirmationResult);
			}
		});
	});
}

export async function signInWithEmail(
	username: string,
	password: string,
	code: string
): Promise<CognitoUserSession> {
	return new Promise((resolve, reject) => {
		const authenticationData = {
			Username: username,
			Password: password,
		};
		const authenticationDetails = new AuthenticationDetails(authenticationData);

		const cognitoUser = getCognitoUser(username);
		currentUser = cognitoUser;

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: (signInResult) => {
				resolve(signInResult);
			},
			onFailure: (error) => {
				console.log(error);
				reject(error);
			},
			mfaSetup: () => {
				if (code) {
					cognitoUser.sendMFACode(code, {
						onSuccess: (result) => {
							resolve(result);
						},
						onFailure: (error) => {
							console.log(error);
							reject(error);
						},
					});
				} else {
					console.log("falta codigo");
					resolve({ isValid: () => true } as CognitoUserSession);
					return;
				}
			},
		});
	});
}

export function signOut(): void {
	currentUser?.signOut();
}

export async function getAttributes(): Promise<unknown> {
	return new Promise((resolve, reject) => {
		currentUser?.getUserAttributes((error, attributesList) => {
			if (error) {
				reject(error);
			} else {
				resolve(attributesList);
			}
		});
	});
}

export async function setAttribute(
	attribute: ICognitoUserAttributeData
): Promise<unknown> {
	return new Promise((resolve, reject) => {
		const userAttribute = new CognitoUserAttribute(attribute);

		currentUser?.updateAttributes([userAttribute], (error, updateResult) => {
			if (error) {
				reject(error);
			} else {
				resolve(updateResult);
			}
		});
	});
}

export async function sendCode(username: string): Promise<unknown> {
	return new Promise(function (resolve, reject) {
		const cognitoUser = getCognitoUser(username);

		if (!cognitoUser) {
			reject(`could not find ${username}`);
			return;
		}

		cognitoUser.forgotPassword({
			onSuccess: function (result) {
				resolve(result);
			},
			onFailure: function (error) {
				reject(error.message);
			},
		});
	}).catch((error) => {
		throw error;
	});
}

export async function forgotPassword(
	username: string,
	code: string,
	password: string
): Promise<string> {
	const cognitoUser = getCognitoUser(username);

	return new Promise((resolve, reject) => {
		cognitoUser.confirmPassword(code, password, {
			onSuccess: () => {
				resolve("password updated");
			},
			onFailure: (error) => {
				reject(error.message);
			},
		});
	});
}

export async function getRefreshToken(username: string): Promise<any> {
	const cognitoUser = getCognitoUser(username);

	const session = await getSession();
	const refreshToken = session.getRefreshToken().getToken();
	cognitoUser.refreshSession(
		new CognitoRefreshToken({ RefreshToken: refreshToken }),
		(refreshError, newSession) => {
			if (refreshError) {
				console.error(refreshError);
				// Handle refresh error
			} else {
				// Session refreshed successfully
				const newAccessToken = newSession.getAccessToken().getJwtToken();

				sendToLocalStorage(accessToken, newAccessToken);
				// Use the new tokens as needed
			}
		}
	);
}

export async function changePassword(
	oldPassword: string,
	newPassword: string
): Promise<string | undefined> {
	return new Promise((resolve, reject) => {
		currentUser?.changePassword(
			oldPassword,
			newPassword,
			(error, changeResult) => {
				if (error) {
					reject(error);
				} else {
					resolve(changeResult);
				}
			}
		);
	});
}
