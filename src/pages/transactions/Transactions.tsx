import { useState } from "react";
import "./Transactions.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import newAxiosRequest from "../../utils/newAxiosRequest";
import DisplayTransaction from "../../components/displayTransaction/DisplayTransaction";

function Transactions() {
  const currentDate = new Date().toJSON().slice(0, 10);
  const [fromDate, setFromDate] = useState(currentDate);
  const [toDate, setToDate] = useState(currentDate);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => {
      return newAxiosRequest
        .get(`/transactions?fromDate=${fromDate}&toDate=${toDate}`)
        .then((res) => {
          // console.log(JSON.stringify(res.data));

          return res.data;
        });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="transactions">
      <div className="container">
        <h2>Transactions</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="from">
            <label htmlFor="from">From - </label>
            <input
              type="date"
              name="from"
              id="from"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="to">
            <label htmlFor="to">To - </label>
            <input
              type="date"
              name="to"
              id="to"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <button type="submit">Apply</button>
        </form>
        {isLoading
          ? "Loading"
          : error
          ? "Something went wrong"
          : data.map((t, index) => (
                <DisplayTransaction transaction={t} key={index} />
            ))}
      </div>
    </div>
  );
}

export default Transactions;
