import { getCategories, insertCategory } from '../../lib/db';

export async function GET() {
  const categories = await getCategories();
  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  const body = await request.json();
  const { name } = body;
  const newCategory = await insertCategory(name);
  return new Response(JSON.stringify(newCategory), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
