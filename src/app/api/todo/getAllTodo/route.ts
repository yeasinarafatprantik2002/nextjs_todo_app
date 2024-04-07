import Todo from "@/models/todo.model";
import connect from "@/dbConfing/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const todos = await Todo.find({ user: userId });

    if (!todos) {
      return NextResponse.json({ error: "No todos found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Todos fetched successfully",
      success: true,
      user: todos,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
