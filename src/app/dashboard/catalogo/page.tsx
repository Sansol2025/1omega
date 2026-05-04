import { db } from "@/lib/db";
import CatalogoClient from "./CatalogoClient";

export const dynamic = 'force-dynamic';

async function getCatalogoData() {
  return await db.career.findMany({
    include: {
      subjects: {
        include: {
          _count: { select: { topics: true } }
        }
      }
    }
  });
}

export default async function CatalogoPage() {
  const careers = await getCatalogoData();

  return <CatalogoClient careers={careers} />;
}
