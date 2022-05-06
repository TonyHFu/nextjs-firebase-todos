import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Login from "./Components/Login";
import Loading from "./Components/Loading";
import nookies from "nookies";

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
				nookies.set(undefined, " ", token, {});
				return;
			}
			const token = await user.getIdToken();
			setCurrentUser(user);
			setLoading(false);
			nookies.set(undefined, "token", token, {});

			// console.log("token", token);
			// console.log("user", user);
		});
	}, []);

	if (loading) {
		return <Loading type="spin" color="green" />;
	}
	if (!currentUser) {
		return <Login />;
	}
	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
