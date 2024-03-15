import { Fragment } from "react";

export default function Results({ results = null }) {
  if (!results) return null;
  const { headers, rows } = results;
  return (
    <Fragment>
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <div className="pt-4 bg-white shadow rounded">
            <div className="flex px-6 pb-4 border-b">
              <h3 className="text-xl font-bold">Failed Transactions</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-xs text-gray-500 text-left">
                    {headers.map((key: any) => (
                      <th className="pb-3 font-medium" key={key}>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row: any, id: any) => (
                    <tr className="text-xs bg-gray-50" key={id}>
                      {row.map((cell: any, id: any) => (
                        <td key={id}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
