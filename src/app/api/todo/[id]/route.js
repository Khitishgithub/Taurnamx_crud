import DBConnection from "@/app/lib/Db";
import UserModel from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const data = await request.json();
        await DBConnection();
        const findTodo = await UserModel.findById(id);
        if (!findTodo) {
            return NextResponse.json({ success: false, message: "No data found" }, { status: 404 });
        }
        const updatedTodo = await UserModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        return NextResponse.json({ success: true, message: "Topic updated successfully", todo: updatedTodo }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await DBConnection();
        const findTodo = await UserModel.findById(id);
        if (!findTodo) {
            return NextResponse.json({ success: false, message: "No data found" }, { status: 404 });
        }
        const deletedTodo = await UserModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Topic deleted successfully", todo: deletedTodo }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
