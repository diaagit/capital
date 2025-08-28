// Ticketing routes
/**
 * | **Module** | **API Endpoint** | **Method** | **Role** | **Description** |
   | `/tickets/purchase` | POST | User | Purchase ticket (creates pending transaction) |
|  | `/tickets/my` | GET | User | Get my purchased tickets |
|  | `/tickets/:id` | GET | User | Ticket details (QR code etc.) |
|  | `/tickets/cancel/:id` | POST | User | Cancel ticket (refund if allowed) |
 */