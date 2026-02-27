import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/app/lib/mongoose';
import User from '@/app/models/User';
import { sendEmail } from '@/app/lib/mail';
// import { handleApiResponse, handleApiError } from '@/app/lib/apiError';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({
        message: 'If the email exists, a reset link has been sent.',
        // handleApiError(err);        
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Reset your password',
      html: `
        <p>You requested a password reset.</p>
        <p>
          <a href="${resetUrl}" target="_blank">
            Click here to reset your password
          </a>
        </p>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    return NextResponse.json({
      message: 'Password reset link sent to your email',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to send reset email' },
      { status: 500 },
    );
  }
}