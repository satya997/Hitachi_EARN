import React, { useState } from "react";

const Table = () => {
  const [hoveredFromIndex, setHoveredFromIndex] = useState(null);
  const [hoveredToIndex, setHoveredToIndex] = useState(null);

  const tableData = [
    {
      id: "1012",
      category: "Sale",
      token: "Fractional NFT $PRJ123",
      price: "$350000",
      from: "pqrst09876543",
      to: "abcde09876543",
      timeset: "Dec-26-2023 11:28:59 PM",
    },
    {
      id: "1011",
      category: "Sale",
      token: "Green Energy $GE124",
      price: "$250000",
      from: "pqrst09876544",
      to: "abcde09876544",
      timeset: "Dec-26-2023 11:20:19 PM",
    },
    {
      id: "1010",
      category: "Fractional NFT $PRJ125",
      token: "Token ",
      price: "$157000",
      from: "pqrst09876545",
      to: "abcde09876545",
      timeset: "Dec-26-2023 11:18:59 PM",
    },
    {
      id: "1009",
      category: "Offer",
      token: "Fractional NFT $PRJ126",
      price: "$1150000",
      from: "pqrst09876546",
      to: "-",
      timeset: "Dec-26-2023 11:08:59 PM",
    },
    {
      id: "1008",
      category: "Dividends",
      token: "Fractional NFT $PRJ127",
      price: "$50000",
      from: "pqrst09876547",
      to: "abcde09876547",
      timeset: "Dec-26-2023 11:07:59 PM",
    },
    {
      id: "1007",
      category: "Sale",
      token: "Fractional NFT $PRJ128",
      price: "$1150000",
      from: "pqrst09876548",
      to: "abcde09876548",
      timeset: "Dec-26-2023 11:02:59 PM",
    },
  ];

  return (
    <div className=" ml-2 rounded-md w-full sm:w-[652px] bg-gray-800 mb-20">
      <h2 className="text-[#21fc0d] text-center font-poppins min-w-[316px] m-0 text-[27px] font-normal border-2 border-[#21fc0d] bg-gray-700 py-2">
        Marketplace Alerts
      </h2>
      <div className="scroll-bar">
        <table className="w-full mb-8 text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-700">
            <tr className="text-sm text-white">
              <th className="p-3">Id</th>
              <th className="p-3">Category</th>
              <th className="p-3">Token</th>
              <th className="p-3">Price</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Timeset</th>
            </tr>
          </thead>
          <tbody className="text-sm text-white">
            {tableData.map((row, index) => (
              <tr key={index} className="bg-gray-600 border-b border-white">
                <td className="p-3 text-center">{row.id}</td>
                <td className="p-3 text-center">{row.category}</td>
                <td className="p-3 text-center">{row.token}</td>
                <td className="p-3 text-center">{row.price}</td>
                <td
                  className="relative p-3 text-center cursor-pointer"
                  onMouseEnter={() => setHoveredFromIndex(index)}
                  onMouseLeave={() => setHoveredFromIndex(null)}
                >
                  From
                  {hoveredFromIndex === index && (
                    <div className="absolute px-2 py-1 text-white transform -translate-x-1/2 bg-black border border-gray-400 rounded shadow-md -top-10 left-1/2">
                      {row.from}
                    </div>
                  )}
                </td>
                <td
                  className="relative p-3 text-center cursor-pointer"
                  onMouseEnter={() => setHoveredToIndex(index)}
                  onMouseLeave={() => setHoveredToIndex(null)}
                >
                  To
                  {hoveredToIndex === index && (
                    <div className="absolute px-2 py-1 text-white transform -translate-x-1/2 bg-black border border-gray-400 rounded shadow-md -top-10 left-1/2">
                      {row.to}
                    </div>
                  )}
                </td>
                <td className="p-3 text-center">{row.timeset}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
