import DashboardLayout from '@/layouts/dashboard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from '@/components/products/table/columns';

export default function Products() {
  return (
    <DashboardLayout>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <TableDemo />
      </div>
    </DashboardLayout>
  );
}

const products = [
  {
    name: 'Product name',
    sku: 'ABC1',
    status: 'Enabled',
    price: '$250.00',
  },
  {
    name: 'Product name',
    sku: 'ACB2',
    status: 'Disabled',
    price: '$150.00',
  },
  {
    name: 'Product name',
    sku: 'ABC3',
    status: 'Disabled',
    price: '$350.00',
  },
  {
    name: 'Product name',
    sku: 'ABC4',
    status: 'Enabled',
    price: '$450.00',
  },
  {
    name: 'Product name',
    sku: 'ABC5',
    status: 'Enabled',
    price: '$550.00',
  },
  {
    name: 'The SAS interface is down, bypass the opeacitor!',
    sku: 'ABC6',
    status: 'Disabled',
    price: '$200.00',
  },
  {
    name: 'Product name',
    sku: 'ABC7',
    status: 'Disabled',
    price: '$300.00',
  },
];

export function TableDemo() {
  const table = useReactTable({
    data: products,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
