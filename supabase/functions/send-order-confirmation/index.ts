import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  product_name: string;
  product_price: number;
  quantity: number;
  size?: string;
}

interface OrderConfirmationRequest {
  orderId: string;
  customerName: string;
  customerEmail: string;
  orderItems: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send order confirmation");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      orderId,
      customerName,
      customerEmail,
      orderItems,
      subtotal,
      shippingCost,
      total,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry,
    }: OrderConfirmationRequest = await req.json();

    console.log(`Processing order confirmation for order ${orderId} to ${customerEmail}`);

    const itemsHtml = orderItems
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            ${item.product_name}${item.size ? ` (${item.size})` : ''}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
            ${formatCurrency(item.product_price * item.quantity)}
          </td>
        </tr>
      `
      )
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: Georgia, serif; background-color: #f8f7f4; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #1a1a1a; padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: normal; letter-spacing: 2px;">
                MÈRE ET FILLE
              </h1>
            </div>
            
            <div style="padding: 40px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px; font-weight: normal;">
                Thank you for your order, ${customerName}!
              </h2>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
                We've received your order and are preparing it with care. Each piece is handcrafted, 
                so please allow 2-3 weeks for your order to be completed and shipped.
              </p>
              
              <div style="background-color: #f8f7f4; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <p style="margin: 0; color: #1a1a1a; font-size: 14px;">
                  <strong>Order Number:</strong> ${orderId.slice(0, 8).toUpperCase()}
                </p>
              </div>
              
              <h3 style="color: #1a1a1a; margin: 0 0 15px; font-weight: normal; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                Order Details
              </h3>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr>
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #1a1a1a; font-weight: normal;">Item</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #1a1a1a; font-weight: normal;">Qty</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #1a1a1a; font-weight: normal;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              
              <div style="text-align: right; margin-bottom: 30px;">
                <p style="margin: 5px 0; color: #666;">Subtotal: ${formatCurrency(subtotal)}</p>
                <p style="margin: 5px 0; color: #666;">Shipping: ${shippingCost > 0 ? formatCurrency(shippingCost) : 'Free'}</p>
                <p style="margin: 10px 0 0; color: #1a1a1a; font-size: 18px;"><strong>Total: ${formatCurrency(total)}</strong></p>
              </div>
              
              <h3 style="color: #1a1a1a; margin: 0 0 15px; font-weight: normal; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                Shipping Address
              </h3>
              
              <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
                ${customerName}<br>
                ${shippingAddress}<br>
                ${shippingCity}, ${shippingState} ${shippingZip}<br>
                ${shippingCountry}
              </p>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px;">
                If you have any questions about your order, please reply to this email or 
                contact us at hello@mereetfille.com
              </p>
            </div>
            
            <div style="background-color: #1a1a1a; padding: 30px; text-align: center;">
              <p style="color: #888; margin: 0; font-size: 12px;">
                © 2024 Mère et Fille. Handcrafted with love.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Mère et Fille <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Order Confirmation - #${orderId.slice(0, 8).toUpperCase()}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
