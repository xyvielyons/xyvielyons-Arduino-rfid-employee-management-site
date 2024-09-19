'use client'
import React,{useEffect,useState} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor
} from "@nextui-org/react";
import {PlusIcon} from "./PlusIcon";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {SearchIcon} from "./SearchIcon";
import {columns, statusOptions} from "./data";
import {capitalize} from "./utils";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import StepForm from "../forms/StepForm";
import Steps from "../forms/Steps";
import { useQuery,useQueryClient } from "react-query";
import axios from "axios";
import { GrView } from "react-icons/gr";
import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner"
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["firstName","tagNumber", "status", "actions"];

let users:any = []
type User = typeof users[0];
import { useUser } from '@clerk/clerk-react'


export default function TableComponent({callToAction}:{callToAction:string}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [employeeDetails, setEmployeeDetails] = useState<any>()
  const {isOpen:isOpenView, onOpen:onOpenView, onOpenChange:onOpenChangeView} = useDisclosure();
  const {isOpen:isOpenDelete, onOpen:onOpenDelete, onOpenChange:onOpenChangeDelete} = useDisclosure();
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const {user} = useUser()
  const {isLoading,data} = useQuery('getemployees',()=>{
    return axios.post('http://127.0.0.1:3001/api/arduino/employee/getemployees',{
      organizationId:user?.publicMetadata.organizationId
    })
  },//this is where we set the default caching duration 
  {
    cacheTime:5000,//this is in (ms)
    refetchInterval:5000
  })
  
  const queryClient = useQueryClient()
  useEffect(() => {
    if(!isLoading && data){
      const employeeData = data.data
      users = [...employeeData]
    }

  }, [isLoading,data])




  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.firstName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "firstName":
        return (
          <User
            avatarProps={{radius: "full", size: "sm", src: user.imageUrl}}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={`${cellValue} ${user.lastName}`}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" width="24" height="24" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>

                <DropdownItem onClick={()=>{
                  onOpenView()
                  setEmployeeDetails(user)
                }}>
                  <div className="flex items-center justify-start flex-row space-x-2">
                      <div className="">
                        <GrView className="w-[24px] h-[24px] text-gray-600 "/>
                      </div> 
                      <div className="">
                        View employee
                      </div>
                  </div>
                  
                </DropdownItem>
                <DropdownItem onClick={()=>{
                  onOpenDelete()
                  setEmployeeDetails(user)
                }}>
                  <div className="flex items-center justify-start flex-row space-x-2">
                      <div className="">
                        <AiOutlineDelete className="w-[24px] h-[24px] text-gray-600 "/>
                      </div> 
                      <div className="">
                        Delete employee
                      </div>
                  </div>
                  
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by firstname..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-foreground text-background"
              startContent={<PlusIcon width="24" height="24" />}
              size="sm"
              onClick={onOpen}
            >
              {callToAction}
            </Button>
           
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} employees</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );
 async function deleteEmployee(employeeId:any){
  console.log("pressed")
  const id = {
    id:employeeId
  }
  try {
    const res = await axios.post('http://127.0.0.1:3001/api/arduino/employee/deleteEmployee',id,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token'
      }
    });
    toast("Employee deleted")
    queryClient.invalidateQueries('getemployees')

    console.log(res)
  } catch (error) {
    console.log(error)
    throw new Error("failed to delete employee")
  }
    
    

 }
  return (
    <div className="">
<div className=""><Table
      isStriped
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns} className="">
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No employees found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    
    </div>
      <div className="">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <Steps/>
                    
                    </ModalHeader>
                  <ModalBody className="pb-4">
                    <StepForm closeTrigger={onClose}/>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal isOpen={isOpenView} onOpenChange={onOpenChangeView}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Employee Details</ModalHeader>
                  <ModalBody>
                    <div className="space-y-2">
                      <div className="flex flex-row items-center justify-center space-x-2">
                        <Image src={employeeDetails.imageUrl} alt="profile picture" width={100} height={100} className="rounded-full"></Image>
                        <div className="">
                          <p className="headingsix font-medium text-gray-800">{`${employeeDetails.firstName} ${employeeDetails.lastName}`}</p>
                          <p className="text-gray-600">{`${employeeDetails.email}`}</p>
                        </div>
                      </div>
                      <div className="pl-8">
                        <p className="text-gray-600 font-medium">Tag Number:<span className="ml-2 text-gray-800">{employeeDetails.tagNumber}</span></p>
                        <p className="text-gray-600 font-medium">Id Number:<span className="ml-2 text-gray-800">{employeeDetails.idNumber}</span></p>
                        <p className="text-gray-600 font-medium">status:<span className="ml-2 text-gray-800">{employeeDetails.status}</span></p>
                      </div>

                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Delete employee</ModalHeader>
                  <ModalBody>
                    <p>Are you sure you would like to delete the employee <span className="headingsix font-medium text-gray-600">{`${employeeDetails.firstName} ${employeeDetails.lastName}`}</span></p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onClick={()=>{
                      deleteEmployee(employeeDetails._id)
                      onClose()
                    }}>
                      Delete
                    </Button>
                    <Button color="default" variant="light" onPress={onClose}>
                      close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
         
      </div>
    </div>
    
  );
}
