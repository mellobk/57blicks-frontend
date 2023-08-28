import type React from "react";
import { createContext, useContext, useState } from "react";
import type {
	CognitoUserSession,
	CognitoUser,
} from "amazon-cognito-identity-js";
import * as Cognito from "@/lib/cognito";

interface AuthContextProps {
	user: CognitoUser | null;
	session: CognitoUserSession | null;
	signInWithEmail: (
		username: string,
		password: string
	) => Promise<CognitoUserSession>;
	signOut: () => void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<CognitoUser | null>(null);
	const [session, setSession] = useState<CognitoUserSession | null>(null);

	const signInWithEmail = async (
		username: string,
		password: string
	): Promise<CognitoUserSession> => {
		const result = await Cognito.signInWithEmail(username, password);
		setUser(Cognito.getCurrentUser());
		setSession(result);
		return result;
	};

	const signOut = (): void => {
		Cognito.signOut();
		setUser(null);
		setSession(null);
	};

	return (
		<AuthContext.Provider value={{ user, session, signInWithEmail, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
