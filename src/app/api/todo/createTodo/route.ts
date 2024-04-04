import connect from "@/dbConfing/dbConfig";
import Todo from "@/models/todo.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const reqBody = await request.json();
    const { title, description } = reqBody;

    const newTodo = new Todo({
      title,
      description,
      user: userId,
    });

    const savedTodo = await newTodo.save();

    return NextResponse.json({
      message: "Todo created",
      success: true,
      todo: savedTodo,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
