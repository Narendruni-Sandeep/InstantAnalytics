import { supabase } from './supabase';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: { to, subject, html },
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to InstantAnalytics',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7e22ce;">Welcome to InstantAnalytics!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for joining InstantAnalytics. We're excited to help you transform your data into actionable insights.</p>
        <p>To get started, please verify your email and complete the onboarding process.</p>
        <p>Best regards,<br>The InstantAnalytics Team</p>
      </div>
    `,
  }),

  verifyEmail: (link: string) => ({
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7e22ce;">Verify your email</h1>
        <p>Please click the button below to verify your email address:</p>
        <a href="${link}" style="display: inline-block; background-color: #7e22ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Verify Email</a>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>Best regards,<br>The InstantAnalytics Team</p>
      </div>
    `,
  }),

  resetPassword: (link: string) => ({
    subject: 'Reset your password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7e22ce;">Reset your password</h1>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        <a href="${link}" style="display: inline-block; background-color: #7e22ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Reset Password</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Best regards,<br>The InstantAnalytics Team</p>
      </div>
    `,
  }),
};