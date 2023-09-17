import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const iterateChildren = (
  element: HTMLElement | null,
  callback: (child: HTMLElement) => void
) => {
  if (!element) return;
  callback(element);
  if (element.children) {
    for (let i = 0; i < element.children.length; i++) {
      // @ts-ignore
      iterateChildren(element.children[i], callback);
    }
  }
};

export function exportToPdf(filename: string) {
  const element = document.getElementById("assessment");
  iterateChildren(element, (child) => {
    if (child.tagName.toLowerCase() === "button") {
      child.style.display = "none";
    }
    child.style.color = "black";
    child.style.textShadow = "none";
    child.style.fontSize = `12px`;
  });
  html2canvas(element).then((canvas: any) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save(filename + ".pdf");
  });
}
