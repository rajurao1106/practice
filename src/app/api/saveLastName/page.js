import { NextResponse } from 'next/server';
import connectDb from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDb();
    const { firstName, lastName } = await req.json();

    if (!lastName) {
      return NextResponse.json({ error: 'First name is required.' }, { status: 400 });
    }

    const user = new User({ firstName, lastName });
    await user.save();

    return NextResponse.json({ message: 'First name saved successfully.' }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Error saving first name.' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDb();
    const users = await User.find(); // Fetch all users from the database
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Error fetching first names.' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDb();
    const { lastName } = await req.json(); // Parse the JSON from the body

    if (!lastName) {
      return NextResponse.json({ error: 'First name is required to delete.' }, { status: 400 });
    }

    const user = await User.findOneAndDelete({ lastName }); // Find and delete user by lastName

    if (!user) {
      return NextResponse.json({ error: 'First name not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'First name deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Error deleting first name.' }, { status: 500 });
  }
}