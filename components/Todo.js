import React, { useState } from 'react'
import Image from 'next/image'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'
import TodoItem from './TodoItem'

const useStyles = makeStyles((theme) => ({
	todo: {
		maxWidth: 600,
		margin: 'auto',
		marginTop: 40,
		textAlign: 'center',
	},
	des: {
		margin: 20,
		fontSize: 18,
	},
	logo: {
		left: 'unset !important'
	},
	srOnly: {
		width: 0,
		height: 0,
		position: 'absolute',
		left: '-9999px',
		overflow: 'hidden',
	},
	paper: {
		width: '100%',
	},
	form: {
		padding: theme.spacing(2),
	},
	butttt: {
		margin: 20,
		marginBottom: 40,
		fontSize:20
	},
	list: {
		listStyle: 'none',
		padding: 0,
		marginBottom: 0,
		borderRadius: '0 0 4px 4px',
	},
}))

const Todo = () => {
	const classes = useStyles()
	const initialState = [
		{
			id: 'vnode',
			text: 'A simple initial todo',
			completed: false,
		},
	]
	const [todos, setTodos] = useState(initialState)
	const [text, setText] = useState('')

	const addTodo = (text) => {
		const todo = {
			id: Math.random().toString(36).substring(2),
			text,
			completed: false,
		}
		setTodos([...todos, todo])
	}

	const removeTodo = (todo) => {
		const filteredTodos = todos.filter((v) => v !== todo)
		setTodos(filteredTodos)
	}

	const updateTodo = (todo) => {
		const updatedTodos = todos.map((v) => (v.id === todo.id ? todo : v))
		setTodos(updatedTodos)
	}

	const completedTodos = todos.filter((todo) => todo.completed)

	const handleAddTodo = (e) => {
		e.preventDefault()
		const trimmedText = text.trim()

		trimmedText && addTodo(trimmedText)
		setText('')
	}

	const handleTextChange = (e) => {
		setText(e.target.value)
	}

	return (
		<Grid
			container
			className={classes.todo}
			justify="center"
			direction="column"
		>
			<header>
				<h1>RemoteCoco blocking wait bug repro</h1>
				<div className={classes.des}>This is a test app. It will use window.open API to open a new window. Not everytime call window.open can repro this bug. But the URL I'm using in this demo app can always repro.</div>
				<Button className={classes.butttt} variant="contained" color="primary" onClick={()=>window.open('https://my.app.domain/route.to/something', null, 'width=600,height=400')}>Click to open window and repro the bug</Button>
				{/* <Image
					className={classes.logo}
					src="/static/img/splashscreen-icon-384x384.png"
					alt=""
					width="192"
					height="192"
				/> */}
				<h1 className={classes.srOnly}> Todo App </h1>
			</header>
			<Paper className={classes.paper} elevation={3}>
				<form onSubmit={handleAddTodo} className={classes.form}>
					<TextField
						fullWidth
						value={text}
						margin="normal"
						label="What must be done?"
						onChange={handleTextChange}
						inputProps={{ 'aria-label': 'What must be done?' }}
					/>
					<button className={classes.srOnly}> Submit Todo </button>
					{!!todos.length && (
						<Grid container justify="space-between">
							<Grid item>Total: {todos.length}</Grid>
							<Grid item>Completed: {completedTodos.length}</Grid>
						</Grid>
					)}
				</form>
				<ul className={classes.list}>
					{todos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							updateTodo={updateTodo}
							removeTodo={removeTodo}
						/>
					))}
				</ul>
			</Paper>
		</Grid>
	)
}

export default Todo;
