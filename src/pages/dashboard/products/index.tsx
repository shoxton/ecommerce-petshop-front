import DashboardLayout from '@/layouts/dashboard';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

const invoices = [
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
    name: 'Product name',
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
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SKU</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.sku}>
            <TableCell className="font-medium">{invoice.sku}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.price}</TableCell>
            <TableCell className="text-right">{invoice.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
