import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";

const TodoList = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const collectionRef = collection(db, "todos");

		const q = query(collectionRef, orderBy("timestamp", "desc"));

		const unsubscribe = onSnapshot(q, querySnapshot => {
			setTodos(
				querySnapshot.docs.map(doc => ({
					...doc.data(),
					id: doc.id,
					timestamp: doc.data().timestamp?.toDate().getTime(),
				}))
			);
		});

		return unsubscribe;
	}, []);
	return (
		<div>
			{todos.map(todo => (
				<div key={todo.id}>{todo.title}</div>
			))}
		</div>
	);
};

export default TodoList;
