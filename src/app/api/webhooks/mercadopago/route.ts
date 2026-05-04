import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // MercadoPago envía el ID del payment originario en los query params ?data.id=XXX o en el body
    const url = new URL(request.url);
    const paymentIdStr = url.searchParams.get('data.id') || url.searchParams.get('id');

    if (!paymentIdStr) {
      return NextResponse.json({ status: 'ignored' });
    }

    const paymentId = parseInt(paymentIdStr, 10);

    // 1. Inicializar MP
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
    const paymentApi = new Payment(client);

    // 2. Consultar detalles del pago para comprobar su estado de fuente segura
    const paymentInfo = await paymentApi.get({ id: paymentId });

    if (paymentInfo.status === 'approved') {
      // 3. Extraer user_id y course_id del external_reference guardado en la preferencia
      const externalRef = paymentInfo.external_reference;
      if (externalRef) {
        const [userId, subjectId] = externalRef.split('_');

        // 4. Actualizar tabla Enrollment en Prisma
        await db.enrollment.upsert({
          where: {
            user_id_subject_id: { user_id: userId, subject_id: subjectId }
          },
          update: {
            payment_status: 'approved',
            mercadopago_payment_id: paymentIdStr
          },
          create: {
            user_id: userId,
            subject_id: subjectId,
            payment_status: 'approved',
            mercadopago_payment_id: paymentIdStr
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    // Retornamos error pero usualmente deberías retornar 200 si los errores son no-recuperables
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
