import connect from "@/dbConfing/dbConfig";
import Todo from "@/models/todo.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const reqBody = await request.json();
    const { id } = reqBody;

    const todo = await Todo.findById(id);
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    if (todo.user.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Todo deleted",
      success: true,
      todo: deletedTodo,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
