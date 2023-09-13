/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type {
	CognitoUserSession,
	CognitoUser,
} from "amazon-cognito-identity-js";
import * as Cognito from "@/lib/cognito";
import { Toast } from "primereact/toast";
import useStore from "@/stores/app-store";

interface AuthContextProps {
	user: CognitoUser | null;
	session: CognitoUserSession | null;
	signInWithEmail: (
		username: string,
		password: string,
		code: string
	) => Promise<CognitoUserSession>;
	signOut: () => void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const errorMessage = useStore((state) => state.errorMessage);
	const clearErrorMessage = useStore((state) => state.clearErrorMessage);
	const toast = useRef(null) || <div></div>;
	const [user, setUser] = useState<CognitoUser | null>(null);
	const [session, setSession] = useState<CognitoUserSession | null>(null);

	const signInWithEmail = async (
		username: string,
		password: string,
		code: string
	): Promise<CognitoUserSession> => {
		const result = await Cognito.signInWithEmail(username, password, code);
		setUser(Cognito.getCurrentUser());
		setSession(result);
		return result;
	};

	const signOut = (): void => {
		Cognito.signOut();
		setUser(null);
		setSession(null);
	};

	useEffect(() => {
		if (errorMessage && toast?.current) {
			(toast?.current as any)?.show({
				severity: "error",
				summary: "Error",
				detail: errorMessage,
				life: 3000,
			});
			clearErrorMessage();
		}
	}, [errorMessage]);

	return (
		<>
			<Toast ref={toast} />
			<AuthContext.Provider value={{ user, session, signInWithEmail, signOut }}>
				{children}
			</AuthContext.Provider>
		</>
	);
};

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
