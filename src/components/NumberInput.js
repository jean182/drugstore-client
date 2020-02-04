import React from "react";
import { capitalize, first, last, isEmpty } from "lodash";

const NumberInput = props => {
  const { inputName, object, onInputChange, value, step } = props;
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={inputName}
      >
        {capitalize(inputName)}
        {!isEmpty(object) && (
          <React.Fragment>
            <span className="text-indigo-500">{` ${first(
              object[inputName]
            )} - ${last(object[inputName])} `}</span>
            <span className="lowercase text-indigo-500">(mg)</span>
          </React.Fragment>
        )}
      </label>
      <input
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
        id={inputName}
        name={inputName}
        type="number"
        placeholder={capitalize(inputName)}
        min={!isEmpty(object) && first(object[inputName])}
        max={!isEmpty(object) && last(object[inputName])}
        step={step}
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
};

export default NumberInput;
