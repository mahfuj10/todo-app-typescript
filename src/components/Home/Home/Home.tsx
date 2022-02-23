import { Button, Container, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useCallback, useReducer, useRef } from 'react'
import { Box } from '@mui/system';

const Home = () => {

    interface Todos {
        id: number,
        text: string
    };

    type ActionType = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number }

    function reducer(state: Todos[], action: ActionType) {
        switch (action.type) {
            case 'ADD':
                return [...state, { text: action.text, id: state.length }]

            case 'REMOVE':
                return state.filter(({ id }) => id !== action.id)
        }
    }


    const [todos, dispatch] = useReducer(reducer, [])

    const newTodoRef = useRef<HTMLInputElement>(null);

    const onAddTodo = useCallback(() => {
        if (newTodoRef.current) {
            dispatch({ type: 'ADD', text: newTodoRef.current.value })
            newTodoRef.current.value = '';
        }
    }, [])
    console.log(Object.values(todos))

    //  JSON.parse(localStorage.getItem("todos"));
    localStorage.setItem("todos", JSON.stringify(Object.values(todos)));

    return (

        <Container>


            <Box sx={{ mt: 2 }}>

                <input style={{ padding: 9 }} ref={newTodoRef} type="text" />

                <Button sx={{ boxShadow: 0, borderRadius: 0 }} onClick={onAddTodo} variant='contained'><AddIcon /></Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
                {
                    todos.map(todo => <Paper elevation={2} sx={{ width: 'auto', p: 2, display: 'flex', justifyContent: 'space-between', gap: 4 }}>

                        <Typography variant='h6'> {todo.text}</Typography>

                        <Button
                            onClick={() => dispatch({ type: 'REMOVE', id: todo.id })}
                            variant='contained'
                        >
                            <DeleteOutlineIcon />
                        </Button>

                    </Paper>)
                }
            </Box>



        </Container >
    )
}

export default Home