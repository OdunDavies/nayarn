import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderStatusUpdateRequest {
  orderId: string;
  customerEmail: string;
  customerName: string;
  status: string;
  statusLabel: string;
}

const getStatusMessage = (status: string): string => {
  const messages: Record<string, string> = {
    confirmed: "Great news! Your order has been confirmed and is being prepared.",
    processing: "Your order is now being processed. We're working on getting it ready for shipment.",
    shipped: "Your order has been shipped! It's on its way to you.",
    delivered: "Your order has been delivered. We hope you love your new items!",
    cancelled: "Your order has been cancelled. If you have any questions, please contact us.",
  };
  return messages[status] || `Your order status has been updated to: ${status}`;
};

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: "#eab308",
    confirmed: "#3b82f6",
    processing: "#8b5cf6",
    shipped: "#06b6d4",
    delivered: "#22c55e",
    cancelled: "#ef4444",
  };
  return colors[status] || "#6b7280";
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, customerEmail, customerName, status, statusLabel }: OrderStatusUpdateRequest = await req.json();

    if (!orderId || !customerEmail || !customerName || !status) {
      throw new Error("Missing required fields");
    }

    const statusMessage = getStatusMessage(status);
    const statusColor = getStatusColor(status);

    const emailResponse = await resend.emails.send({
      from: "NaYarn <orders@nayarn.com>",
      to: [customerEmail],
      subject: `Order Update: ${statusLabel}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8f7f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f7f5; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 3px; color: #1a1a1a;">NAYARN</h1>
                      </td>
                    </tr>
                    
                    <!-- Status Badge -->
                    <tr>
                      <td style="padding: 40px 40px 20px; text-align: center;">
                        <span style="display: inline-block; padding: 8px 20px; background-color: ${statusColor}15; color: ${statusColor}; font-size: 14px; font-weight: 600; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">
                          ${statusLabel}
                        </span>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 0 40px 40px; text-align: center;">
                        <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 400; color: #1a1a1a;">
                          Hello ${customerName},
                        </h2>
                        <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #666666;">
                          ${statusMessage}
                        </p>
                        <p style="margin: 0; font-size: 14px; color: #999999;">
                          Order ID: <span style="font-family: monospace;">${orderId.slice(0, 8)}...</span>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- CTA -->
                    <tr>
                      <td style="padding: 0 40px 40px; text-align: center;">
                        <a href="https://nayarn.lovable.app/track?order=${orderId}" 
                           style="display: inline-block; padding: 14px 32px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">
                          Track Your Order
                        </a>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5; text-align: center;">
                        <p style="margin: 0 0 10px; font-size: 14px; color: #666666;">
                          Questions? Contact us at <a href="mailto:hello@nayarn.com" style="color: #1a1a1a;">hello@nayarn.com</a>
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #999999;">
                          © ${new Date().getFullYear()} NaYarn. Handcrafted with love.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    console.log("Order status email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order status email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
