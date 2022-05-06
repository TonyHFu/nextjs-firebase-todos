import { collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import React, { useEffect } from "react";

const TodoList = () => {
	const [todos, setTodos] = useState(initialState);

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
