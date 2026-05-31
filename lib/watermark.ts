import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function watermarkPdf(pdfBuffer: Buffer, userEmail: string) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  pages.forEach((page) => {
    const { width } = page.getSize();
    // Adds text at the bottom-center of every page
    page.drawText(`Licensed to: ${userEmail} | Stdyassam.com - Sharing is prohibited`, {
      x: 50,
      y: 20,
      size: 9,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.4,
    });
  });

  return await pdfDoc.save();
}
