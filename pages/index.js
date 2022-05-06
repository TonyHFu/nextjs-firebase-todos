import { Alert, Container, Snackbar } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";
import styles from "../styles/Home.module.css";
import { TodoContext } from "../TodoContext";

export default function Home() {
	const [open, setOpen] = useState(false);
	const [alertType, setAlertType] = useState("success");
	const [alertMessage, setAlertMessage] = useState("");

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
		<TodoContext.Provider value={{ showAlert }}>
			<Container maxWidth="sm">
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
				<TodoList />
			</Container>
		</TodoContext.Provider>
	);
}
