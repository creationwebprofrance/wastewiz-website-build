import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  type: "contact" | "quote";
  name: string;
  email: string;
  phone?: string;
  postcode?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactFormData = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, message" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate field lengths
    if (data.name.length > 200 || data.email.length > 255 || (data.message && data.message.length > 5000)) {
      return new Response(
        JSON.stringify({ error: "Field length exceeds maximum allowed" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const isQuote = data.type === "quote";
    const subject = isQuote
      ? `New Quote Request from ${data.name}`
      : `New Contact Message from ${data.name}`;

    const htmlContent = `
      <h2>${isQuote ? "New Quote Request" : "New Contact Message"}</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
          <td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td>
        </tr>` : ""}
        ${data.postcode ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Postcode</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.postcode)}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.message).replace(/\n/g, "<br>")}</td>
        </tr>
      </table>
    `;

    const emailResponse = await resend.emails.send({
      from: "WasteWiz <onboarding@resend.dev>",
      to: ["wastewhiz@rubbishclearanceltd.com"],
      subject,
      html: htmlContent,
      reply_to: data.email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(handler);
