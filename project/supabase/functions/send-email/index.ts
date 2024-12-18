import { serve } from 'https://deno.fresh.dev/std@v9.6.1/http/server.ts';
import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts';

const client = new SmtpClient();

serve(async (req) => {
  try {
    // Configure SMTP client
    await client.connectTLS({
      hostname: 'my.chillreach.in',
      port: 465,
      username: 'instantanalytics@chillreach.in',
      password: 'pranav@201301',
    });

    const { to, subject, html } = await req.json();

    // Send email
    await client.send({
      from: 'InstantAnalytics <instantanalytics@chillreach.in>',
      to,
      subject,
      html,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});