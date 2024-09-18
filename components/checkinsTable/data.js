import React from "react";
const columns = [
  {name: "ID", uid: "_id", sortable: true},
  {name: "USERNAME", uid: "firstName", sortable: true},
  {name: "TAG", uid: "tagNumber"},
  {name: "DATE", uid: "date"},
  {name: "TIME", uid: "time"},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];


export {columns,statusOptions};
