import User from "@/models/User";
import connectMongo from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { USERS } from "../lib/dummy-contants";
import { NextResponse } from "next/server";

async function seedUsers() {
  await User.deleteMany();

  const users = await Promise.all(
    USERS.map(async ({ email, password }) => ({
      email: email,
      password: await bcrypt.hash(password, 10),
    }))
  );

  await User.insertMany(users);
}

export async function GET(request: Request) {
  try {
    await connectMongo();

    seedUsers();

    return NextResponse.json({ message: "Users seeded successfully" });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
