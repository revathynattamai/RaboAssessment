import { NextResponse, NextRequest } from "next/server";
import { validate } from "./validate";

const Papa = require("papaparse");
const parseString = require("xml2js").parseString;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".")[1];
  const content = buffer.toString("utf8");

  if (ext === "csv") {
    const data = await new Promise((res, rej) => {
      Papa.parse(content, {
        complete: (results) => {
          return res(validate(results.data));
        },
      });
    });

    return NextResponse.json(
      {
        data,
      },
      {
        status: 200,
      },
    );
  } else if (ext === "xml") {
    const data = await new Promise((res, rej) => {
      parseString(content, function (err, result) {
        const arr = [
          [
            "Reference",
            "AccountNumber",
            "Description",
            "Start Balance",
            "Mutation",
            "End Balance",
          ],
        ];

        result.records.record.forEach((record) => {
          arr.push([
            record["$"].reference,
            record.accountNumber[0],
            record.description[0],
            record.startBalance[0],
            record.mutation[0],
            record.endBalance[0],
          ]);
        });
        return res(validate(arr));
      });
    });
    return NextResponse.json(
      {
        data,
      },
      {
        status: 200,
      },
    );
  }
}
