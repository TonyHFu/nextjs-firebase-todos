import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth.js";
import { db } from "../firebase.js";
import Todo from "./Todo.js";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const { currentUser } = useAuth();
	useEffect(() => {
		const collectionRef = collection(db, "todos");

		const q = query(
			collectionRef,
			where("email", "==", currentUser.email),
			orderBy("timestamp", "desc")
		);

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
				<Todo
					key={todo.id}
					id={todo.id}
					title={todo.title}
					detail={todo.detail}
					timestamp={todo.timestamp}
				/>
			))}
		</div>
	);
};

export default TodoList;
