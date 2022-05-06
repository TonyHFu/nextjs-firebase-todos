import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Login from "./Components/Login";
import Loading from "./Components/Loading";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const auth = getAuth();
		return auth.onIdTokenChanged(async user => {
			if (!user) {
				console.log("no user");
				setCurrentUser(null);
				setLoading(false);
				return;
			}
			const token = await user.getIdToken();
			setCurrentUser(user);
			setLoading(false);
			console.log("token", token);
			console.log("user", user);
		});
	}, []);

	if (loading) {
		return <Loading type="spin" color="green" />;
	}
	if (!currentUser) {
		return <Login />;
	}
	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
