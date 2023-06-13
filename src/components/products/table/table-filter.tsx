import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';

interface TableProps<T> {
  table: Table<T>;
}

export function TableFilter<T>({ table }: TableProps<T>) {
  return (
    <Input
      type="text"
      onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
      value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
      placeholder="Filter products..."
    />
  );
}
