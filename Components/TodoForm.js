import { Button, TextField } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { TodoContext } from "../TodoContext";

const TodoForm = () => {
	const [todo, setTodo] = useState({ title: "", detail: "" });
	const { showAlert } = useContext(TodoContext);
	const onSubmit = async () => {
		const collectionRef = collection(db, "todos");
		const docRef = await addDoc(collectionRef, {
			...todo,
			timestamp: serverTimestamp(),
		});
		setTodo({ title: "", detail: "" });
		showAlert("success", `Todo with id ${docRef.id} is added successfully`);
	};

	return (
		<div>
			<TextField
				fullWidth
				label="title"
				margin="normal"
				value={todo.title}
				onChange={e => setTodo(prev => ({ ...prev, title: e.target.value }))}
			/>
			<TextField
				fullWidth
				label="detail"
				multiline
				maxRows={4}
				value={todo.detail}
				onChange={e => setTodo(prev => ({ ...prev, detail: e.target.value }))}
			/>
			<Button variant="contained" sx={{ mt: 3 }} onClick={onSubmit}>
				Add a new todo
			</Button>
		</div>
	);
};

export default TodoForm;