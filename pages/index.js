import { Container } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import TodoList from "../Components/TodoList";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<Container>
			<TodoList />
		</Container>
	);
}
