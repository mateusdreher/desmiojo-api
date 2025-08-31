import puppeteer from "puppeteer";
import { IPdfProvider } from "../../application/interfaces/pdf-provider.interface";

export class PuppeteerPdfProvider implements IPdfProvider {
  async generateFromHtml(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
  }
}
