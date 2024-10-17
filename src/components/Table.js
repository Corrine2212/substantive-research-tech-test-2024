import React from "react";

const TableComponent = ({ data, exchangeRates, convertToEuros, totals }) => {

  return (
    <>
    
      <h3>Payment and Benchmark Totals over 4 years (2021-2024)</h3>

      <table>
        <thead>
          <tr>
            <th>Provider Name</th>
            <th>Payment (EUR)</th>
            <th>Benchmark (EUR)</th>
            <th>Difference (EUR)</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {Object.keys(totals).map((provider) => {

            const { totalPayment, totalBenchmark, totalDifference, status } = totals[provider];

            return (
              <tr key={provider}>
                <td>{provider}</td>
                <td>{totalPayment.toFixed(2)}</td>
                <td>{totalBenchmark.toFixed(2)}</td>
                <td>{totalDifference.toFixed(2)}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableComponent;