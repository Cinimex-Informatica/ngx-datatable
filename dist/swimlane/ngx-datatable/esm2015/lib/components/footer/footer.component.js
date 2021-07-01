import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
export class DataTableFooterComponent {
  constructor() {
    this.selectedCount = 0;
    this.page = new EventEmitter();
  }
  get isVisible() {
    return this.rowCount / this.pageSize > 1;
  }
  get curPage() {
    return this.offset + 1;
  }
}
DataTableFooterComponent.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'datatable-footer',
        template: `
    <div
      class="datatable-footer-inner"
      [ngClass]="{ 'selected-count': selectedMessage }"
      [style.height.px]="footerHeight"
    >
      <ng-template
        *ngIf="footerTemplate"
        [ngTemplateOutlet]="footerTemplate.template"
        [ngTemplateOutletContext]="{
          rowCount: rowCount,
          pageSize: pageSize,
          selectedCount: selectedCount,
          curPage: curPage,
          offset: offset
        }"
      >
      </ng-template>
      <div class="page-count" *ngIf="!footerTemplate">
        <span *ngIf="selectedMessage"> {{ selectedCount?.toLocaleString() }} {{ selectedMessage }} / </span>
        {{ rowCount?.toLocaleString() }} {{ totalMessage }}
      </div>
      <datatable-pager
        *ngIf="!footerTemplate"
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)"
      >
      </datatable-pager>
    </div>
  `,
        host: {
          class: 'datatable-footer'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
      }
    ]
  }
];
DataTableFooterComponent.propDecorators = {
  footerHeight: [{ type: Input }],
  rowCount: [{ type: Input }],
  pageSize: [{ type: Input }],
  offset: [{ type: Input }],
  pagerLeftArrowIcon: [{ type: Input }],
  pagerRightArrowIcon: [{ type: Input }],
  pagerPreviousIcon: [{ type: Input }],
  pagerNextIcon: [{ type: Input }],
  totalMessage: [{ type: Input }],
  footerTemplate: [{ type: Input }],
  selectedCount: [{ type: Input }],
  selectedMessage: [{ type: Input }],
  page: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUE4Q2hHLE1BQU0sT0FBTyx3QkFBd0I7SUE1Q3JDO1FBd0RXLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBR3pCLFNBQUksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVN6RCxDQUFDO0lBUEMsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7OztZQW5FRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7aUJBQzFCO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7MkJBRUUsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsS0FBSztpQ0FDTCxLQUFLO2tDQUNMLEtBQUs7Z0NBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzs0QkFFTCxLQUFLOzhCQUNMLEtBQUs7bUJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRhdGFibGVGb290ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2Zvb3Rlci5kaXJlY3RpdmUnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1mb290ZXInLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLWZvb3Rlci1pbm5lclwiXHJcbiAgICAgIFtuZ0NsYXNzXT1cInsgJ3NlbGVjdGVkLWNvdW50Jzogc2VsZWN0ZWRNZXNzYWdlIH1cIlxyXG4gICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImZvb3RlckhlaWdodFwiXHJcbiAgICA+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAgICpuZ0lmPVwiZm9vdGVyVGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZvb3RlclRlbXBsYXRlLnRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgICAgcm93Q291bnQ6IHJvd0NvdW50LFxyXG4gICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplLFxyXG4gICAgICAgICAgc2VsZWN0ZWRDb3VudDogc2VsZWN0ZWRDb3VudCxcclxuICAgICAgICAgIGN1clBhZ2U6IGN1clBhZ2UsXHJcbiAgICAgICAgICBvZmZzZXQ6IG9mZnNldFxyXG4gICAgICAgIH1cIlxyXG4gICAgICA+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWNvdW50XCIgKm5nSWY9XCIhZm9vdGVyVGVtcGxhdGVcIj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cInNlbGVjdGVkTWVzc2FnZVwiPiB7eyBzZWxlY3RlZENvdW50Py50b0xvY2FsZVN0cmluZygpIH19IHt7IHNlbGVjdGVkTWVzc2FnZSB9fSAvIDwvc3Bhbj5cclxuICAgICAgICB7eyByb3dDb3VudD8udG9Mb2NhbGVTdHJpbmcoKSB9fSB7eyB0b3RhbE1lc3NhZ2UgfX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkYXRhdGFibGUtcGFnZXJcclxuICAgICAgICAqbmdJZj1cIiFmb290ZXJUZW1wbGF0ZVwiXHJcbiAgICAgICAgW3BhZ2VyTGVmdEFycm93SWNvbl09XCJwYWdlckxlZnRBcnJvd0ljb25cIlxyXG4gICAgICAgIFtwYWdlclJpZ2h0QXJyb3dJY29uXT1cInBhZ2VyUmlnaHRBcnJvd0ljb25cIlxyXG4gICAgICAgIFtwYWdlclByZXZpb3VzSWNvbl09XCJwYWdlclByZXZpb3VzSWNvblwiXHJcbiAgICAgICAgW3BhZ2VyTmV4dEljb25dPVwicGFnZXJOZXh0SWNvblwiXHJcbiAgICAgICAgW3BhZ2VdPVwiY3VyUGFnZVwiXHJcbiAgICAgICAgW3NpemVdPVwicGFnZVNpemVcIlxyXG4gICAgICAgIFtjb3VudF09XCJyb3dDb3VudFwiXHJcbiAgICAgICAgW2hpZGRlbl09XCIhaXNWaXNpYmxlXCJcclxuICAgICAgICAoY2hhbmdlKT1cInBhZ2UuZW1pdCgkZXZlbnQpXCJcclxuICAgICAgPlxyXG4gICAgICA8L2RhdGF0YWJsZS1wYWdlcj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdkYXRhdGFibGUtZm9vdGVyJ1xyXG4gIH0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUZvb3RlckNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgZm9vdGVySGVpZ2h0OiBudW1iZXI7XHJcbiAgQElucHV0KCkgcm93Q291bnQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIG9mZnNldDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHBhZ2VyTGVmdEFycm93SWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBhZ2VyUmlnaHRBcnJvd0ljb246IHN0cmluZztcclxuICBASW5wdXQoKSBwYWdlclByZXZpb3VzSWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBhZ2VyTmV4dEljb246IHN0cmluZztcclxuICBASW5wdXQoKSB0b3RhbE1lc3NhZ2U6IHN0cmluZztcclxuICBASW5wdXQoKSBmb290ZXJUZW1wbGF0ZTogRGF0YXRhYmxlRm9vdGVyRGlyZWN0aXZlO1xyXG5cclxuICBASW5wdXQoKSBzZWxlY3RlZENvdW50OiBudW1iZXIgPSAwO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkTWVzc2FnZTogc3RyaW5nIHwgYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dCgpIHBhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBnZXQgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucm93Q291bnQgLyB0aGlzLnBhZ2VTaXplID4gMTtcclxuICB9XHJcblxyXG4gIGdldCBjdXJQYWdlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vZmZzZXQgKyAxO1xyXG4gIH1cclxufVxyXG4iXX0=
