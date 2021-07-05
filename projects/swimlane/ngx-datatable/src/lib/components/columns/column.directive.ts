import { Directive, TemplateRef, ContentChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';
import { ColumnChangesService } from '../../services/column-changes.service';
import { TableColumnProp } from '../../types/table-column.type';

@Directive({ selector: 'ngx-datatable-column' })
export class DataTableColumnDirective implements OnChanges {
  @Input() name: string;
  @Input() prop: TableColumnProp;
  @Input() frozenLeft: any;
  @Input() frozenRight: any;
  @Input() flexGrow: number;
  @Input() resizeable: boolean;
  @Input() comparator: any;
  @Input() pipe: any;
  @Input() sortable: boolean;
  @Input() draggable: boolean;
  @Input() canAutoResize: boolean;
  @Input() minWidth: number;
  @Input() width: number;
  @Input() maxWidth: number;
  @Input() checkboxable: boolean;
  @Input() headerCheckboxable: boolean;
  @Input() headerClass: string | ((data: any) => string | any);
  @Input() cellClass: string | ((data: any) => string | any);
  @Input() isTreeColumn: boolean;
  @Input() treeLevelIndent: number;
  @Input() summaryFunc: (cells: any[]) => any;
  @Input() summaryTemplate: TemplateRef<any>;

  @Input('cellTemplate')
  set inputCellTemplate(inputCellTemplate) {
    this.cellTemplate = inputCellTemplate;
  }

  @ContentChild(DataTableColumnCellDirective, { read: TemplateRef, static: true })
  set queryCellTemplate(queryCellTemplate) {
    if (!this.cellTemplate) {
      this.cellTemplate = queryCellTemplate;
    }
  }

  cellTemplate: TemplateRef<any>;

  @Input('headerTemplate')
  set inputHeaderTemplate(inputHeaderTemplate) {
    this.headerTemplate = inputHeaderTemplate;
  }

  @ContentChild(DataTableColumnHeaderDirective, { read: TemplateRef, static: true })
  set queryHeaderTemplate(queryHeaderTemplate) {
    if (!this.headerTemplate) {
      this.headerTemplate = queryHeaderTemplate;
    }
  }

  headerTemplate: TemplateRef<any>;

  @Input('treeToggleTemplate')
  set inputTreeToggleTemplate(inputTreeToggleTemplate) {
    this.treeToggleTemplate = inputTreeToggleTemplate;
  }

  @ContentChild(DataTableColumnCellTreeToggle, { read: TemplateRef, static: true })
  set queryTreeToggleTemplate(queryTreeToggleTemplate) {
    if (!this.treeToggleTemplate) {
      this.treeToggleTemplate = queryTreeToggleTemplate;
    }
  }

  treeToggleTemplate: TemplateRef<any>;

  private isFirstChange = true;

  constructor(private columnChangesService: ColumnChangesService) {}

  ngOnChanges() {
    if (this.isFirstChange) {
      this.isFirstChange = false;
    } else {
      this.columnChangesService.onInputChange();
    }
  }
}
