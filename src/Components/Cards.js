import React, { useState } from "react";
import "./../CSS/Cards.css";
import { useDispatch, useSelector } from "react-redux";
export function Cards({ name, role, email, id }) {
	let dispatch = useDispatch();
	let [edit, onEdit] = useState(false);

	let selected = useSelector((state) => state.selected);

	let [editName, onEditName] = useState(name);
	let [editRole, onEditRole] = useState(role);
	let [editEmail, onEditEmail] = useState(email);

	function onSelect(event) {
		console.log(id);
		dispatch({
			type: "SELECT",
			payload: id,
		});
	}
	function onDel(event) {
		event.stopPropagation();
		console.log("id", id);
		dispatch({
			type: "DELETE",
			payload: id,
		});
	}
	function onChangeName(event) {
		onEditName(event.target.value);
	}
	function onChangeEmail(event) {
		onEditEmail(event.target.value);
	}
	function onChangeRole(event) {
		onEditRole(event.target.value);
	}

	function handleSubmit(event) {
		event.stopPropagation();
		event.preventDefault();
		console.log(editName, editEmail, editRole);
		if (editName !== "" && editEmail !== "" && editRole !== "") {
			dispatch({
				type: "EDIT_FIELD",
				payload: {
					name: editName,
					email: editEmail,
					role: editRole,
					id,
				},
			});
			onEdit(!edit);
		}
	}

	let select
	if(selected.indexOf(id)===-1){
		select=false
	}else{
		select=true
	}

	let field = (
		<div onClick={onSelect} id={id} className={`w-full ${select ? 'bg-white' : 'bg-blue-300' } h-12 leading-12 relative border-blue-50 border-b text-black `}>
			<span className="w-1/6 h-12 text-center inline-block leading-12">{id}</span>
			<span className="w-1/6 h-12 text-center inline-block leading-12">{name}</span>
			<span className="w-1/6 h-12 text-center inline-block leading-12">{email}</span>
			<span className="w-1/6 h-12 text-center inline-block leading-12">{role}</span>
			<span
				className="w-1/6 h-12 text-center inline-block leading-12 bg-red-400 border-blue-50 border hover:bg-red-600 hover:text-blue-50 rounded-md"
				onClick={onDel}
			>
				Delete
			</span>
			<span
				className="w-1/6 h-12 text-center inline-block leading-12 bg-blue-500 border border-blue-50 text-blue-50 rounded-md hover:bg-blue-300 hover:text-black "
				onClick={(event) => {
					onEdit(!edit);
					event.stopPropagation();
				}}
			>
				Edit
			</span>
		</div>
	);
	let editField = (
		<form id={id} onSubmit={handleSubmit} className="w-full bg-blue-300 h-12 leading-12 relative border-blue-50 border-b">
			<span className="w-1/6 h-12 leading-12 text-center inline-block ">{id}</span>
			<input
				type="text"
				name="name"
				placeholder={name}
				className="w-1/6 h-12 leading-12 text-center inline-block "
				value={editName}
				onChange={onChangeName}
			></input>
			<input
				type="text"
				name="email"
				placeholder={email}
				className="w-1/6 h-12 leading-12 text-center inline-block "
				value={editEmail}
				onChange={onChangeEmail}
			></input>
			<input
				type="text"
				name="role"
				placeholder={role}
				className="w-1/6 h-12 leading-12 text-center inline-block "
				value={editRole}
				onChange={onChangeRole}
			></input>
			<input
				type="submit"
				className="w-2/6 h-12 leading-12 text-center inline-block bg-green-300 hover:bg-green-500 hover:text-gray-50 border border-blue-50 rounded-md"
				value="submit"
			></input>
		</form>
	);
	return <div>{edit ? editField : field}</div>;
}
