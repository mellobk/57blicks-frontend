/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type React from "react";
import {
	createContext,
	type FC,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import type {
	CognitoUser,
	CognitoUserSession,
} from "amazon-cognito-identity-js";
import * as Cognito from "@/lib/cognito";
import * as Auth from "@/lib/mfa-login";
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
	signInWithEmailMfa: (username: string, code: string) => Promise<boolean>;
	sendMfaCode: (username: string, code: string) => Promise<boolean>;
	signOut: () => void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const errorMessage = useStore((state) => state.errorMessage);
	const successMessage = useStore((state) => state.successMessage);
	const clearErrorMessage = useStore((state) => state.clearErrorMessage);
	const clearSuccessMessage = useStore((state) => state.clearSuccessMessage);
	const toast = useRef(null) || <div></div>;
	const [user, setUser] = useState<CognitoUser | null>(null);
	const [session, setSession] = useState<CognitoUserSession | null>(null);

	const signInWithEmailMfa = async (
		username: string,
		password: string
	): Promise<boolean> => {
		const result = await Auth.signInWithEmailMfa(username, password);
		return result.data;
	};

	const sendMfaCode = async (
		username: string,
		code: string
	): Promise<boolean> => {
		const result = await Auth.sendMfaCode(username, code);
		return result.data;
	};

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
		if (successMessage && toast?.current) {
			(toast?.current as any)?.show({
				severity: "success",
				summary: "Success",
				detail: successMessage,
				life: 3000,
			});
			clearErrorMessage();
		}
	}, [successMessage]);

	useEffect(() => {
		if (errorMessage && toast?.current) {
			(toast?.current as any)?.show({
				severity: "error",
				summary: "Error",
				detail: errorMessage,
				life: 3000,
			});
		}
		clearSuccessMessage();
	}, [errorMessage]);

	return (
		<>
			<Toast ref={toast} />
			<AuthContext.Provider
				value={{
					user,
					session,
					signInWithEmail,
					signOut,
					signInWithEmailMfa,
					sendMfaCode,
				}}
			>
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
