// export interface TicketInfo {
//   email: string;
//   eventTitle: string;
//   eventDate: string;
//   eventTime: string;
//   eventLocation: string;
//   qrCodeUrl: string;
//   seats?: string;
// }
// const TicketEmailTemplate = (
//   ticket: TicketInfo & {
//     attendeeName: string;
//     organiser?: string;
//     quantity: number;
//     baseAmount: number;
//     gstRate: number;
//     gstAmount: number;
//     convenienceFee: number;
//     totalPaid: number;
//     bookingDateTime: string;
//     paymentType: string;
//   }
// ) => `
//   <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
//     <div style="max-width:600px; margin:auto; background:#fff; border:1px solid #ddd; border-radius:12px; padding:20px;">

//       <!-- Order Summary -->
//       <h3 style="margin-top:0; font-size:18px; border-bottom:1px solid #eee; padding-bottom:8px;">
//         ORDER SUMMARY
//       </h3>
//       <table style="width:100%; font-size:14px; color:#333;">
//         <tr>
//           <td style="padding:6px 0;">TICKET AMOUNT</td>
//           <td style="text-align:right;">₹${ticket.baseAmount.toFixed(2)}</td>
//         </tr>
//         <tr>
//           <td style="padding:6px 0; font-size:13px; color:#666;">Quantity</td>
//           <td style="text-align:right; font-size:13px; color:#666;">${ticket.quantity} tickets</td>
//         </tr>
//         <tr><td colspan="2" style="border-bottom:1px dashed #ddd; padding:4px 0;"></td></tr>

//         <tr>
//           <td style="padding:6px 0;">CONVENIENCE FEES</td>
//           <td style="text-align:right;">₹${ticket.convenienceFee.toFixed(2)}</td>
//         </tr>
//         <tr>
//           <td style="padding:6px 0; font-size:13px; color:#666;">Base Amount</td>
//           <td style="text-align:right; font-size:13px; color:#666;">₹${ticket.baseAmount.toFixed(2)}</td>
//         </tr>
//         <tr>
//           <td style="padding:6px 0; font-size:13px; color:#666;">Central GST @ ${ticket.gstRate}%</td>
//           <td style="text-align:right; font-size:13px; color:#666;">₹${(ticket.gstAmount/2).toFixed(2)}</td>
//         </tr>
//         <tr>
//           <td style="padding:6px 0; font-size:13px; color:#666;">State GST @ ${ticket.gstRate}%</td>
//           <td style="text-align:right; font-size:13px; color:#666;">₹${(ticket.gstAmount/2).toFixed(2)}</td>
//         </tr>
//         <tr><td colspan="2" style="border-bottom:1px dashed #ddd; padding:4px 0;"></td></tr>

//         <tr>
//           <td style="padding:10px 0; font-weight:600;">AMOUNT PAID</td>
//           <td style="text-align:right; font-weight:600;">₹${ticket.totalPaid.toFixed(2)}</td>
//         </tr>
//       </table>

//       <!-- Booking Info -->
//       <div style="margin-top:20px; display:flex; justify-content:space-between; font-size:14px;">
//         <div>
//           <p style="margin:0; font-weight:600;">Booking Date & Time</p>
//           <p style="margin:4px 0; color:#444;">${ticket.bookingDateTime}</p>
//         </div>
//         <div>
//           <p style="margin:0; font-weight:600;">Payment Type</p>
//           <p style="margin:4px 0; color:#444;">${ticket.paymentType}</p>
//         </div>
//       </div>

//       <!-- QR Inline (Optional) -->
//       <div style="text-align:center; margin:20px 0;">
//         <img src="${ticket.qrCodeUrl}" alt="QR Code" style="width:120px; height:120px;" />
//         <p style="font-size:12px; color:#666; margin-top:8px;">
//           You can also find your ticket in the attached PDF
//         </p>
//       </div>

//       <!-- Important Instructions -->
//       <div style="margin-top:20px; font-size:12px; color:#555; border-top:1px solid #eee; padding-top:12px;">
//         <p style="margin:0 0 6px;"><b>IMPORTANT INSTRUCTIONS</b></p>
//         <p style="margin:4px 0;">This transaction can be cancelled up to 20 mins before the show as per policy.</p>
//         <p style="margin:4px 0;">Carry a valid ID along with this ticket.</p>
//         <p style="margin:4px 0;">GST collected is paid to the department.</p>
//       </div>
//     </div>
//   </div>
// `;

// export default TicketEmailTemplate;

// // interface TicketInfo {
// //   email: string;
// //   eventTitle: string;
// //   eventDate: string;
// //   eventTime: string;
// //   eventLocation: string;
// //   qrCodeUrl: string;
// //   seats?: string;
// // }

// // const TicketEmailTemplate = (ticket: TicketInfo) => `
// //   <div style="font-family: 'Inter', Arial, sans-serif; background-color: #f9f9f9; padding: 40px;">
// //     <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">

// //       <!-- Header -->
// //       <div style="background: #2563eb; color: white; text-align: center; padding: 20px;">
// //         <h1 style="margin: 0; font-size: 22px; font-weight: 700;">Your Event Ticket</h1>
// //         <p style="margin: 5px 0 0; font-size: 14px;">${ticket.eventTitle}</p>
// //       </div>

// //       <!-- Ticket Details -->
// //       <div style="padding: 24px; text-align: center;">
// //         <p style="font-size: 16px; margin: 6px 0;"><strong>Date:</strong> ${ticket.eventDate}</p>
// //         <p style="font-size: 16px; margin: 6px 0;"><strong>Time:</strong> ${ticket.eventTime}</p>
// //         <p style="font-size: 16px; margin: 6px 0;"><strong>Location:</strong> ${ticket.eventLocation}</p>
// //         <p style="font-size: 16px; margin: 6px 0;"><strong>Seat:</strong> ${ticket.seats || "General Admission"}</p>
// //       </div>

// //       <!-- QR Code -->
// //       <div style="padding: 20px; text-align: center; border-top: 1px dashed #e5e7eb;">
// //         <img src="${ticket.qrCodeUrl}" alt="QR Code" style="width: 180px; height: 180px;" />
// //         <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">
// //           Show this QR code at the entry gate
// //         </p>
// //       </div>

// //       <!-- Footer -->
// //       <div style="background: #f3f4f6; text-align: center; padding: 12px;">
// //         <p style="margin: 0; font-size: 12px; color: #6b7280;">
// //           Sent by <strong>Capital</strong> • Your trusted booking partner
// //         </p>
// //       </div>
// //     </div>
// //   </div>
// // `;
