import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { s3 } from '@/lib/s3';
import { watermarkPdf } from '@/lib/watermark';

export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: { product: true, user: true }
  });

  if (!order || order.status !== 'SUCCESS') {
    return new Response("Invalid Request", { status: 403 });
  }
  
  // 1. Check Expiry (24 Hours)
  if (order.expiresAt && new Date() > order.expiresAt) {
    return new Response("This download link has expired (24h limit reached)", { status: 410 });
  }

  // 2. Check Download Count (3 Times)
  if (order.downloadCount >= 3) {
    return new Response("Download limit reached (Max 3)", { status: 429 });
  }

  // 3. Fetch file from Private S3
  const file = await s3.getObject({ 
    Bucket: process.env.AWS_S3_BUCKET_NAME!, 
    Key: order.product.s3Key 
  }).promise();

  // 4. Apply Dynamic Watermark
  const watermarkedBuffer = await watermarkPdf(file.Body as Buffer, order.user.email);

  // 5. Increment count in DB
  await prisma.order.update({
    where: { id: order.id },
    data: { downloadCount: { increment: 1 } }
  });

  return new Response(watermarkedBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Stdyassam_${order.product.title}.pdf"`,
    },
  });
}
