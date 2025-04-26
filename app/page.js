import { getTodos } from './lib/db';
import TodoClient from './TodoClient';

export const dynamic = 'force-dynamic'; 

export default async function Page() {
  //SSR
  const todos = await getTodos(); 

  return <TodoClient initialTodos={todos} />;
}
