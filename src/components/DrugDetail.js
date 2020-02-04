import React, { useState } from "react";
import { first, last } from "lodash";

function DrugDetail(props) {
  const { drug } = props;
  const { genericName, description, conditions } = drug;
  const [conditionList, setConditions] = useState(conditions);

  const handleChange = event => {
    const { value } = event.target;
    if (value === "default") {
      setConditions(conditions);
      return;
    }
    const id = parseInt(value, 10);
    const condition = conditions.filter(condition => condition.id === id);
    setConditions(condition);
  };

  console.log(conditionList);

  return (
    <div className="container mx-auto p-3">
      <div className="flex justify-between">
        <h1 className="font-black font-sans text-5xl">{genericName}</h1>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="conditions"
            onChange={handleChange}
          >
            <option value="default">Default</option>
            {conditions.map(condition => {
              const { id, name } = condition;
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-3 p-3">
        <p className="text-center mb-2">{description}</p>
        {conditionList.map(condition => {
          return (
            <div className="flex">
              <div className="w-1/3 border p-2">
                <h1 className="text-xl">
                  <span className="text-gray-600 text-2xl">
                    {condition.name}
                  </span>
                </h1>
                <p className="italic">{condition.description}</p>
              </div>
              <div className="w-1/3 border p-2">
                <h1 className="text-xl">
                  <span className="text-gray-600 text-2xl">Frequency:</span>
                </h1>
                <p className="my-3 text-xl text-teal-500 text-right">
                  {first(condition.frequency)} - {last(condition.frequency)} per
                  day
                </p>
              </div>
              <div className="w-1/3 border p-2">
                <h1 className="text-xl">
                  <span className="text-gray-600 text-2xl">Dose:</span>
                </h1>
                <p className="my-3 text-xl text-teal-500 text-right">
                  {first(condition.dose)} - {last(condition.dose)}(mg)
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DrugDetail;
