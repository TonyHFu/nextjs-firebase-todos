import { IconButton, ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteDoc, doc } from "firebase/firestore";
import { TodoContext } from "../TodoContext";
import { db } from "../firebase";
import { useRouter } from "next/router";

const Todo = ({ id, timestamp, title, detail }) => {
	const { showAlert, todo, setTodo } = useContext(TodoContext);

	const router = useRouter();
	const deleteTodo = async (id, e) => {
		e.stopPropagation();
		const docRef = doc(db, "todos", id);
		await deleteDoc(docRef);
		showAlert("error", `Todo with id ${id} deleted successfully`);
	};

	const seeMore = (id, e) => {
		e.stopPropagation();
		router.push(`/todos/${id}`);
	};
	return (
		<ListItem
			onClick={() => setTodo({ id, title, detail, timestamp })}
			sx={{ mt: 3, boxShadow: 3 }}
			style={{ backgroundColor: "#FAFAFA" }}
			secondaryAction={
				<>
					<IconButton onClick={e => deleteTodo(id, e)}>
						<DeleteIcon />
					</IconButton>
					<IconButton onClick={e => seeMore(id, e)}>
						<MoreVertIcon />
					</IconButton>
				</>
			}
		>
			<ListItemText
				primary={title}
				secondary={moment(timestamp).format("MMMM do, yyyy")}
			/>
		</ListItem>
	);
};

export default Todo;
