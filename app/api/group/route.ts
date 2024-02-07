import { NextRequest, NextResponse } from "next/server";
import UsersResModel, { Gender, UserModel } from "./model/UserModel";
import SummaryModel from "./model/SummaryModel";

export async function GET(request: NextRequest) {
  const res = await fetch('https://dummyjson.com/users');
  const json = await res.json();
  const data = new UsersResModel(json.users ?? [])

  const userGroup = getGroup(data)

  return NextResponse.json(userGroup);
}

function getGroup(data: UsersResModel) {
  const obj: { [key: string]: any } = {};
  const departmentList = data.getDepartment()

  departmentList.map((department) => {
    obj[department] = new SummaryModel(
      data.getHairSummaryByDepartment(department),
      data.getAddressSummaryByDepartment(department),
      data.genderCountByDepartment(department, Gender.MALE),
      data.genderCountByDepartment(department, Gender.FEMALE),
      data.ageRangeByDepartment(department)
    );
  })

  return obj
}