import { Directive, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';
import { ColumnChangesService } from '../../services/column-changes.service';
export class DataTableColumnDirective {
    constructor(columnChangesService) {
        this.columnChangesService = columnChangesService;
        this.isFirstChange = true;
    }
    set inputCellTemplate(inputCellTemplate) {
        this.cellTemplate = inputCellTemplate;
    }
    set queryCellTemplate(queryCellTemplate) {
        if (!this.cellTemplate) {
            this.cellTemplate = queryCellTemplate;
        }
    }
    set inputHeaderTemplate(inputHeaderTemplate) {
        this.headerTemplate = inputHeaderTemplate;
    }
    set queryHeaderTemplate(queryHeaderTemplate) {
        if (!this.headerTemplate) {
            this.headerTemplate = queryHeaderTemplate;
        }
    }
    set inputTreeToggleTemplate(inputTreeToggleTemplate) {
        this.treeToggleTemplate = inputTreeToggleTemplate;
    }
    set queryTreeToggleTemplate(queryTreeToggleTemplate) {
        if (!this.treeToggleTemplate) {
            this.treeToggleTemplate = queryTreeToggleTemplate;
        }
    }
    ngOnChanges() {
        if (this.isFirstChange) {
            this.isFirstChange = false;
        }
        else {
            this.columnChangesService.onInputChange();
        }
    }
}
DataTableColumnDirective.decorators = [
    { type: Directive, args: [{ selector: 'ngx-datatable-column' },] }
];
DataTableColumnDirective.ctorParameters = () => [
    { type: ColumnChangesService }
];
DataTableColumnDirective.propDecorators = {
    name: [{ type: Input }],
    prop: [{ type: Input }],
    frozenLeft: [{ type: Input }],
    frozenRight: [{ type: Input }],
    flexGrow: [{ type: Input }],
    resizeable: [{ type: Input }],
    comparator: [{ type: Input }],
    pipe: [{ type: Input }],
    sortable: [{ type: Input }],
    draggable: [{ type: Input }],
    canAutoResize: [{ type: Input }],
    minWidth: [{ type: Input }],
    width: [{ type: Input }],
    maxWidth: [{ type: Input }],
    checkboxable: [{ type: Input }],
    headerCheckboxable: [{ type: Input }],
    headerClass: [{ type: Input }],
    cellClass: [{ type: Input }],
    isTreeColumn: [{ type: Input }],
    treeLevelIndent: [{ type: Input }],
    summaryFunc: [{ type: Input }],
    summaryTemplate: [{ type: Input }],
    inputCellTemplate: [{ type: Input, args: ['cellTemplate',] }],
    queryCellTemplate: [{ type: ContentChild, args: [DataTableColumnCellDirective, { read: TemplateRef, static: true },] }],
    inputHeaderTemplate: [{ type: Input, args: ['headerTemplate',] }],
    queryHeaderTemplate: [{ type: ContentChild, args: [DataTableColumnHeaderDirective, { read: TemplateRef, static: true },] }],
    inputTreeToggleTemplate: [{ type: Input, args: ['treeToggleTemplate',] }],
    queryTreeToggleTemplate: [{ type: ContentChild, args: [DataTableColumnCellTreeToggle, { read: TemplateRef, static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUk3RSxNQUFNLE9BQU8sd0JBQXdCO0lBb0VuQyxZQUFvQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUZ0RCxrQkFBYSxHQUFHLElBQUksQ0FBQztJQUVvQyxDQUFDO0lBNUNsRSxJQUNJLGlCQUFpQixDQUFDLGlCQUFpQjtRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLGlCQUFpQixDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUNJLGlCQUFpQixDQUFDLGlCQUFpQjtRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLGlCQUFpQixDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUlELElBQ0ksbUJBQW1CLENBQUMsbUJBQW1CO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsbUJBQW1CLENBQUM7SUFDNUMsQ0FBQztJQUVELElBQ0ksbUJBQW1CLENBQUMsbUJBQW1CO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsbUJBQW1CLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBSUQsSUFDSSx1QkFBdUIsQ0FBQyx1QkFBdUI7UUFDakQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLHVCQUF1QixDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUNJLHVCQUF1QixDQUFDLHVCQUF1QjtRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyx1QkFBdUIsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFRRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs7WUE3RUYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFOzs7WUFIdEMsb0JBQW9COzs7bUJBSzFCLEtBQUs7bUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7bUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzsyQkFDTCxLQUFLO2lDQUNMLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUNMLEtBQUs7Z0NBRUwsS0FBSyxTQUFDLGNBQWM7Z0NBS3BCLFlBQVksU0FBQyw0QkFBNEIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtrQ0FTOUUsS0FBSyxTQUFDLGdCQUFnQjtrQ0FLdEIsWUFBWSxTQUFDLDhCQUE4QixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3NDQVNoRixLQUFLLFNBQUMsb0JBQW9CO3NDQUsxQixZQUFZLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uSGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4taGVhZGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNlbGxEaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi1jZWxsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlIH0gZnJvbSAnLi90cmVlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbHVtbkNoYW5nZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29sdW1uLWNoYW5nZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IFRhYmxlQ29sdW1uUHJvcCB9IGZyb20gJy4uLy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25neC1kYXRhdGFibGUtY29sdW1uJyB9KVxyXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHJvcDogVGFibGVDb2x1bW5Qcm9wO1xyXG4gIEBJbnB1dCgpIGZyb3plbkxlZnQ6IGFueTtcclxuICBASW5wdXQoKSBmcm96ZW5SaWdodDogYW55O1xyXG4gIEBJbnB1dCgpIGZsZXhHcm93OiBudW1iZXI7XHJcbiAgQElucHV0KCkgcmVzaXplYWJsZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBjb21wYXJhdG9yOiBhbnk7XHJcbiAgQElucHV0KCkgcGlwZTogYW55O1xyXG4gIEBJbnB1dCgpIHNvcnRhYmxlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGRyYWdnYWJsZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBjYW5BdXRvUmVzaXplOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIG1pbldpZHRoOiBudW1iZXI7XHJcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBtYXhXaWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGNoZWNrYm94YWJsZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBoZWFkZXJDaGVja2JveGFibGU6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgaGVhZGVyQ2xhc3M6IHN0cmluZyB8ICgoZGF0YTogYW55KSA9PiBzdHJpbmcgfCBhbnkpO1xyXG4gIEBJbnB1dCgpIGNlbGxDbGFzczogc3RyaW5nIHwgKChkYXRhOiBhbnkpID0+IHN0cmluZyB8IGFueSk7XHJcbiAgQElucHV0KCkgaXNUcmVlQ29sdW1uOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHRyZWVMZXZlbEluZGVudDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlGdW5jOiAoY2VsbHM6IGFueVtdKSA9PiBhbnk7XHJcbiAgQElucHV0KCkgc3VtbWFyeVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBASW5wdXQoJ2NlbGxUZW1wbGF0ZScpXHJcbiAgc2V0IGlucHV0Q2VsbFRlbXBsYXRlKGlucHV0Q2VsbFRlbXBsYXRlKSB7XHJcbiAgICB0aGlzLmNlbGxUZW1wbGF0ZSA9IGlucHV0Q2VsbFRlbXBsYXRlO1xyXG4gIH1cclxuXHJcbiAgQENvbnRlbnRDaGlsZChEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcclxuICBzZXQgcXVlcnlDZWxsVGVtcGxhdGUocXVlcnlDZWxsVGVtcGxhdGUpIHtcclxuICAgIGlmICghdGhpcy5jZWxsVGVtcGxhdGUpIHtcclxuICAgICAgdGhpcy5jZWxsVGVtcGxhdGUgPSBxdWVyeUNlbGxUZW1wbGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNlbGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KCdoZWFkZXJUZW1wbGF0ZScpXHJcbiAgc2V0IGlucHV0SGVhZGVyVGVtcGxhdGUoaW5wdXRIZWFkZXJUZW1wbGF0ZSkge1xyXG4gICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGlucHV0SGVhZGVyVGVtcGxhdGU7XHJcbiAgfVxyXG5cclxuICBAQ29udGVudENoaWxkKERhdGFUYWJsZUNvbHVtbkhlYWRlckRpcmVjdGl2ZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXHJcbiAgc2V0IHF1ZXJ5SGVhZGVyVGVtcGxhdGUocXVlcnlIZWFkZXJUZW1wbGF0ZSkge1xyXG4gICAgaWYgKCF0aGlzLmhlYWRlclRlbXBsYXRlKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBxdWVyeUhlYWRlclRlbXBsYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBJbnB1dCgndHJlZVRvZ2dsZVRlbXBsYXRlJylcclxuICBzZXQgaW5wdXRUcmVlVG9nZ2xlVGVtcGxhdGUoaW5wdXRUcmVlVG9nZ2xlVGVtcGxhdGUpIHtcclxuICAgIHRoaXMudHJlZVRvZ2dsZVRlbXBsYXRlID0gaW5wdXRUcmVlVG9nZ2xlVGVtcGxhdGU7XHJcbiAgfVxyXG5cclxuICBAQ29udGVudENoaWxkKERhdGFUYWJsZUNvbHVtbkNlbGxUcmVlVG9nZ2xlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcclxuICBzZXQgcXVlcnlUcmVlVG9nZ2xlVGVtcGxhdGUocXVlcnlUcmVlVG9nZ2xlVGVtcGxhdGUpIHtcclxuICAgIGlmICghdGhpcy50cmVlVG9nZ2xlVGVtcGxhdGUpIHtcclxuICAgICAgdGhpcy50cmVlVG9nZ2xlVGVtcGxhdGUgPSBxdWVyeVRyZWVUb2dnbGVUZW1wbGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyZWVUb2dnbGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgcHJpdmF0ZSBpc0ZpcnN0Q2hhbmdlID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2x1bW5DaGFuZ2VzU2VydmljZTogQ29sdW1uQ2hhbmdlc1NlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgaWYgKHRoaXMuaXNGaXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLmlzRmlyc3RDaGFuZ2UgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29sdW1uQ2hhbmdlc1NlcnZpY2Uub25JbnB1dENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=