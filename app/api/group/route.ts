import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest){
  const res = await fetch('https://dummyjson.com/users');
  const data = await res.json();
    
  return NextResponse.json(data);
}