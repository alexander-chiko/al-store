import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await retrieveData("users");
    const data = users.map((user: any) => {
      delete user.password;
      return user;
    });
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "get data success",
      data,
    });
  } else if (req.method === "PUT") {
    const { id, data } = req.body;
    await updateData("users", id, data, (result: boolean) => {
      if (result) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "update data success",
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "update data failed",
        });
      }
    });
  } else if (req.method === "DELETE") {
    const { id }: any = req.query;
    await deleteData("users", id[1], (result: boolean) => {
      if (result) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "delete data success",
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "delete data failed",
        });
      }
    });
  }
}
