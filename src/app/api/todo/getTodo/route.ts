import connect from "@/dbConfing/dbConfig";
import Todo from "@/models/todo.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const reqBody = await request.json();
    const { id } = reqBody;

    const todo = await Todo.findOne({ _id: id, user: userId });
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Todo fetched successfully",
      success: true,
      todo: todo,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
