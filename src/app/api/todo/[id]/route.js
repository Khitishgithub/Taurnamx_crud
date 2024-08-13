import DBConnection from "@/app/lib/Db"
import UserModel from "@/app/models/user"
import { NextResponse } from "next/server"



export async function PUT(request,{params}) {
    try {
        const {id}=params
        const data=await request.json()
        await DBConnection()
        const findtodo=await UserModel.findById(id)
        if (!findtodo) {
       return NextResponse.json({success:false,message:"No data Found"},{status:404})
            
        }
             const update=await UserModel.findByIdAndUpdate(id,{$set:data},{new:true})
       return NextResponse.json({success:true,message:"Todo Updated Successfully",todo:update},{status:200})


    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"intneral server error",},{status:500})
        
    }
}

export async function DELETE(request,{params}) {
    try {
        const {id}=params
       
          await DBConnection()
        const findtodo=await UserModel.findById(id)
        if (!findtodo) {
       return NextResponse.json({success:false,message:"No data Found"},{status:404})
            
        }
             const delte=await UserModel.findByIdAndDelete(id)
       return NextResponse.json({success:true,message:"Todo Deletd Successfully",todo:delte},{status:200})


    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"intneral server error",},{status:500})
        
    }
}