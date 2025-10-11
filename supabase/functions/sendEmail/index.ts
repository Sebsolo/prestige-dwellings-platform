import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendEmailRequest {
  type: 'lead_notification' | 'contact_confirmation';
  lead: {
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    message: string;
    source: string;
    propertyId?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, lead }: SendEmailRequest = await req.json();
    console.log(`Processing email type: ${type} for lead:`, lead);

    if (type === 'lead_notification') {
      // Send notification to admin/agents
      const adminEmailResponse = await resend.emails.send({
        from: "Sebastien Pons Immobilier <no-reply@sebastien-pons-immobilier.fr>",
        to: ["sebastien.pons@expfrance.fr"], // Admin notification email
        subject: `Nouveau contact - ${lead.firstname} ${lead.lastname}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
              Nouveau contact reçu
            </h1>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #333;">Informations du contact</h2>
              <p><strong>Nom :</strong> ${lead.firstname} ${lead.lastname}</p>
              <p><strong>Email :</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
              ${lead.phone ? `<p><strong>Téléphone :</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>` : ''}
              <p><strong>Source :</strong> ${lead.source}</p>
              ${lead.propertyId ? `<p><strong>Propriété :</strong> ${lead.propertyId}</p>` : ''}
            </div>
            
            <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #333;">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${lead.message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #D4AF37; color: white; border-radius: 8px; text-align: center;">
              <p style="margin: 0;">
                <strong>Répondez rapidement pour un service client optimal !</strong>
              </p>
            </div>
          </div>
        `,
      });

      console.log("Admin notification sent:", adminEmailResponse);

      // Send confirmation to the lead
      const confirmationEmailResponse = await resend.emails.send({
        from: "Sebastien Pons Immobilier <no-reply@sebastien-pons-immobilier.fr>",
        to: [lead.email],
        subject: "Votre message a bien été reçu",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #D4AF37, #B8941F); color: white; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">Sebastien Pons Immobilier</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Immobilier de prestige</p>
            </div>
            
            <div style="padding: 30px; background: white; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #333; margin-top: 0;">Bonjour ${lead.firstname},</h2>
              
              <p style="line-height: 1.6; color: #555;">
                Nous avons bien reçu votre message et nous vous remercions de votre intérêt pour nos services.
              </p>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4AF37;">
                <h3 style="margin-top: 0; color: #333;">Récapitulatif de votre demande</h3>
                <p style="margin: 5px 0;"><strong>Source :</strong> ${lead.source}</p>
                ${lead.propertyId ? `<p style="margin: 5px 0;"><strong>Propriété :</strong> ${lead.propertyId}</p>` : ''}
                <p style="margin: 5px 0; margin-top: 15px;"><strong>Votre message :</strong></p>
                <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; margin: 10px 0;">${lead.message}</p>
              </div>
              
              <p style="line-height: 1.6; color: #555;">
                Un membre de notre équipe vous contactera dans les plus brefs délais pour répondre à votre demande.
              </p>
              
              <div style="margin: 30px 0; padding: 20px; background: #D4AF37; color: white; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 18px;">
                  <strong>📞 Besoin d'un contact immédiat ?</strong>
                </p>
                <p style="margin: 10px 0 0 0;">
                  Appelez-nous au : <strong>+33 1 XX XX XX XX</strong>
                </p>
              </div>
              
              <p style="line-height: 1.6; color: #555; margin-bottom: 0;">
                Cordialement,<br>
                <strong>L'équipe Sebastien Pons Immobilier</strong>
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
              <p style="margin: 0;">
                Sebastien Pons Immobilier - Expert en immobilier de prestige<br>
                <a href="mailto:contact@sebastien-pons-immobilier.fr" style="color: #D4AF37;">contact@sebastien-pons-immobilier.fr</a>
              </p>
            </div>
          </div>
        `,
      });

      console.log("Confirmation email sent:", confirmationEmailResponse);

      return new Response(
        JSON.stringify({ 
          success: true, 
          adminEmail: adminEmailResponse,
          confirmationEmail: confirmationEmailResponse 
        }), 
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid email type" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);