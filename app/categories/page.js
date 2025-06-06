'use client';
import { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography, List, ListItem } from '@mui/material';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/categories');
            const fetchedCategories = await response.json();
            setCategories(fetchedCategories);
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        const response = await fetch('/api/categories', {
            method: 'POST',
            body: JSON.stringify({ name: newCategory }),
            headers: { 'Content-Type': 'application/json' },
        });

        const addedCategory = await response.json();
        setCategories([...categories, addedCategory]);
        setNewCategory('');
    };

    const handleDeleteCategory = async (id) => {
        await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        setCategories(categories.filter((category) => category.id !== id));
    };
    return (
        <Container maxWidth="sm">
            <h1>Categories</h1>
            <TextField sx={{ backgroundColor: "white" }}
                label="New Category"
                variant="outlined"
                fullWidth
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleAddCategory}>
                Add Category
            </Button>

            <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                    Existing Categories
                </Typography>
                <List>
                    {categories.map((category) => (
                        <ListItem key={category.id}>
                            <Typography variant="body1">{category.name}</Typography>
                            <Button
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 10,
                                    transform: 'translateY(-50%)',
                                }}
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteCategory(category.id)}
                            >
                                Delete
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}
