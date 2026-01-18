export const generatePDFReceipt = (donation) => {
  const { jsPDF } = window.jspdf

  const doc = new jsPDF()
  
  // Header
  doc.setFillColor(79, 70, 229)
  doc.rect(0, 0, 210, 40, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text('Go Fund', 105, 20, { align: 'center' })
  doc.setFontSize(12)
  doc.text('Donation Receipt', 105, 30, { align: 'center' })
  
  // Reset color
  doc.setTextColor(0, 0, 0)
  
  // Receipt Details
  doc.setFontSize(16)
  doc.text('Thank You for Your Donation!', 20, 60)
  
  doc.setFontSize(12)
  doc.text(`Receipt ID: ${donation.id}`, 20, 80)
  doc.text(`Date: ${new Date(donation.timestamp || Date.now()).toLocaleDateString()}`, 20, 90)
  
  // Amount Box
  doc.setFillColor(240, 240, 240)
  doc.rect(20, 100, 170, 30, 'F')
  doc.setFontSize(20)
  doc.text(`Amount: ₹${donation.amount.toLocaleString()}`, 25, 120)
  
  // Details
  doc.setFontSize(12)
  doc.text(`Campaign: ${donation.campaign || donation.cause || 'General Fund'}`, 20, 150)
  doc.text(`Donor Name: ${donation.name || 'Anonymous'}`, 20, 160)
  
  // Impact Breakdown
  doc.text('Impact Breakdown:', 20, 180)
  const share = (donation.amount / 3).toFixed(2)
  doc.text(`• Education Fund: ₹${share}`, 25, 190)
  doc.text(`• Food Relief Fund: ₹${share}`, 25, 200)
  doc.text(`• Medical Fund: ₹${share}`, 25, 210)
  
  // Footer
  doc.setFontSize(10)
  doc.text('This is an official receipt for tax purposes.', 20, 250)
  doc.text('Go Fund - Making a difference, one donation at a time.', 20, 260)
  doc.text('For queries: support@gofund.com', 20, 270)
  
  // Save
  doc.save(`GoFund_Receipt_${donation.id}.pdf`)
}
