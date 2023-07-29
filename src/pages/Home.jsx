import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        "https://back-gnox.onrender.com/api/v1/values"
      );
      setData(data);
      setValues(data.map(() => 0));
    }
    getData();
  }, []);

  const handleValueChange = (e, idx) => {
    //clone
    const newValues = [...values];
    //edit
    newValues[idx] = +e.target.value;
    //set state
    setValues(newValues);
  };

  return (
    <>
      <div className="overflow-x-auto ">
        <div className="container">
          <div className="main-heading">
            <h2 className="my-5">Data Table</h2>
          </div>
          <table className="table table-zebra w-full my-10">
            <thead>
              <tr>
                <th></th>
                <th>Value 1</th>
                <th>Value 2</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={data._id}>
                  <th>{index + 1}</th>
                  <td>
                    <input
                      type="number"
                      value={values[index]}
                      onChange={(e) => handleValueChange(e, index)}
                      className="number"
                      min={0}
                    />
                  </td>
                  <td>{data.value}</td>
                  <td> {((values[index] * data.value) / 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
