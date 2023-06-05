import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from './table-column-header';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export interface Product {
  name: string;
  sku: string;
  status: string;
  price: string;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'sku',
    header: ({ column }) => <TableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => (
      <span className="text-slate-500 font-mono tracking-wider">
        {row.getValue('sku')}
      </span>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <TableColumnHeader column={column} title="Price" />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Status"
        className="text-right"
      />
    ),
    cell: ({ row }) => {
      const isEnabled = row.original.status === 'Enabled';
      return (
        <div className="flex justify-end text-right">
          {isEnabled ? (
            <EyeIcon className="text-blue-500 w-5 h-5" />
          ) : (
            <EyeOffIcon className="text-slate-500 tw-5 h-5" />
          )}
        </div>
      );
    },
  },
];
