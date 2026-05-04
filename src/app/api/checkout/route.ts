import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { db } from '@/lib/db';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { subject_id } = body;

    // 1. Obtener materia de Prisma
    const subject = await db.subject.findUnique({ where: { id: subject_id } });
    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    // 2. Inicializar MercadoPago
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN!, options: { timeout: 5000 } });
    const preference = new Preference(client);

    // 3. Crear preferencia
    const prefResult = await preference.create({
      body: {
        items: [
          {
            id: subject.id,
            title: subject.title,
            quantity: 1,
            unit_price: subject.price,
            currency_id: 'ARS'
          }
        ],
        payer: {
          email: user.email,
        },
        external_reference: `${user.id}_${subject.id}`, // Usado para identificar pago en el webhook
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/catalogo?status=success`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/catalogo?status=failure`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/catalogo?status=pending`,
        },
        auto_return: 'approved',
      }
    });

    return NextResponse.json({ init_point: prefResult.init_point });
  } catch (error) {
    console.error('MercadoPago Checkout Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
