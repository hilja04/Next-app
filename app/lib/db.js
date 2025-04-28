
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

let db; 

export async function openDb() {
  if (!db) {
    db = await open({
      filename: './todos.db',
      driver: sqlite3.Database,
    });
    await setupDb(); 
  }
  return db;
}

// Setup the database and ensure tables exist
export async function setupDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      date TEXT NOT NULL,
      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);
}

// Insert a new todo 
export async function insertTodo(text, date, categoryId) {
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO todos (text, date, category_id) VALUES (?, ?, ?)',
    [text, date, categoryId]
  );

  
  const insertedTodo = await db.get(`
    SELECT 
      todos.id,
      todos.text,
      todos.date,
      categories.name AS category
    FROM todos
    LEFT JOIN categories ON todos.category_id = categories.id
    WHERE todos.id = ?
  `, [result.lastID]);

  return insertedTodo;  
}

//Fetch all todos with category name
export async function getTodos() {
  const db = await openDb();
  return await db.all(`
    SELECT 
      todos.id, 
      todos.text, 
      todos.date, 
      categories.name AS category
    FROM todos
    LEFT JOIN categories ON todos.category_id = categories.id
  `);
}
// Delete a todo by ID
export async function deleteTodo(id) {
  const db = await openDb();
  await db.run('DELETE FROM todos WHERE id = ?', [id]);
}

// Insert a new category
export async function insertCategory(name) {
  const db = await openDb();
  const result = await db.run('INSERT INTO categories (name) VALUES (?)', [name]);
  return { id: result.lastID, name };
}

// Fetch all categories
export async function getCategories() {
  const db = await openDb();
  return await db.all('SELECT * FROM categories');
}
export async function deleteCategory(id) {
  const db = await openDb();
  await db.run('DELETE FROM categories WHERE id = ?', [id]);
}
