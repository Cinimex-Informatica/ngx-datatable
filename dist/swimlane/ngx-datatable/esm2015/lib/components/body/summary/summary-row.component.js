import { Component, Input } from '@angular/core';
function defaultSumFunc(cells) {
  const cellsWithValues = cells.filter(cell => !!cell);
  if (!cellsWithValues.length) {
    return null;
  }
  if (cellsWithValues.some(cell => typeof cell !== 'number')) {
    return null;
  }
  return cellsWithValues.reduce((res, cell) => res + cell);
}
function noopSumFunc(cells) {
  return null;
}
export class DataTableSummaryRowComponent {
  constructor() {
    this.summaryRow = {};
  }
  ngOnChanges() {
    if (!this.columns || !this.rows) {
      return;
    }
    this.updateInternalColumns();
    this.updateValues();
  }
  updateInternalColumns() {
    this._internalColumns = this.columns.map(col =>
      Object.assign(Object.assign({}, col), { cellTemplate: col.summaryTemplate })
    );
  }
  updateValues() {
    this.summaryRow = {};
    this.columns
      .filter(col => !col.summaryTemplate)
      .forEach(col => {
        const cellsFromSingleColumn = this.rows.map(row => row[col.prop]);
        const sumFunc = this.getSummaryFunction(col);
        this.summaryRow[col.prop] = col.pipe
          ? col.pipe.transform(sumFunc(cellsFromSingleColumn))
          : sumFunc(cellsFromSingleColumn);
      });
  }
  getSummaryFunction(column) {
    if (column.summaryFunc === undefined) {
      return defaultSumFunc;
    } else if (column.summaryFunc === null) {
      return noopSumFunc;
    } else {
      return column.summaryFunc;
    }
  }
}
DataTableSummaryRowComponent.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'datatable-summary-row',
        template: `
    <datatable-body-row
      *ngIf="summaryRow && _internalColumns"
      tabindex="-1"
      [innerWidth]="innerWidth"
      [offsetX]="offsetX"
      [columns]="_internalColumns"
      [rowHeight]="rowHeight"
      [row]="summaryRow"
      [rowIndex]="-1"
    >
    </datatable-body-row>
  `,
        host: {
          class: 'datatable-summary-row'
        }
      }
    ]
  }
];
DataTableSummaryRowComponent.propDecorators = {
  rows: [{ type: Input }],
  columns: [{ type: Input }],
  rowHeight: [{ type: Input }],
  offsetX: [{ type: Input }],
  innerWidth: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9zdW1tYXJ5L3N1bW1hcnktcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBeUMsTUFBTSxlQUFlLENBQUM7QUFVeEYsU0FBUyxjQUFjLENBQUMsS0FBWTtJQUNsQyxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXJELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsRUFBRTtRQUMxRCxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsT0FBTyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFZO0lBQy9CLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQXFCRCxNQUFNLE9BQU8sNEJBQTRCO0lBbkJ6QztRQTRCRSxlQUFVLEdBQVEsRUFBRSxDQUFDO0lBeUN2QixDQUFDO0lBdkNDLFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDL0IsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxxQkFBcUI7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsaUNBQzNDLEdBQUcsS0FDTixZQUFZLEVBQUUsR0FBRyxDQUFDLGVBQWUsSUFDakMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVPLFlBQVk7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLE9BQU87YUFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUk7Z0JBQ2xDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDcEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGtCQUFrQixDQUFDLE1BQXNCO1FBQy9DLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDcEMsT0FBTyxjQUFjLENBQUM7U0FDdkI7YUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQ3RDLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO2FBQU07WUFDTCxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7WUFwRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSx1QkFBdUI7aUJBQy9CO2FBQ0Y7OzttQkFFRSxLQUFLO3NCQUNMLEtBQUs7d0JBRUwsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFBpcGVUcmFuc2Zvcm0sIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdW1tYXJ5Q29sdW1uIHtcclxuICBzdW1tYXJ5RnVuYz86IChjZWxsczogYW55W10pID0+IGFueTtcclxuICBzdW1tYXJ5VGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBwcm9wOiBzdHJpbmc7XHJcbiAgcGlwZT86IFBpcGVUcmFuc2Zvcm07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlZmF1bHRTdW1GdW5jKGNlbGxzOiBhbnlbXSk6IGFueSB7XHJcbiAgY29uc3QgY2VsbHNXaXRoVmFsdWVzID0gY2VsbHMuZmlsdGVyKGNlbGwgPT4gISFjZWxsKTtcclxuXHJcbiAgaWYgKCFjZWxsc1dpdGhWYWx1ZXMubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgaWYgKGNlbGxzV2l0aFZhbHVlcy5zb21lKGNlbGwgPT4gdHlwZW9mIGNlbGwgIT09ICdudW1iZXInKSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2VsbHNXaXRoVmFsdWVzLnJlZHVjZSgocmVzLCBjZWxsKSA9PiByZXMgKyBjZWxsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm9vcFN1bUZ1bmMoY2VsbHM6IGFueVtdKTogdm9pZCB7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLXN1bW1hcnktcm93JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRhdGF0YWJsZS1ib2R5LXJvd1xyXG4gICAgICAqbmdJZj1cInN1bW1hcnlSb3cgJiYgX2ludGVybmFsQ29sdW1uc1wiXHJcbiAgICAgIHRhYmluZGV4PVwiLTFcIlxyXG4gICAgICBbaW5uZXJXaWR0aF09XCJpbm5lcldpZHRoXCJcclxuICAgICAgW29mZnNldFhdPVwib2Zmc2V0WFwiXHJcbiAgICAgIFtjb2x1bW5zXT1cIl9pbnRlcm5hbENvbHVtbnNcIlxyXG4gICAgICBbcm93SGVpZ2h0XT1cInJvd0hlaWdodFwiXHJcbiAgICAgIFtyb3ddPVwic3VtbWFyeVJvd1wiXHJcbiAgICAgIFtyb3dJbmRleF09XCItMVwiXHJcbiAgICA+XHJcbiAgICA8L2RhdGF0YWJsZS1ib2R5LXJvdz5cclxuICBgLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnZGF0YXRhYmxlLXN1bW1hcnktcm93J1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVN1bW1hcnlSb3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIHJvd3M6IGFueVtdO1xyXG4gIEBJbnB1dCgpIGNvbHVtbnM6IElTdW1tYXJ5Q29sdW1uW107XHJcblxyXG4gIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIG9mZnNldFg6IG51bWJlcjtcclxuICBASW5wdXQoKSBpbm5lcldpZHRoOiBudW1iZXI7XHJcblxyXG4gIF9pbnRlcm5hbENvbHVtbnM6IElTdW1tYXJ5Q29sdW1uW107XHJcbiAgc3VtbWFyeVJvdzogYW55ID0ge307XHJcblxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgaWYgKCF0aGlzLmNvbHVtbnMgfHwgIXRoaXMucm93cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZUludGVybmFsQ29sdW1ucygpO1xyXG4gICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlSW50ZXJuYWxDb2x1bW5zKCkge1xyXG4gICAgdGhpcy5faW50ZXJuYWxDb2x1bW5zID0gdGhpcy5jb2x1bW5zLm1hcChjb2wgPT4gKHtcclxuICAgICAgLi4uY29sLFxyXG4gICAgICBjZWxsVGVtcGxhdGU6IGNvbC5zdW1tYXJ5VGVtcGxhdGVcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlVmFsdWVzKCkge1xyXG4gICAgdGhpcy5zdW1tYXJ5Um93ID0ge307XHJcblxyXG4gICAgdGhpcy5jb2x1bW5zXHJcbiAgICAgIC5maWx0ZXIoY29sID0+ICFjb2wuc3VtbWFyeVRlbXBsYXRlKVxyXG4gICAgICAuZm9yRWFjaChjb2wgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNlbGxzRnJvbVNpbmdsZUNvbHVtbiA9IHRoaXMucm93cy5tYXAocm93ID0+IHJvd1tjb2wucHJvcF0pO1xyXG4gICAgICAgIGNvbnN0IHN1bUZ1bmMgPSB0aGlzLmdldFN1bW1hcnlGdW5jdGlvbihjb2wpO1xyXG5cclxuICAgICAgICB0aGlzLnN1bW1hcnlSb3dbY29sLnByb3BdID0gY29sLnBpcGVcclxuICAgICAgICAgID8gY29sLnBpcGUudHJhbnNmb3JtKHN1bUZ1bmMoY2VsbHNGcm9tU2luZ2xlQ29sdW1uKSlcclxuICAgICAgICAgIDogc3VtRnVuYyhjZWxsc0Zyb21TaW5nbGVDb2x1bW4pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0U3VtbWFyeUZ1bmN0aW9uKGNvbHVtbjogSVN1bW1hcnlDb2x1bW4pOiAoYTogYW55W10pID0+IGFueSB7XHJcbiAgICBpZiAoY29sdW1uLnN1bW1hcnlGdW5jID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIGRlZmF1bHRTdW1GdW5jO1xyXG4gICAgfSBlbHNlIGlmIChjb2x1bW4uc3VtbWFyeUZ1bmMgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIG5vb3BTdW1GdW5jO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGNvbHVtbi5zdW1tYXJ5RnVuYztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
