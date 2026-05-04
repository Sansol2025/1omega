import { db } from "@/lib/db";
import { createUser, deleteUser } from "../actions";
import UsuariosClient from "./UsuariosClient";

export const dynamic = 'force-dynamic';

async function getUsers() {
  return await db.user.findMany({
    orderBy: { created_at: "desc" },
  });
}

export default async function UsuariosPage() {
  const users = await getUsers();

  return (
    <UsuariosClient 
      users={users} 
      createUser={createUser} 
      deleteUser={deleteUser} 
    />
  );
}
