import React from "react";
import { useAsyncDebounce } from "react-table";
import { FaSearch } from "react-icons/fa";

import Input from "../atoms/input";

export const StatusPill = ({ value }) => {
  const status = value ? value.toLowerCase() : "unknown";
  return (
    <span
      className={`px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm
        ${status.startsWith("active") && "bg-green-100 text-green-800"},
        ${status.startsWith("inactive") && "bg-yellow-100 text-yellow-800"},
        ${status.startsWith("offline") && "bg-red-100 text-red-800"}`}
    >
      {status}
    </span>
  );
};

export const AvatarCell = ({ value, column, row }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  );
};

export const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={`
        "relative inline-flex items-center p-2 text-sm font-medium rounded-md text-accentOne hover:bg-accentTwo 
         ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const PageButton = ({ children, className, ...rest }) => {
  return (
    <button
      type="button"
      className={`
        "relative inline-flex items-center p-2 text-sm font-medium text-accentOne hover:bg-accentTwo 
        ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <label className="flex gap-x-2 items-baseline">
      <Input
        type="text"
        Icon={FaSearch}
        border={false}
        value={value || ""}
        name="search"
        setValue={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
};

export const CustomFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  //   TODO use react-select here
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export const WidgetSingle = ({ data, label }) => {
  return (
    <div className="bg-accentTwo p-4 rounded-md w-full min-w-[250px]  md:w-[500px] max-w-[600px] shadow-lg">
      <div className="w-full h-full py-4">
        <h1 className="font-bold text-2xl text-center mb-2">{label}</h1>
        <div
          className={`font-bold text-center ${
            typeof data === "number" ? "text-8xl" : "text-3xl"
          }`}
        >
          {data}
        </div>
      </div>
    </div>
  );
};

export const TableHeader = ({ title }) => {
  return <h1 className="text-xl font-bold">{title}</h1>;
};
