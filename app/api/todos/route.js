import { getTodos, insertTodo } from '../../lib/db';

export async function GET() {
  const todos = await getTodos();
  return new Response(JSON.stringify(todos), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const body = await request.json();
  const { text, date, categoryId } = body;
  const todoAdded = await insertTodo(text, date, categoryId);

  return new Response(JSON.stringify(todoAdded), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
