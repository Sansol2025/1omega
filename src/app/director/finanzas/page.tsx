import { db } from "@/lib/db";
import FinanzasClient from "./FinanzasClient";

export const dynamic = 'force-dynamic';

async function getFinanceData() {
  const approvedPayments = await db.enrollment.findMany({
    where: { payment_status: 'approved' },
    include: { subject: true, user: true },
    orderBy: { created_at: 'desc' }
  });

  const totalRevenue = approvedPayments.reduce((acc, curr) => acc + (curr.subject.price || 0), 0);
  
  return {
    approvedPayments,
    totalRevenue,
    count: approvedPayments.length
  };
}

export default async function FinanzasPage() {
  const { approvedPayments, totalRevenue, count } = await getFinanceData();

  return (
    <FinanzasClient 
      approvedPayments={approvedPayments} 
      totalRevenue={totalRevenue} 
      count={count} 
    />
  );
}
