import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { nextSortDir } from '../../utils/sort';
import { SortDirection } from '../../types/sort-direction.type';
export class DataTableHeaderCellComponent {
  constructor(cd) {
    this.cd = cd;
    this.sort = new EventEmitter();
    this.select = new EventEmitter();
    this.columnContextmenu = new EventEmitter(false);
    this.sortFn = this.onSort.bind(this);
    this.selectFn = this.select.emit.bind(this.select);
    this.cellContext = {
      column: this.column,
      sortDir: this.sortDir,
      sortFn: this.sortFn,
      allRowsSelected: this.allRowsSelected,
      selectFn: this.selectFn
    };
  }
  set allRowsSelected(value) {
    this._allRowsSelected = value;
    this.cellContext.allRowsSelected = value;
  }
  get allRowsSelected() {
    return this._allRowsSelected;
  }
  set column(column) {
    this._column = column;
    this.cellContext.column = column;
    this.cd.markForCheck();
  }
  get column() {
    return this._column;
  }
  set sorts(val) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
    this.cellContext.sortDir = this.sortDir;
    this.sortClass = this.calcSortClass(this.sortDir);
    this.cd.markForCheck();
  }
  get sorts() {
    return this._sorts;
  }
  get columnCssClasses() {
    let cls = 'datatable-header-cell';
    if (this.column.sortable) cls += ' sortable';
    if (this.column.resizeable) cls += ' resizeable';
    if (this.column.headerClass) {
      if (typeof this.column.headerClass === 'string') {
        cls += ' ' + this.column.headerClass;
      } else if (typeof this.column.headerClass === 'function') {
        const res = this.column.headerClass({
          column: this.column
        });
        if (typeof res === 'string') {
          cls += res;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) cls += ` ${k}`;
          }
        }
      }
    }
    const sortDir = this.sortDir;
    if (sortDir) {
      cls += ` sort-active sort-${sortDir}`;
    }
    return cls;
  }
  get name() {
    // guaranteed to have a value by setColumnDefaults() in column-helper.ts
    return this.column.headerTemplate === undefined ? this.column.name : undefined;
  }
  get minWidth() {
    return this.column.minWidth;
  }
  get maxWidth() {
    return this.column.maxWidth;
  }
  get width() {
    return this.column.width;
  }
  get isCheckboxable() {
    return this.column.checkboxable && this.column.headerCheckboxable;
  }
  onContextmenu($event) {
    this.columnContextmenu.emit({ event: $event, column: this.column });
  }
  ngOnInit() {
    this.sortClass = this.calcSortClass(this.sortDir);
  }
  calcSortDir(sorts) {
    if (sorts && this.column) {
      const sort = sorts.find(s => {
        return s.prop === this.column.prop;
      });
      if (sort) return sort.dir;
    }
  }
  onSort() {
    if (!this.column.sortable) return;
    const newValue = nextSortDir(this.sortType, this.sortDir);
    this.sort.emit({
      column: this.column,
      prevValue: this.sortDir,
      newValue
    });
  }
  calcSortClass(sortDir) {
    if (!this.cellContext.column.sortable) return;
    if (sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon}`;
    } else if (sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon}`;
    } else {
      return `sort-btn ${this.sortUnsetIcon}`;
    }
  }
}
DataTableHeaderCellComponent.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'datatable-header-cell',
        template: `
    <div class="datatable-header-cell-template-wrap">
      <ng-template
        *ngIf="isTarget"
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext"
      >
      </ng-template>
      <label *ngIf="isCheckboxable" class="datatable-checkbox">
        <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit(!allRowsSelected)" />
      </label>
      <span *ngIf="!column.headerTemplate" class="datatable-header-cell-wrapper">
        <span class="datatable-header-cell-label draggable" (click)="onSort()" [innerHTML]="name"> </span>
      </span>
      <ng-template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      <span (click)="onSort()" [class]="sortClass"> </span>
    </div>
  `,
        host: {
          class: 'datatable-header-cell'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
      }
    ]
  }
];
DataTableHeaderCellComponent.ctorParameters = () => [{ type: ChangeDetectorRef }];
DataTableHeaderCellComponent.propDecorators = {
  sortType: [{ type: Input }],
  sortAscendingIcon: [{ type: Input }],
  sortDescendingIcon: [{ type: Input }],
  sortUnsetIcon: [{ type: Input }],
  isTarget: [{ type: Input }],
  targetMarkerTemplate: [{ type: Input }],
  targetMarkerContext: [{ type: Input }],
  allRowsSelected: [{ type: Input }],
  selectionType: [{ type: Input }],
  column: [{ type: Input }],
  headerHeight: [{ type: HostBinding, args: ['style.height.px'] }, { type: Input }],
  sorts: [{ type: Input }],
  sort: [{ type: Output }],
  select: [{ type: Output }],
  columnContextmenu: [{ type: Output }],
  columnCssClasses: [{ type: HostBinding, args: ['class'] }],
  name: [{ type: HostBinding, args: ['attr.title'] }],
  minWidth: [{ type: HostBinding, args: ['style.minWidth.px'] }],
  maxWidth: [{ type: HostBinding, args: ['style.maxWidth.px'] }],
  width: [{ type: HostBinding, args: ['style.width.px'] }],
  onContextmenu: [{ type: HostListener, args: ['contextmenu', ['$event']] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUNOLFdBQVcsRUFDWCxZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBZ0NoRSxNQUFNLE9BQU8sNEJBQTRCO0lBd0h2QyxZQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXhFL0IsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksQ0FBcUMsS0FBSyxDQUFDLENBQUM7UUE0RDFGLFdBQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUdoQyxhQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQVE1QyxJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxRQUFRLEVBQUUs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TTtxQkFDTixNQUFNO2dDQUNOLE1BQU07K0JBRU4sV0FBVyxTQUFDLE9BQU87bUJBaUNuQixXQUFXLFNBQUMsWUFBWTt1QkFNeEIsV0FBVyxTQUFDLG1CQUFtQjt1QkFLL0IsV0FBVyxTQUFDLG1CQUFtQjtvQkFLL0IsV0FBVyxTQUFDLGdCQUFnQjs0QkE2QjVCLFlBQVksU0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT3V0cHV0LFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTb3J0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NvcnQudHlwZSc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zZWxlY3Rpb24udHlwZSc7XHJcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xyXG5pbXBvcnQgeyBuZXh0U29ydERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3NvcnQnO1xyXG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vdHlwZXMvc29ydC1kaXJlY3Rpb24udHlwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1oZWFkZXItY2VsbCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtdGVtcGxhdGUtd3JhcFwiPlxyXG4gICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAqbmdJZj1cImlzVGFyZ2V0XCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YXJnZXRNYXJrZXJUZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInRhcmdldE1hcmtlckNvbnRleHRcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDxsYWJlbCAqbmdJZj1cImlzQ2hlY2tib3hhYmxlXCIgY2xhc3M9XCJkYXRhdGFibGUtY2hlY2tib3hcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiYWxsUm93c1NlbGVjdGVkXCIgKGNoYW5nZSk9XCJzZWxlY3QuZW1pdCghYWxsUm93c1NlbGVjdGVkKVwiIC8+XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDxzcGFuICpuZ0lmPVwiIWNvbHVtbi5oZWFkZXJUZW1wbGF0ZVwiIGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLXdyYXBwZXJcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbCBkcmFnZ2FibGVcIiAoY2xpY2spPVwib25Tb3J0KClcIiBbaW5uZXJIVE1MXT1cIm5hbWVcIj4gPC9zcGFuPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAgICpuZ0lmPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb2x1bW4uaGVhZGVyVGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJjZWxsQ29udGV4dFwiXHJcbiAgICAgID5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgPHNwYW4gKGNsaWNrKT1cIm9uU29ydCgpXCIgW2NsYXNzXT1cInNvcnRDbGFzc1wiPiA8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJ1xyXG4gIH0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUhlYWRlckNlbGxDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIHNvcnRUeXBlOiBTb3J0VHlwZTtcclxuICBASW5wdXQoKSBzb3J0QXNjZW5kaW5nSWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNvcnREZXNjZW5kaW5nSWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNvcnRVbnNldEljb246IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgaXNUYXJnZXQ6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgdGFyZ2V0TWFya2VyVGVtcGxhdGU6IGFueTtcclxuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJDb250ZXh0OiBhbnk7XHJcblxyXG4gIF9hbGxSb3dzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHNldCBhbGxSb3dzU2VsZWN0ZWQodmFsdWUpIHtcclxuICAgIHRoaXMuX2FsbFJvd3NTZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dC5hbGxSb3dzU2VsZWN0ZWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IGFsbFJvd3NTZWxlY3RlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9hbGxSb3dzU2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xyXG5cclxuICBASW5wdXQoKSBzZXQgY29sdW1uKGNvbHVtbjogVGFibGVDb2x1bW4pIHtcclxuICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcclxuICAgIHRoaXMuY2VsbENvbnRleHQuY29sdW1uID0gY29sdW1uO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCBjb2x1bW4oKTogVGFibGVDb2x1bW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbjtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcclxuICBASW5wdXQoKVxyXG4gIGhlYWRlckhlaWdodDogbnVtYmVyO1xyXG5cclxuICBASW5wdXQoKSBzZXQgc29ydHModmFsOiBhbnlbXSkge1xyXG4gICAgdGhpcy5fc29ydHMgPSB2YWw7XHJcbiAgICB0aGlzLnNvcnREaXIgPSB0aGlzLmNhbGNTb3J0RGlyKHZhbCk7XHJcbiAgICB0aGlzLmNlbGxDb250ZXh0LnNvcnREaXIgPSB0aGlzLnNvcnREaXI7XHJcbiAgICB0aGlzLnNvcnRDbGFzcyA9IHRoaXMuY2FsY1NvcnRDbGFzcyh0aGlzLnNvcnREaXIpO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc29ydHM7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgc29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNvbHVtbkNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyBjb2x1bW46IGFueSB9PihmYWxzZSk7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxyXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XHJcbiAgICBsZXQgY2xzID0gJ2RhdGF0YWJsZS1oZWFkZXItY2VsbCc7XHJcblxyXG4gICAgaWYgKHRoaXMuY29sdW1uLnNvcnRhYmxlKSBjbHMgKz0gJyBzb3J0YWJsZSc7XHJcbiAgICBpZiAodGhpcy5jb2x1bW4ucmVzaXplYWJsZSkgY2xzICs9ICcgcmVzaXplYWJsZSc7XHJcbiAgICBpZiAodGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MpIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBjbHMgKz0gJyAnICsgdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3M7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY29sdW1uLmhlYWRlckNsYXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3Moe1xyXG4gICAgICAgICAgY29sdW1uOiB0aGlzLmNvbHVtblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGNscyArPSByZXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcyk7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2Yga2V5cykge1xyXG4gICAgICAgICAgICBpZiAocmVzW2tdID09PSB0cnVlKSBjbHMgKz0gYCAke2t9YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb3J0RGlyID0gdGhpcy5zb3J0RGlyO1xyXG4gICAgaWYgKHNvcnREaXIpIHtcclxuICAgICAgY2xzICs9IGAgc29ydC1hY3RpdmUgc29ydC0ke3NvcnREaXJ9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xzO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRpdGxlJylcclxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgLy8gZ3VhcmFudGVlZCB0byBoYXZlIGEgdmFsdWUgYnkgc2V0Q29sdW1uRGVmYXVsdHMoKSBpbiBjb2x1bW4taGVscGVyLnRzXHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4uaGVhZGVyVGVtcGxhdGUgPT09IHVuZGVmaW5lZCA/IHRoaXMuY29sdW1uLm5hbWUgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbldpZHRoLnB4JylcclxuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbi5taW5XaWR0aDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWF4V2lkdGgucHgnKVxyXG4gIGdldCBtYXhXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1heFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXHJcbiAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ud2lkdGg7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNDaGVja2JveGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4uY2hlY2tib3hhYmxlICYmIHRoaXMuY29sdW1uLmhlYWRlckNoZWNrYm94YWJsZTtcclxuICB9XHJcblxyXG4gIHNvcnRGbiA9IHRoaXMub25Tb3J0LmJpbmQodGhpcyk7XHJcbiAgc29ydENsYXNzOiBzdHJpbmc7XHJcbiAgc29ydERpcjogU29ydERpcmVjdGlvbjtcclxuICBzZWxlY3RGbiA9IHRoaXMuc2VsZWN0LmVtaXQuYmluZCh0aGlzLnNlbGVjdCk7XHJcblxyXG4gIGNlbGxDb250ZXh0OiBhbnk7XHJcblxyXG4gIHByaXZhdGUgX2NvbHVtbjogVGFibGVDb2x1bW47XHJcbiAgcHJpdmF0ZSBfc29ydHM6IGFueVtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgdGhpcy5jZWxsQ29udGV4dCA9IHtcclxuICAgICAgY29sdW1uOiB0aGlzLmNvbHVtbixcclxuICAgICAgc29ydERpcjogdGhpcy5zb3J0RGlyLFxyXG4gICAgICBzb3J0Rm46IHRoaXMuc29ydEZuLFxyXG4gICAgICBhbGxSb3dzU2VsZWN0ZWQ6IHRoaXMuYWxsUm93c1NlbGVjdGVkLFxyXG4gICAgICBzZWxlY3RGbjogdGhpcy5zZWxlY3RGblxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcclxuICBvbkNvbnRleHRtZW51KCRldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb2x1bW5Db250ZXh0bWVudS5lbWl0KHsgZXZlbnQ6ICRldmVudCwgY29sdW1uOiB0aGlzLmNvbHVtbiB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zb3J0Q2xhc3MgPSB0aGlzLmNhbGNTb3J0Q2xhc3ModGhpcy5zb3J0RGlyKTtcclxuICB9XHJcblxyXG4gIGNhbGNTb3J0RGlyKHNvcnRzOiBhbnlbXSk6IGFueSB7XHJcbiAgICBpZiAoc29ydHMgJiYgdGhpcy5jb2x1bW4pIHtcclxuICAgICAgY29uc3Qgc29ydCA9IHNvcnRzLmZpbmQoKHM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzLnByb3AgPT09IHRoaXMuY29sdW1uLnByb3A7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHNvcnQpIHJldHVybiBzb3J0LmRpcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU29ydCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5jb2x1bW4uc29ydGFibGUpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IG5leHRTb3J0RGlyKHRoaXMuc29ydFR5cGUsIHRoaXMuc29ydERpcik7XHJcbiAgICB0aGlzLnNvcnQuZW1pdCh7XHJcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXHJcbiAgICAgIHByZXZWYWx1ZTogdGhpcy5zb3J0RGlyLFxyXG4gICAgICBuZXdWYWx1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjYWxjU29ydENsYXNzKHNvcnREaXI6IFNvcnREaXJlY3Rpb24pOiBzdHJpbmcge1xyXG4gICAgaWYgKCF0aGlzLmNlbGxDb250ZXh0LmNvbHVtbi5zb3J0YWJsZSkgcmV0dXJuO1xyXG4gICAgaWYgKHNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XHJcbiAgICAgIHJldHVybiBgc29ydC1idG4gc29ydC1hc2MgJHt0aGlzLnNvcnRBc2NlbmRpbmdJY29ufWA7XHJcbiAgICB9IGVsc2UgaWYgKHNvcnREaXIgPT09IFNvcnREaXJlY3Rpb24uZGVzYykge1xyXG4gICAgICByZXR1cm4gYHNvcnQtYnRuIHNvcnQtZGVzYyAke3RoaXMuc29ydERlc2NlbmRpbmdJY29ufWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYHNvcnQtYnRuICR7dGhpcy5zb3J0VW5zZXRJY29ufWA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
