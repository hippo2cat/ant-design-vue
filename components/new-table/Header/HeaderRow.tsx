import { defineComponent } from 'vue';
import Cell from '../Cell';
import { useInjectTable } from '../context/TableContext';
import {
  CellType,
  StickyOffsets,
  ColumnType,
  CustomizeComponent,
  GetComponentProps,
  DefaultRecordType,
} from '../interface';
import { getCellFixedInfo } from '../utils/fixUtil';
import { getColumnsKey } from '../utils/valueUtil';

export interface RowProps<RecordType = DefaultRecordType> {
  cells: readonly CellType<RecordType>[];
  stickyOffsets: StickyOffsets;
  flattenColumns: readonly ColumnType<RecordType>[];
  rowComponent: CustomizeComponent;
  cellComponent: CustomizeComponent;
  onHeaderRow: GetComponentProps<readonly ColumnType<RecordType>[]>;
  index: number;
}

export default defineComponent<RowProps>({
  name: 'HeaderRow',
  props: [
    'cells',
    'stickyOffsets',
    'flattenColumns',
    'rowComponent',
    'cellComponent',
    'index',
    'onHeaderRow',
  ] as any,
  setup(props: RowProps) {
    const tableContext = useInjectTable();
    return () => {
      const { prefixCls, direction } = tableContext;
      const {
        cells,
        stickyOffsets,
        flattenColumns,
        rowComponent: RowComponent,
        cellComponent: CellComponent,
        onHeaderRow,
        index,
      } = props;

      let rowProps;
      if (onHeaderRow) {
        rowProps = onHeaderRow(
          cells.map(cell => cell.column),
          index,
        );
      }

      const columnsKey = getColumnsKey(cells.map(cell => cell.column));

      return (
        <RowComponent {...rowProps}>
          {cells.map((cell: CellType, cellIndex) => {
            const { column } = cell;
            const fixedInfo = getCellFixedInfo(
              cell.colStart,
              cell.colEnd,
              flattenColumns,
              stickyOffsets,
              direction,
            );

            let additionalProps;
            if (column && column.onHeaderCell) {
              additionalProps = cell.column.onHeaderCell(column);
            }

            return (
              <Cell
                {...cell}
                ellipsis={column.ellipsis}
                align={column.align}
                component={CellComponent}
                prefixCls={prefixCls}
                key={columnsKey[cellIndex]}
                {...fixedInfo}
                additionalProps={additionalProps}
                rowType="header"
                column={column}
              />
            );
          })}
        </RowComponent>
      );
    };
  },
});