
'use client';

import { useEffect, useState } from 'react';
import {
  TextField, Button, Box, Card, CardContent, Typography, Container, Select, MenuItem, InputLabel, FormControl,
} from '@mui/material';

export default function TodoClient({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const categories = await response.json();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const handleAddTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text: newTodo, date, categoryId: selectedCategory }),
      headers: { 'Content-Type': 'application/json' },
    });

    const addedTodo = await response.json();
    setTodos([...todos, addedTodo]);
    setNewTodo('');
    setDate('');
    setSelectedCategory('');
  };

  const handleDeleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="sm">
      <h1>Todo App</h1>
      <TextField sx={{backgroundColor:"white"}}
        label="Add a new todo"
        variant="outlined"
        fullWidth
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <TextField sx={{backgroundColor:"white"}}
        label="Date"
        type="date"
        variant="outlined"
        fullWidth
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: '16px' }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl fullWidth style={{ marginBottom: '16px',backgroundColor:"white" }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" fullWidth onClick={handleAddTodo}>
        Add Todo
      </Button>

      <Box mt={2} sx={{ height: 600, overflowY: 'auto' }}>
        {todos.map((todo) => (
          <Card key={todo.id} sx={{ mb: 2, position: 'relative', p: 2 }}>
            <CardContent>
              <Typography variant="h6">{todo.text}</Typography>
              <Typography variant="body2" >
                Category: {todo.category}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {todo.date}
              </Typography>
              <Button
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 10,
                  transform: 'translateY(-50%)',
                }}
                variant="outlined"
                color="error"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}