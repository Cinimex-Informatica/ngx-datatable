import {
  Component,
  Input,
  HostBinding,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewContainerRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { SortDirection } from '../../types/sort-direction.type';
import { Keys } from '../../utils/keys';
export class DataTableBodyCellComponent {
  constructor(element, cd) {
    this.cd = cd;
    this.activate = new EventEmitter();
    this.treeAction = new EventEmitter();
    this.isFocused = false;
    this.onCheckboxChangeFn = this.onCheckboxChange.bind(this);
    this.activateFn = this.activate.emit.bind(this.activate);
    this.cellContext = {
      onCheckboxChangeFn: this.onCheckboxChangeFn,
      activateFn: this.activateFn,
      row: this.row,
      group: this.group,
      value: this.value,
      column: this.column,
      rowHeight: this.rowHeight,
      isSelected: this.isSelected,
      rowIndex: this.rowIndex,
      treeStatus: this.treeStatus,
      onTreeAction: this.onTreeAction.bind(this)
    };
    this._element = element.nativeElement;
  }
  set group(group) {
    this._group = group;
    this.cellContext.group = group;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get group() {
    return this._group;
  }
  set rowHeight(val) {
    this._rowHeight = val;
    this.cellContext.rowHeight = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get rowHeight() {
    return this._rowHeight;
  }
  set isSelected(val) {
    this._isSelected = val;
    this.cellContext.isSelected = val;
    this.cd.markForCheck();
  }
  get isSelected() {
    return this._isSelected;
  }
  set expanded(val) {
    this._expanded = val;
    this.cellContext.expanded = val;
    this.cd.markForCheck();
  }
  get expanded() {
    return this._expanded;
  }
  set rowIndex(val) {
    this._rowIndex = val;
    this.cellContext.rowIndex = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get rowIndex() {
    return this._rowIndex;
  }
  set column(column) {
    this._column = column;
    this.cellContext.column = column;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get column() {
    return this._column;
  }
  set row(row) {
    this._row = row;
    this.cellContext.row = row;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get row() {
    return this._row;
  }
  set sorts(val) {
    this._sorts = val;
    this.calcSortDir = this.calcSortDir(val);
  }
  get sorts() {
    return this._sorts;
  }
  set treeStatus(status) {
    if (status !== 'collapsed' && status !== 'expanded' && status !== 'loading' && status !== 'disabled') {
      this._treeStatus = 'collapsed';
    } else {
      this._treeStatus = status;
    }
    this.cellContext.treeStatus = this._treeStatus;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get treeStatus() {
    return this._treeStatus;
  }
  get columnCssClasses() {
    let cls = 'datatable-body-cell';
    if (this.column.cellClass) {
      if (typeof this.column.cellClass === 'string') {
        cls += ' ' + this.column.cellClass;
      } else if (typeof this.column.cellClass === 'function') {
        const res = this.column.cellClass({
          row: this.row,
          group: this.group,
          column: this.column,
          value: this.value,
          rowHeight: this.rowHeight
        });
        if (typeof res === 'string') {
          cls += ' ' + res;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) {
              cls += ` ${k}`;
            }
          }
        }
      }
    }
    if (!this.sortDir) {
      cls += ' sort-active';
    }
    if (this.isFocused) {
      cls += ' active';
    }
    if (this.sortDir === SortDirection.asc) {
      cls += ' sort-asc';
    }
    if (this.sortDir === SortDirection.desc) {
      cls += ' sort-desc';
    }
    return cls;
  }
  get width() {
    return this.column.width;
  }
  get minWidth() {
    return this.column.minWidth;
  }
  get maxWidth() {
    return this.column.maxWidth;
  }
  get height() {
    const height = this.rowHeight;
    if (isNaN(height)) {
      return height;
    }
    return height + 'px';
  }
  ngDoCheck() {
    this.checkValueUpdates();
  }
  ngOnDestroy() {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
  }
  checkValueUpdates() {
    let value = '';
    if (!this.row || !this.column) {
      value = '';
    } else {
      const val = this.column.$$valueGetter(this.row, this.column.prop);
      const userPipe = this.column.pipe;
      if (userPipe) {
        value = userPipe.transform(val);
      } else if (value !== undefined) {
        value = val;
      }
    }
    if (this.value !== value) {
      this.value = value;
      this.cellContext.value = value;
      this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
      this.cd.markForCheck();
    }
  }
  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
  }
  onClick(event) {
    this.activate.emit({
      type: 'click',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element
    });
  }
  onDblClick(event) {
    this.activate.emit({
      type: 'dblclick',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element
    });
  }
  onKeyDown(event) {
    const keyCode = event.keyCode;
    const isTargetCell = event.target === this._element;
    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;
    if (isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();
      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row,
        group: this.group,
        rowHeight: this.rowHeight,
        column: this.column,
        value: this.value,
        cellElement: this._element
      });
    }
  }
  onCheckboxChange(event) {
    this.activate.emit({
      type: 'checkbox',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element,
      treeStatus: 'collapsed'
    });
  }
  calcSortDir(sorts) {
    if (!sorts) {
      return;
    }
    const sort = sorts.find(s => {
      return s.prop === this.column.prop;
    });
    if (sort) {
      return sort.dir;
    }
  }
  stripHtml(html) {
    if (!html.replace) {
      return html;
    }
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }
  onTreeAction() {
    this.treeAction.emit(this.row);
  }
  calcLeftMargin(column, row) {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? row.level * levelIndent : 0;
  }
}
DataTableBodyCellComponent.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'datatable-body-cell',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <div class="datatable-body-cell-label" [style.margin-left.px]="calcLeftMargin(column, row)">
      <label
        *ngIf="column.checkboxable && (!displayCheck || displayCheck(row, column, value))"
        class="datatable-checkbox"
      >
        <input type="checkbox" [checked]="isSelected" (click)="onCheckboxChange($event)" [disabled]="selectCheck && !selectCheck(row)" />
      </label>
      <ng-container *ngIf="column.isTreeColumn">
        <button
          *ngIf="!column.treeToggleTemplate"
          class="datatable-tree-button"
          [disabled]="treeStatus === 'disabled'"
          (click)="onTreeAction()"
        >
          <span>
            <i *ngIf="treeStatus === 'loading'" class="icon datatable-icon-collapse"></i>
            <i *ngIf="treeStatus === 'collapsed'" class="icon datatable-icon-up"></i>
            <i *ngIf="treeStatus === 'expanded' || treeStatus === 'disabled'" class="icon datatable-icon-down"></i>
          </span>
        </button>
        <ng-template
          *ngIf="column.treeToggleTemplate"
          [ngTemplateOutlet]="column.treeToggleTemplate"
          [ngTemplateOutletContext]="{ cellContext: cellContext }"
        >
        </ng-template>
      </ng-container>

      <span *ngIf="!column.cellTemplate" [title]="sanitizedValue" [innerHTML]="value"> </span>
      <ng-template
        #cellTemplate
        *ngIf="column.cellTemplate"
        [ngTemplateOutlet]="column.cellTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
    </div>
  `
      }
    ]
  }
];
DataTableBodyCellComponent.ctorParameters = () => [{ type: ElementRef }, { type: ChangeDetectorRef }];
DataTableBodyCellComponent.propDecorators = {
  displayCheck: [{ type: Input }],
  selectCheck: [{ type: Input }],
  group: [{ type: Input }],
  rowHeight: [{ type: Input }],
  isSelected: [{ type: Input }],
  expanded: [{ type: Input }],
  rowIndex: [{ type: Input }],
  column: [{ type: Input }],
  row: [{ type: Input }],
  sorts: [{ type: Input }],
  treeStatus: [{ type: Input }],
  activate: [{ type: Output }],
  treeAction: [{ type: Output }],
  cellTemplate: [{ type: ViewChild, args: ['cellTemplate', { read: ViewContainerRef, static: true }] }],
  columnCssClasses: [{ type: HostBinding, args: ['class'] }],
  width: [{ type: HostBinding, args: ['style.width.px'] }],
  minWidth: [{ type: HostBinding, args: ['style.minWidth.px'] }],
  maxWidth: [{ type: HostBinding, args: ['style.maxWidth.px'] }],
  height: [{ type: HostBinding, args: ['style.height'] }],
  onFocus: [{ type: HostListener, args: ['focus'] }],
  onBlur: [{ type: HostListener, args: ['blur'] }],
  onClick: [{ type: HostListener, args: ['click', ['$event']] }],
  onDblClick: [{ type: HostListener, args: ['dblclick', ['$event']] }],
  onKeyDown: [{ type: HostListener, args: ['keydown', ['$event']] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2JvZHkvYm9keS1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFDWixVQUFVLEVBQ1YsZ0JBQWdCLEVBR2hCLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBK0N4QyxNQUFNLE9BQU8sMEJBQTBCO0lBcU1yQyxZQUFZLE9BQW1CLEVBQVUsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE5RnBELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUEyRTdELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsdUJBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCxlQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQWdCbEQsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNqQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixLQUFLLEVBQUUsSUFBSSxDQUFD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c0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgUGlwZVRyYW5zZm9ybSxcclxuICBIb3N0QmluZGluZyxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRWxlbWVudFJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIE9uRGVzdHJveSxcclxuICBEb0NoZWNrLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uLy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcclxuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQtZGlyZWN0aW9uLnR5cGUnO1xyXG5pbXBvcnQgeyBLZXlzIH0gZnJvbSAnLi4vLi4vdXRpbHMva2V5cyc7XHJcblxyXG5leHBvcnQgdHlwZSBUcmVlU3RhdHVzID0gJ2NvbGxhcHNlZCcgfCAnZXhwYW5kZWQnIHwgJ2xvYWRpbmcnIHwgJ2Rpc2FibGVkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWJvZHktY2VsbCcsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJkYXRhdGFibGUtYm9keS1jZWxsLWxhYmVsXCIgW3N0eWxlLm1hcmdpbi1sZWZ0LnB4XT1cImNhbGNMZWZ0TWFyZ2luKGNvbHVtbiwgcm93KVwiPlxyXG4gICAgICA8bGFiZWxcclxuICAgICAgICAqbmdJZj1cImNvbHVtbi5jaGVja2JveGFibGUgJiYgKCFkaXNwbGF5Q2hlY2sgfHwgZGlzcGxheUNoZWNrKHJvdywgY29sdW1uLCB2YWx1ZSkpXCJcclxuICAgICAgICBjbGFzcz1cImRhdGF0YWJsZS1jaGVja2JveFwiXHJcbiAgICAgID5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChjbGljayk9XCJvbkNoZWNrYm94Q2hhbmdlKCRldmVudClcIiBbZGlzYWJsZWRdPVwic2VsZWN0Q2hlY2sgJiYgIXNlbGVjdENoZWNrKHJvdylcIiAvPlxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1uLmlzVHJlZUNvbHVtblwiPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgICpuZ0lmPVwiIWNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxyXG4gICAgICAgICAgY2xhc3M9XCJkYXRhdGFibGUtdHJlZS1idXR0b25cIlxyXG4gICAgICAgICAgW2Rpc2FibGVkXT1cInRyZWVTdGF0dXMgPT09ICdkaXNhYmxlZCdcIlxyXG4gICAgICAgICAgKGNsaWNrKT1cIm9uVHJlZUFjdGlvbigpXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgPGkgKm5nSWY9XCJ0cmVlU3RhdHVzID09PSAnbG9hZGluZydcIiBjbGFzcz1cImljb24gZGF0YXRhYmxlLWljb24tY29sbGFwc2VcIj48L2k+XHJcbiAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2NvbGxhcHNlZCdcIiBjbGFzcz1cImljb24gZGF0YXRhYmxlLWljb24tdXBcIj48L2k+XHJcbiAgICAgICAgICAgIDxpICpuZ0lmPVwidHJlZVN0YXR1cyA9PT0gJ2V4cGFuZGVkJyB8fCB0cmVlU3RhdHVzID09PSAnZGlzYWJsZWQnXCIgY2xhc3M9XCJpY29uIGRhdGF0YWJsZS1pY29uLWRvd25cIj48L2k+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgICAqbmdJZj1cImNvbHVtbi50cmVlVG9nZ2xlVGVtcGxhdGVcIlxyXG4gICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLnRyZWVUb2dnbGVUZW1wbGF0ZVwiXHJcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBjZWxsQ29udGV4dDogY2VsbENvbnRleHQgfVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgPHNwYW4gKm5nSWY9XCIhY29sdW1uLmNlbGxUZW1wbGF0ZVwiIFt0aXRsZV09XCJzYW5pdGl6ZWRWYWx1ZVwiIFtpbm5lckhUTUxdPVwidmFsdWVcIj4gPC9zcGFuPlxyXG4gICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAjY2VsbFRlbXBsYXRlXHJcbiAgICAgICAgKm5nSWY9XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4uY2VsbFRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY2VsbENvbnRleHRcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVCb2R5Q2VsbENvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgZGlzcGxheUNoZWNrOiAocm93OiBhbnksIGNvbHVtbj86IFRhYmxlQ29sdW1uLCB2YWx1ZT86IGFueSkgPT4gYm9vbGVhbjtcclxuICBASW5wdXQoKSBzZWxlY3RDaGVjazogYW55O1xyXG5cclxuICBASW5wdXQoKSBzZXQgZ3JvdXAoZ3JvdXA6IGFueSkge1xyXG4gICAgdGhpcy5fZ3JvdXAgPSBncm91cDtcclxuICAgIHRoaXMuY2VsbENvbnRleHQuZ3JvdXAgPSBncm91cDtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZ3JvdXAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXA7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgcm93SGVpZ2h0KHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9yb3dIZWlnaHQgPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0hlaWdodCA9IHZhbDtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93SGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd0hlaWdodDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBpc1NlbGVjdGVkKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faXNTZWxlY3RlZCA9IHZhbDtcclxuICAgIHRoaXMuY2VsbENvbnRleHQuaXNTZWxlY3RlZCA9IHZhbDtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdGVkO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGV4cGFuZGVkKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZXhwYW5kZWQgPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LmV4cGFuZGVkID0gdmFsO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCByb3dJbmRleCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcm93SW5kZXggPSB2YWw7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvd0luZGV4ID0gdmFsO1xyXG4gICAgdGhpcy5jaGVja1ZhbHVlVXBkYXRlcygpO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCByb3dJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd0luZGV4O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGNvbHVtbihjb2x1bW46IFRhYmxlQ29sdW1uKSB7XHJcbiAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LmNvbHVtbiA9IGNvbHVtbjtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY29sdW1uKCk6IFRhYmxlQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW47XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgcm93KHJvdzogYW55KSB7XHJcbiAgICB0aGlzLl9yb3cgPSByb3c7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnJvdyA9IHJvdztcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcm93KCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcm93O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHNvcnRzKHZhbDogYW55W10pIHtcclxuICAgIHRoaXMuX3NvcnRzID0gdmFsO1xyXG4gICAgdGhpcy5jYWxjU29ydERpciA9IHRoaXMuY2FsY1NvcnREaXIodmFsKTtcclxuICB9XHJcblxyXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ydHM7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZXQgdHJlZVN0YXR1cyhzdGF0dXM6IFRyZWVTdGF0dXMpIHtcclxuICAgIGlmIChzdGF0dXMgIT09ICdjb2xsYXBzZWQnICYmIHN0YXR1cyAhPT0gJ2V4cGFuZGVkJyAmJiBzdGF0dXMgIT09ICdsb2FkaW5nJyAmJiBzdGF0dXMgIT09ICdkaXNhYmxlZCcpIHtcclxuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9ICdjb2xsYXBzZWQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fdHJlZVN0YXR1cyA9IHN0YXR1cztcclxuICAgIH1cclxuICAgIHRoaXMuY2VsbENvbnRleHQudHJlZVN0YXR1cyA9IHRoaXMuX3RyZWVTdGF0dXM7XHJcbiAgICB0aGlzLmNoZWNrVmFsdWVVcGRhdGVzKCk7XHJcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRyZWVTdGF0dXMoKTogVHJlZVN0YXR1cyB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHJlZVN0YXR1cztcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoKSB0cmVlQWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnY2VsbFRlbXBsYXRlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcclxuICBjZWxsVGVtcGxhdGU6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxyXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XHJcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1ib2R5LWNlbGwnO1xyXG4gICAgaWYgKHRoaXMuY29sdW1uLmNlbGxDbGFzcykge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmNlbGxDbGFzcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBjbHMgKz0gJyAnICsgdGhpcy5jb2x1bW4uY2VsbENsYXNzO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5jZWxsQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmNvbHVtbi5jZWxsQ2xhc3Moe1xyXG4gICAgICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxyXG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGNscyArPSAnICcgKyByZXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcyk7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xyXG4gICAgICAgICAgICBpZiAocmVzW2tdID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgY2xzICs9IGAgJHtrfWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghdGhpcy5zb3J0RGlyKSB7XHJcbiAgICAgIGNscyArPSAnIHNvcnQtYWN0aXZlJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzRm9jdXNlZCkge1xyXG4gICAgICBjbHMgKz0gJyBhY3RpdmUnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5hc2MpIHtcclxuICAgICAgY2xzICs9ICcgc29ydC1hc2MnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5kZXNjKSB7XHJcbiAgICAgIGNscyArPSAnIHNvcnQtZGVzYyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNscztcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKVxyXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLndpZHRoO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5taW5XaWR0aC5weCcpXHJcbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWluV2lkdGg7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1heFdpZHRoLnB4JylcclxuICBnZXQgbWF4V2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JylcclxuICBnZXQgaGVpZ2h0KCk6IHN0cmluZyB8IG51bWJlciB7XHJcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnJvd0hlaWdodDtcclxuICAgIGlmIChpc05hTihoZWlnaHQpKSB7XHJcbiAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVpZ2h0ICsgJ3B4JztcclxuICB9XHJcblxyXG4gIHNhbml0aXplZFZhbHVlOiBhbnk7XHJcbiAgdmFsdWU6IGFueTtcclxuICBzb3J0RGlyOiBTb3J0RGlyZWN0aW9uO1xyXG4gIGlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gIG9uQ2hlY2tib3hDaGFuZ2VGbiA9IHRoaXMub25DaGVja2JveENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gIGFjdGl2YXRlRm4gPSB0aGlzLmFjdGl2YXRlLmVtaXQuYmluZCh0aGlzLmFjdGl2YXRlKTtcclxuXHJcbiAgY2VsbENvbnRleHQ6IGFueTtcclxuXHJcbiAgcHJpdmF0ZSBfaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICBwcml2YXRlIF9zb3J0czogYW55W107XHJcbiAgcHJpdmF0ZSBfY29sdW1uOiBUYWJsZUNvbHVtbjtcclxuICBwcml2YXRlIF9yb3c6IGFueTtcclxuICBwcml2YXRlIF9ncm91cDogYW55O1xyXG4gIHByaXZhdGUgX3Jvd0hlaWdodDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX3Jvd0luZGV4OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfZWxlbWVudDogYW55O1xyXG4gIHByaXZhdGUgX3RyZWVTdGF0dXM6IFRyZWVTdGF0dXM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0ID0ge1xyXG4gICAgICBvbkNoZWNrYm94Q2hhbmdlRm46IHRoaXMub25DaGVja2JveENoYW5nZUZuLFxyXG4gICAgICBhY3RpdmF0ZUZuOiB0aGlzLmFjdGl2YXRlRm4sXHJcbiAgICAgIHJvdzogdGhpcy5yb3csXHJcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxyXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcclxuICAgICAgaXNTZWxlY3RlZDogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgICByb3dJbmRleDogdGhpcy5yb3dJbmRleCxcclxuICAgICAgdHJlZVN0YXR1czogdGhpcy50cmVlU3RhdHVzLFxyXG4gICAgICBvblRyZWVBY3Rpb246IHRoaXMub25UcmVlQWN0aW9uLmJpbmQodGhpcylcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hlY2tWYWx1ZVVwZGF0ZXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY2VsbFRlbXBsYXRlKSB7XHJcbiAgICAgIHRoaXMuY2VsbFRlbXBsYXRlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja1ZhbHVlVXBkYXRlcygpOiB2b2lkIHtcclxuICAgIGxldCB2YWx1ZSA9ICcnO1xyXG5cclxuICAgIGlmICghdGhpcy5yb3cgfHwgIXRoaXMuY29sdW1uKSB7XHJcbiAgICAgIHZhbHVlID0gJyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCB2YWwgPSB0aGlzLmNvbHVtbi4kJHZhbHVlR2V0dGVyKHRoaXMucm93LCB0aGlzLmNvbHVtbi5wcm9wKTtcclxuICAgICAgY29uc3QgdXNlclBpcGU6IFBpcGVUcmFuc2Zvcm0gPSB0aGlzLmNvbHVtbi5waXBlO1xyXG5cclxuICAgICAgaWYgKHVzZXJQaXBlKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VyUGlwZS50cmFuc2Zvcm0odmFsKTtcclxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFsdWUgPSB2YWw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLmNlbGxDb250ZXh0LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIHRoaXMuc2FuaXRpemVkVmFsdWUgPSB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdGhpcy5zdHJpcEh0bWwodmFsdWUpIDogdmFsdWU7XHJcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXHJcbiAgb25Gb2N1cygpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxyXG4gIG9uQmx1cigpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ2NsaWNrJyxcclxuICAgICAgZXZlbnQsXHJcbiAgICAgIHJvdzogdGhpcy5yb3csXHJcbiAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxyXG4gICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxyXG4gICAgICBjb2x1bW46IHRoaXMuY29sdW1uLFxyXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZGJsY2xpY2snLCBbJyRldmVudCddKVxyXG4gIG9uRGJsQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XHJcbiAgICAgIHR5cGU6ICdkYmxjbGljaycsXHJcbiAgICAgIGV2ZW50LFxyXG4gICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcclxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICBjb25zdCBpc1RhcmdldENlbGwgPSBldmVudC50YXJnZXQgPT09IHRoaXMuX2VsZW1lbnQ7XHJcblxyXG4gICAgY29uc3QgaXNBY3Rpb24gPVxyXG4gICAgICBrZXlDb2RlID09PSBLZXlzLnJldHVybiB8fFxyXG4gICAgICBrZXlDb2RlID09PSBLZXlzLmRvd24gfHxcclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy51cCB8fFxyXG4gICAgICBrZXlDb2RlID09PSBLZXlzLmxlZnQgfHxcclxuICAgICAga2V5Q29kZSA9PT0gS2V5cy5yaWdodDtcclxuXHJcbiAgICBpZiAoaXNBY3Rpb24gJiYgaXNUYXJnZXRDZWxsKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHtcclxuICAgICAgICB0eXBlOiAna2V5ZG93bicsXHJcbiAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgcm93OiB0aGlzLnJvdyxcclxuICAgICAgICBncm91cDogdGhpcy5ncm91cCxcclxuICAgICAgICByb3dIZWlnaHQ6IHRoaXMucm93SGVpZ2h0LFxyXG4gICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgICAgY2VsbEVsZW1lbnQ6IHRoaXMuX2VsZW1lbnRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoZWNrYm94Q2hhbmdlKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7XHJcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgIGV2ZW50LFxyXG4gICAgICByb3c6IHRoaXMucm93LFxyXG4gICAgICBncm91cDogdGhpcy5ncm91cCxcclxuICAgICAgcm93SGVpZ2h0OiB0aGlzLnJvd0hlaWdodCxcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgIGNlbGxFbGVtZW50OiB0aGlzLl9lbGVtZW50LFxyXG4gICAgICB0cmVlU3RhdHVzOiAnY29sbGFwc2VkJ1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjYWxjU29ydERpcihzb3J0czogYW55W10pOiBhbnkge1xyXG4gICAgaWYgKCFzb3J0cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc29ydCA9IHNvcnRzLmZpbmQoKHM6IGFueSkgPT4ge1xyXG4gICAgICByZXR1cm4gcy5wcm9wID09PSB0aGlzLmNvbHVtbi5wcm9wO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHNvcnQpIHtcclxuICAgICAgcmV0dXJuIHNvcnQuZGlyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RyaXBIdG1sKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoIWh0bWwucmVwbGFjZSkge1xyXG4gICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxuICAgIHJldHVybiBodG1sLnJlcGxhY2UoLzxcXC8/W14+XSsoPnwkKS9nLCAnJyk7XHJcbiAgfVxyXG5cclxuICBvblRyZWVBY3Rpb24oKSB7XHJcbiAgICB0aGlzLnRyZWVBY3Rpb24uZW1pdCh0aGlzLnJvdyk7XHJcbiAgfVxyXG5cclxuICBjYWxjTGVmdE1hcmdpbihjb2x1bW46IGFueSwgcm93OiBhbnkpIHtcclxuICAgIGNvbnN0IGxldmVsSW5kZW50ID0gY29sdW1uLnRyZWVMZXZlbEluZGVudCAhPSBudWxsID8gY29sdW1uLnRyZWVMZXZlbEluZGVudCA6IDUwO1xyXG4gICAgcmV0dXJuIGNvbHVtbi5pc1RyZWVDb2x1bW4gPyByb3cubGV2ZWwgKiBsZXZlbEluZGVudCA6IDA7XHJcbiAgfVxyXG59XHJcbiJdfQ==
