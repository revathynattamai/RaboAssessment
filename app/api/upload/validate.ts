export const validate = (data: any[]) => {
    let validatedData = {
      headers: ["Reference", "Description","Status"], 
      rows: [],
    };
    const refs: any = {};
  
    data
      .slice(1)
      .filter((txn: string | any[]) => txn.length === 6)
      .forEach((txn: (string | number)[]) => {
        if (
          parseFloat((parseFloat(txn[3]) + parseFloat(txn[4])).toFixed(2)) !==
          parseFloat(txn[5])
        ) {
          validatedData.rows.push([txn[0], txn[2], "Invalid Balance"]);
        } else if (txn[0] in refs) {
          validatedData.rows.push([txn[0], txn[2], "Invalid Reference"]);
        }
        refs[txn[0]] = true;
      });
    return validatedData;
  };
  