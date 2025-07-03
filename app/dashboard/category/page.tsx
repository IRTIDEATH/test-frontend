"use client";

import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  LoaderCircleIcon,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  categoryCreate,
  categoryEdit,
  categoryList,
} from "@/lib/api/CategoryApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  TCategory,
  TCategoryListResponse,
  TPaginationState,
  TSearchFilters,
} from "./components/type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLocalStorage } from "react-use";

const formCreateSchema = z.object({
  name: z.string().min(1, "Category field cannot be empty"),
});

export default function Page() {
  const [token, _] = useLocalStorage("token", "");
  const [category, setCategory] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<TSearchFilters>({
    search: "",
  });
  const [pagination, setPagination] = useState<TPaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  // const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const columns: ColumnDef<TCategory>[] = [
    {
      accessorKey: "name",
      header: "Category",
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex items-center justify-center gap-4">
            <Dialog>
              <form>
                <DialogTrigger className="text-primary underline underline-offset-2 cursor-pointer">
                  Edit
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription className="sr-only"></DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 mt-6">
                    <Label htmlFor="name-1">Category</Label>
                    <Input
                      id="name-1"
                      name="name"
                      defaultValue="Edit category"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger className="text-destructive underline underline-offset-2 cursor-pointer">
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Category</AlertDialogTitle>
                  <AlertDialogDescription>
                    Delete category {"“"}{category.name}{"”"}? This will remove it from master data permanently.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const tables = useReactTable({
    data: category,
    columns,
    pageCount: totalPages,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await categoryList({
        ...filters,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (response.status === 200) {
        const data: TCategoryListResponse = response.data;
        setCategory(data.data);
        setTotalPages(data.totalPages);
        setTotalData(data.totalData);
      } else {
        console.log(response.data?.errors);
      }
    } catch (error: any) {
      console.log(error.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setPagination({ ...pagination, pageIndex: 0 });
  //   fetchCategory();
  // };

  const isFirstLoad = useRef(true);

  // const resetFilters = () => {
  //   setFilters({ search: "" });
  //   setPagination({ ...pagination, pageIndex: 0 });
  // };

  useEffect(() => {
    if (typeof window !== "undefined" && searchParams) {
      if (isFirstLoad.current) {
        // Inisialisasi dari URL params saat pertama kali load
        const page = parseInt(searchParams.get("page") || "1", 10) - 1;
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        setPagination({
          pageIndex: page >= 0 ? page : 0,
          pageSize: limit,
        });
        isFirstLoad.current = false;
        fetchCategory();
      } else {
        // Update URL dan fetch data saat pagination/filters berubah
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", (pagination.pageIndex + 1).toString());
        params.set("limit", pagination.pageSize.toString());
        router.replace(`?${params.toString()}`);

        fetchCategory();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize, filters]);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formCreate = useForm<z.infer<typeof formCreateSchema>>({
    resolver: zodResolver(formCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formCreateSchema>) {
    try {
      await categoryCreate(token ?? undefined, values);
      toast.success("Berhasil membuat", {
        description: "Anda telah membuat category baru",
      });
      formCreate.reset();
      fetchCategory();
    } catch (error) {
      console.log(error);
      toast.error("Ada yang salah", {
        description: "Ada sesuatu yang salah",
      });
    } finally {
      setIsSubmitting(false);
      setDialogOpen(false);
    }
  }

  return (
    <div className="m-6 rounded-xl border-2">
      {/* Contacts Table */}
      <div className="w-full">
        <div className="p-6 w-full flex items-center justify-between">
          <span>Total Category : {totalData}</span>
        </div>
        <div className="p-6 w-full flex items-center justify-between border-t">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles"
              className="pl-10 bg-white border text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus /> Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mb-6">
                <DialogTitle>Add category</DialogTitle>
                <DialogDescription className="sr-only"></DialogDescription>
              </DialogHeader>

              <Form {...formCreate}>
                <form onSubmit={formCreate.handleSubmit(onSubmit)}>
                  <FormField
                    disabled={isSubmitting}
                    control={formCreate.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Category</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input category"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter className="mt-8">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    {isSubmitting ? (
                      <Button disabled type="submit">
                        <LoaderCircleIcon
                          className="-ms-1 animate-spin"
                          size={16}
                          aria-hidden="true"
                        />
                        Adding...
                      </Button>
                    ) : (
                      <Button type="submit">Add</Button>
                    )}
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            {tables.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-center bg-secondary border-t"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border-b">
            {tables.getRowModel().rows?.length ? (
              tables.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="h-20 text-center text-secondary-foreground"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loading ? "Loading..." : "No contacts found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: Math.max(prev.pageIndex - 1, 0),
                  }))
                }
                aria-disabled={pagination.pageIndex === 0}
                tabIndex={pagination.pageIndex === 0 ? -1 : 0}
                className={
                  pagination.pageIndex === 0
                    ? "opacity-50 pointer-events-none"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  isActive={pagination.pageIndex === idx}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, pageIndex: idx }))
                  }
                  className={
                    pagination.pageIndex === idx
                      ? "pointer-events-none border-primary text-primary"
                      : "cursor-pointer"
                  }
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: Math.min(prev.pageIndex + 1, totalPages - 1),
                  }))
                }
                aria-disabled={pagination.pageIndex + 1 >= totalPages}
                tabIndex={pagination.pageIndex + 1 >= totalPages ? -1 : 0}
                className={`${
                  pagination.pageIndex + 1 >= totalPages
                    ? "opacity-50 pointer-events-none"
                    : "cursor-pointer"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
