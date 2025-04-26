
import { deleteTodo } from '../../../lib/db';

export async function DELETE(request, { params }) {
  const { id } = await params; 

  await deleteTodo(id);  
  return new Response(null, { status: 204 }); 
}