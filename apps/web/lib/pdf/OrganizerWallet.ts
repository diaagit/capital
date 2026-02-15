import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateWalletPDF = (data: any) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Organizer Wallet Summary", 14, 20);

  doc.setFontSize(12);
  doc.text(`Balance: ₹${data.wallet.balance}`, 14, 35);
  doc.text(`Currency: ${data.wallet.currency}`, 14, 42);
  doc.text(`Status: ${data.wallet.status}`, 14, 49);

  doc.text("Summary", 14, 65);

  autoTable(doc, {
    startY: 70,
    head: [["Metric", "Value"]],
    body: [
      ["Total Earnings", `₹${data.summary.totalEarnings}`],
      ["Total Withdrawals", `₹${data.summary.totalWithdrawals}`],
      ["Tickets Sold", data.summary.totalTicketsSold],
      ["Total Transactions", data.pagination.totalTransactions],
    ],
  });

  doc.save("wallet-summary.pdf");
};

export const generateTransactionsPDF = (transactions: any[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth()

  doc.setFontSize(16)
  doc.text('Transactions Report', 14, 18)
  doc.text('Capital Payments', pageWidth-14,18,{
    align: "right"
  })
  doc.setFontSize(10)
    doc.text(
        `Generated: ${format(new Date(), 'PPP p')}`,
        14,
        26
  )

  const tableData = transactions.map((tx) => [
    tx.type,
    tx.amount,
    tx.status,
    tx.source,
    new Date(tx.createdAt).toLocaleDateString(),
  ]);

  autoTable(doc, {
    startY: 30,
    head: [["Type", "Amount", "Status", "Source", "Date"]],
    body: tableData,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [16, 16, 16] },
    columnStyles: { 4: { halign: 'right' } },
  });

  doc.save("transactions.pdf");
};