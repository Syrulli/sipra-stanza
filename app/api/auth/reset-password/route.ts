import { NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/app/lib/mongoose';
import User from '@/app/models/User';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        await connectDB();
        const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: new Date() },
        }).select('+password');

        if (!user) {
        return NextResponse.json(
            { error: 'Token is invalid or expired' },
            { status: 400 },
        );
        }

        user.password = await bcrypt.hash(password, 12);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return NextResponse.json({
        message: 'Password reset successful',
        });
    } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 },
    );
  }
}