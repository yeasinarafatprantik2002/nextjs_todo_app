import connect from "@/dbConfing/dbConfig";
import Todo from "@/models/todo.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
// create a route to update a todo

export async function PUT(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const reqBody = await request.json();
    const { id, title, description } = reqBody;

    const todo = await Todo.findOne({ _id: id, user: userId });
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    todo.title = title;
    todo.description = description;
    const updatedTodo = await todo.save();

    return NextResponse.json({
      message: "Todo updated",
      success: true,
      todo: updatedTodo,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
