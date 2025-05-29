import { Table, type TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../constants';

interface DataTableProps<T = any> extends Omit<TableProps<T>, 'columns' | 'dataSource'> {
  columns: ColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  pageSizeOptions?: string[];
  defaultPageSize?: number;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  dataSource,
  loading = false,
  showSizeChanger = true,
  showQuickJumper = true,
  showTotal = true,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  defaultPageSize = DEFAULT_PAGE_SIZE,
  ...rest
}: DataTableProps<T>) => {
  const paginationConfig = {
    showSizeChanger,
    showQuickJumper,
    showTotal: showTotal ? (total: number, range: [number, number]) => 
      `${range[0]}-${range[1]} of ${total} items` : undefined,
    pageSizeOptions,
    defaultPageSize,
    responsive: true,
  };

  return (
    <Table<T>
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={paginationConfig}
      scroll={{ x: 'max-content' }}
      size="middle"
      {...rest}
    />
  );
};

export default DataTable;