export interface IPdfProvider {
  generateFromHtml(html: string): Promise<Buffer>;
}
