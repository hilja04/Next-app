import { deleteCategory} from '../../../lib/db';

export async function DELETE(request, { params }) {
  const { id } = await params; 

  await deleteCategory(id);  
  return new Response(null, { status: 204 }); 
}