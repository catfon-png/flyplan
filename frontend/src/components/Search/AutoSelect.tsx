import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

import {
  setInputAutoDataDestination,
  setInputAutoDataOrigin,
  setSelectedValueDestination,
  setSelectedValueOrigin,
} from "../../state/slicers/autosuggestSlice";
import { RootState } from "../../state/store";
import { IOptionAirportSelect } from "../../types";

type AutoSelectProps = {
  errorMessage: string;
};

export const AutoSelect = (props: AutoSelectProps) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const airportList = useSelector(
    (state: RootState) => state.autosuggestReducer.airportList
  );

    

  
  const filterCities = async (inputValue: string, isOrigin: boolean) => {
    const data: IOptionAirportSelect[] =
      (await inputValue.length) > 1
        ? airportList.filter((item: IOptionAirportSelect) =>
            item.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        : [];
    if (isOrigin) {
      dispatch(setInputAutoDataOrigin(data));
    } else {
      dispatch(setInputAutoDataDestination(data));
    }
    return data;
  };

  return (
    <div className="flex space-x-4">
      <label className="flex flex-col flex-1">
        <span className="text-gray-600 font-medium mb-2">From</span>
        <AsyncSelect
          placeholder="Origin"
          // className="border-flyplanyellow"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              // borderColor: state.isFocused ? 'grey' : 'red',
              // borderColor: getValue(state) ? 'grey' : '#EBBE6F',
              borderColor: state.selectProps.menuIsOpen || state.selectProps.inputValue ? '#EBBE6F' : 'grey',

            }),
          }}
          
          defaultOptions
          loadOptions={(inputValue: string) => filterCities(inputValue, true)}
          onChange={(selectedOption: any) =>
            dispatch(setSelectedValueOrigin(selectedOption?.value))
          }
          isLoading={loading}
          // isDisabled={loading}
        />
      </label>
      <div className="flex flex-col flex-1">
        <label className="flex flex-col flex-1">
          <span className="text-gray-600 font-medium mb-2 ">To</span>
          <AsyncSelect
            placeholder="Destination"
            className="border-flyplanyellow"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                // borderColor: state.isFocused ? 'grey' : 'red',
                // borderColor: getValue(state) ? 'grey' : '#EBBE6F',
                borderColor: state.selectProps.menuIsOpen || state.selectProps.inputValue ? '#EBBE6F' : 'grey',
  
              }),
            }}
            defaultOptions
            loadOptions={(inputValue: string) =>
              filterCities(inputValue, false)
            }
            onChange={(selectedOption: any) =>
              dispatch(setSelectedValueDestination(selectedOption?.value))
            }
            isLoading={loading}
            // isDisabled={loading}
          />
        </label>
        <p className="text-red-600">{props.errorMessage}</p>
      </div>
    </div>
  );
};
