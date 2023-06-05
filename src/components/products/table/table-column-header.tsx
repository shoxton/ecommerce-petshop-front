import { Column } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronsUpDownIcon, SortAsc, SortDesc } from 'lucide-react';

export interface TableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function TableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: TableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div>{title}</div>;
  }

  const sortDesc = column.getIsSorted() === 'desc';

  return (
    <div className={cn(className)}>
      <Button
        onClick={() => column.toggleSorting(!sortDesc)}
        variant={'ghost'}
        size={'sm'}
        className="-ml-3 h-8"
      >
        <span>{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <SortDesc className="h-4 w-4 ml-2" />
        ) : column.getIsSorted() === 'asc' ? (
          <SortAsc className="h-4 w-4 ml-2" />
        ) : (
          <ChevronsUpDownIcon className="h-4 w-4 ml-2" />
        )}
      </Button>
    </div>
  );
}
