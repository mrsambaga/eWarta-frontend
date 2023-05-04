// import React, { useEffect, useState } from "react";
// import { GetCookie } from "../../../utils/Cookies/Cookies";
// import useFetchGet from "../../../hooks/UseFetchGet";

// const Table: React.FC = () => {
//   const token = GetCookie("admin-token");
//   const [queryParams, setQueryParams] = useState("");
//   const [paramChange, setParamChange] = useState(false);
//   const { out, loading, error } = useFetchGet<{ data: TransferResponse[] }>(
//     `http://localhost:8000/transaction?${queryParams}`,
//     token!,
//     paramChange
//   );

//   useEffect(() => {
//     const queryParams = queryString.stringify({
//       search: QueryParams?.search,
//       sortBy: QueryParams?.sortBy,
//       sort: QueryParams?.sort,
//     });
//     setQueryParams(queryParams);
//     setParamChange(!paramChange);
//   }, [QueryParams]);

//   useEffect(() => {
//     if (error) {
//       const errorMessage = error.response?.data || error.message;
//       notifyError(JSON.stringify(errorMessage));
//       return;
//     }

//     if (out != null && out.data != null) {
//       console.log(out);
//       const transactionDetail: TransactionDetail[] = out.data.map((item) => {
//         const selfWallet: string | null = localStorage.getItem("wallet_number");
//         const dateTime = moment(item.CreatedAt).format("HH:mm - DD MMMM YYYY");
//         return {
//           TransactionId: item.TransactionId,
//           Amount: item.Amount,
//           Description: item.Description ? item.Description : "",
//           FromTo: item.SourceId ? item.SourceId : item.TargetWalletNumber,
//           Type:
//             item.SourceId || item.TargetWalletNumber == selfWallet
//               ? "Credit"
//               : "Debit",
//           DateTime: dateTime,
//         };
//       });

//       setTransactions(transactionDetail);
//     }
//   }, [out, error]);

//   return (
//     <div>
//       {loading ? (
//         <>
//           <div>
//             <h1>Loading Transaction History.....</h1>
//           </div>
//         </>
//       ) : (
//         <table className="table table-bordered table-striped">
//           <thead className="table__head">
//             <tr>
//               <th>Date & Time</th>
//               <th>Type</th>
//               <th>From/To</th>
//               <th>Description</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody className="table__body">
//             {transactions.map((transaction) => (
//               <tr key={transaction.TransactionId}>
//                 <td>{transaction.DateTime}</td>
//                 <td>{transaction.Type}</td>
//                 <td>{transaction.FromTo}</td>
//                 <td>{transaction.Description}</td>
//                 <td>{transaction.Amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Table;

import React from "react";

function Table() {
  return <div>Table</div>;
}

export default Table;
