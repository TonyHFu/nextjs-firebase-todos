import {
	Alert,
	Avatar,
	Container,
	Snackbar,
	Typography,
	Box,
	IconButton,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Loading from "../Components/Loading";
import Login from "../Components/Login";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";
import styles from "../styles/Home.module.css";
import { TodoContext } from "../TodoContext";
import { useAuth } from "../Auth";
import { auth, db } from "../firebase";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export default function Home({ todosProps }) {
	const { currentUser } = useAuth();
	const [open, setOpen] = useState(false);
	const [alertType, setAlertType] = useState("success");
	const [alertMessage, setAlertMessage] = useState("");
	const [todo, setTodo] = useState({ title: "", detail: "" });

	const showAlert = (type, message) => {
		setAlertType(type);
		setAlertMessage(message);
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	return (
		<TodoContext.Provider value={{ showAlert, todo, setTodo }}>
			<Container maxWidth="sm">
				<Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
					<IconButton onClick={() => auth.signOut()}>
						<Avatar src={currentUser.photoURL} />
					</IconButton>
					<Typography variant="h5">{currentUser.displayName}</Typography>
				</Box>
				<TodoForm />
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				>
					<Alert
						onClose={handleClose}
						severity={alertType}
						sx={{ width: "100%" }}
					>
						{alertMessage}
					</Alert>
				</Snackbar>
				<TodoList todosProps={todosProps} />
			</Container>
		</TodoContext.Provider>
	);
}

export async function getServerSideProps(context) {
	try {
		const cookies = nookies.get(context);
		const token = await verifyIdToken(cookies.token);
		const { email } = token;
		const collectionRef = collection(db, "todos");
		const q = query(
			collectionRef,
			where("email", "==", email),
			orderBy("timestamp", "desc")
		);
		const querySnapshot = await getDocs(q);
		let todos = [];
		querySnapshot.forEach(doc => {
			todos.push({
				...doc.data(),
				id: doc.id,
				timestamp: doc.data().timestamp.toDate().getTime(),
			});
		});
		return {
			props: {
				todosProps: JSON.stringify(todos) || [],
			},
		};
	} catch (error) {
		console.log(error);
		return { props: {} };
	}
}
