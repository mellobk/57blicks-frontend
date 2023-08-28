import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from "@/config";
import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserAttribute,
	CognitoUserPool,
	type ISignUpResult,
	type CognitoUserSession,
	type ICognitoUserAttributeData,
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

function getCognitoUser(username: string): CognitoUser {
	const userData = {
		Username: username,
		Pool: userPool,
	};
	const cognitoUser = new CognitoUser(userData);

	return cognitoUser;
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
	password: string
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
				reject(error);
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
	const cognitoUser = getCognitoUser(username);

	return new Promise((resolve, reject) => {
		cognitoUser.forgotPassword({
			onSuccess: (passwordResetResult) => {
				resolve(passwordResetResult);
			},
			onFailure: (error) => {
				reject(error);
			},
		});
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
				reject(error);
			},
		});
	});
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
