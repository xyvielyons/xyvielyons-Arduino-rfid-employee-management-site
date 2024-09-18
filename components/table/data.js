import React from "react";
const columns = [
  {name: "ID", uid: "_id", sortable: true},
  {name: "USERNAME", uid: "firstName", sortable: true},
  {name: "PHONE", uid: "phoneNumber", sortable: true},
  {name: "IDNUMBER", uid: "idNumber"},
  {name: "TAG", uid: "tagNumber"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];


export {columns,statusOptions};
