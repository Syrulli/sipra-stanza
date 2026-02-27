import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/app/lib/mongoose';
import User from '@/app/models/User';

const nameRegex = /^[A-Za-z\s]+$/;
const passwordRegex =
  /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    if (!nameRegex.test(name)) {
      return NextResponse.json(
        { error: 'Name can only contain letters and spaces' },
        { status: 400 },
      );
    }

    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            'Password must be 8–16 characters and include at least one special character',
        },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'customer',
    });

    return NextResponse.json(
      { message: 'Account created successfully.' },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
