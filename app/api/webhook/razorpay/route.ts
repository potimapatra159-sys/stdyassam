import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const order_id = body.payload.payment.entity.notes.db_order_id;

  // 1. Update Order in Database
  const order = await prisma.order.update({
    where: { id: order_id },
    data: { 
        status: 'SUCCESS',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) 
    },
    include: { user: true, product: true }
  });

  // 2. Send Email with Link
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: '"Stdyassam Support" <no-reply@stdyassam.com>',
    to: order.user.email,
    subject: `Your PDF is ready: ${order.product.title}`,
    html: `
      <h2>Payment Successful!</h2>
      <p>You can now download your file from your Stdyassam Library.</p>
      <a href="https://stdyassam.com/api/download/${order.id}">Click here to download your PDF</a>
      <p>This link will expire in 24 hours or after 3 downloads.</p>
    `
  });

  return NextResponse.json({ status: 'ok' });
}
