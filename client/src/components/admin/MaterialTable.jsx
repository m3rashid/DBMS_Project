import MaterialTable from "material-table";
import React from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: React.forwardRef(() => <AddBox />),
  Check: React.forwardRef(() => <Check />),
  Clear: React.forwardRef(() => <Clear />),
  Delete: React.forwardRef(() => <DeleteOutline />),
  DetailPanel: React.forwardRef(() => <ChevronRight />),
  Edit: React.forwardRef(() => <Edit />),
  Export: React.forwardRef(() => <SaveAlt />),
  Filter: React.forwardRef(() => <FilterList />),
  FirstPage: React.forwardRef(() => <FirstPage />),
  LastPage: React.forwardRef(() => <LastPage />),
  NextPage: React.forwardRef(() => <ChevronRight />),
  PreviousPage: React.forwardRef(() => <ChevronLeft />),
  ResetSearch: React.forwardRef(() => <Clear />),
  Search: React.forwardRef(() => <Search />),
  SortArrow: React.forwardRef(() => <ArrowDownward />),
  ThirdStateCheck: React.forwardRef(() => <Remove />),
  ViewColumn: React.forwardRef(() => <ViewColumn />),
};

const Table = ({ columns, data, Title }) => {
  return (
    <div className="w-screen p-4 md:p-6 max-w-[1400px]">
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data}
        title={<h1 className="text-xl font-bold">{Title}</h1>}
        style={{
          borderRadius: "0.375rem",
          backgroundColor: "#e2e8f0",
        }}
        options={{
          pageSizeOptions: [5, 10, 20, 50, 100],
          debounceInterval: 1000,
          headerStyle: {
            backgroundColor: "#475569",
            position: "sticky",
            top: 0,
            color: "#FFFFFF",
            fontWeight: "bold",
          },
          rowStyle: (_, index) => {
            if (index % 2) {
              return {
                backgroundColor: "#f1f5f9",
              };
            }
            return {};
          },
        }}
      />
    </div>
  );
};

export default Table;
