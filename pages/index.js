import { Container } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<Container maxWidth="sm">
			<TodoForm />
			<TodoList />
		</Container>
	);
}
