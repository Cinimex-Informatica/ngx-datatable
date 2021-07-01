import { columnsByPin, columnsTotalWidth } from './column';
/**
 * Calculates the Total Flex Grow
 */
export function getTotalFlexGrow(columns) {
  let totalFlexGrow = 0;
  for (const c of columns) {
    totalFlexGrow += c.flexGrow || 0;
  }
  return totalFlexGrow;
}
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 */
export function adjustColumnWidths(allColumns, expectedWidth) {
  const columnsWidth = columnsTotalWidth(allColumns);
  const totalFlexGrow = getTotalFlexGrow(allColumns);
  const colsByGroup = columnsByPin(allColumns);
  if (columnsWidth !== expectedWidth) {
    scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
  }
}
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
  // calculate total width and flexgrow points for coulumns that can be resized
  for (const attr in colsByGroup) {
    for (const column of colsByGroup[attr]) {
      if (!column.canAutoResize) {
        maxWidth -= column.width;
        totalFlexGrow -= column.flexGrow ? column.flexGrow : 0;
      } else {
        column.width = 0;
      }
    }
  }
  const hasMinWidth = {};
  let remainingWidth = maxWidth;
  // resize columns until no width is left to be distributed
  do {
    const widthPerFlexPoint = remainingWidth / totalFlexGrow;
    remainingWidth = 0;
    for (const attr in colsByGroup) {
      for (const column of colsByGroup[attr]) {
        // if the column can be resize and it hasn't reached its minimum width yet
        if (column.canAutoResize && !hasMinWidth[column.prop]) {
          const newWidth = column.width + column.flexGrow * widthPerFlexPoint;
          if (column.minWidth !== undefined && newWidth < column.minWidth) {
            remainingWidth += newWidth - column.minWidth;
            column.width = column.minWidth;
            hasMinWidth[column.prop] = true;
          } else {
            column.width = newWidth;
          }
        }
      }
    }
  } while (remainingWidth !== 0);
}
/**
 * Forces the width of the columns to
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
 */
export function forceFillColumnWidths(
  allColumns,
  expectedWidth,
  startIdx,
  allowBleed,
  defaultColWidth = 300,
  level = 0
) {
  const columnsToResize = allColumns.slice(startIdx + 1, allColumns.length).filter(c => {
    return c.canAutoResize !== false;
  });
  for (const column of columnsToResize) {
    if (!column.$$oldWidth) {
      column.$$oldWidth = column.width;
    }
  }
  let additionWidthPerColumn = 0;
  let exceedsWindow = false;
  let contentWidth = getContentWidth(allColumns, defaultColWidth);
  let remainingWidth = expectedWidth - contentWidth;
  const columnsProcessed = [];
  const remainingWidthLimit = 1; // when to stop
  // This loop takes care of the
  do {
    additionWidthPerColumn = remainingWidth / columnsToResize.length;
    exceedsWindow = contentWidth >= expectedWidth;
    for (const column of columnsToResize) {
      if (exceedsWindow && allowBleed) {
        column.width = column.$$oldWidth || column.width || defaultColWidth;
      } else {
        const newSize = (column.width || defaultColWidth) + additionWidthPerColumn;
        if (column.minWidth && newSize < column.minWidth) {
          column.width = column.minWidth;
          columnsProcessed.push(column);
        } else if (column.maxWidth && newSize > column.maxWidth) {
          column.width = column.maxWidth;
          columnsProcessed.push(column);
        } else {
          column.width = newSize;
        }
      }
      column.width = Math.max(0, column.width);
    }
    contentWidth = getContentWidth(allColumns);
    remainingWidth = expectedWidth - contentWidth;
    removeProcessedColumns(columnsToResize, columnsProcessed);
  } while (remainingWidth > remainingWidthLimit && columnsToResize.length !== 0);
  if (Math.abs(remainingWidth) > 1 && level < 5) {
    forceFillColumnWidths(allColumns, expectedWidth, startIdx, allowBleed, defaultColWidth, level + 1);
  }
}
/**
 * Remove the processed columns from the current active columns.
 */
function removeProcessedColumns(columnsToResize, columnsProcessed) {
  for (const column of columnsProcessed) {
    const index = columnsToResize.indexOf(column);
    columnsToResize.splice(index, 1);
  }
}
/**
 * Gets the width of the columns
 */
function getContentWidth(allColumns, defaultColWidth = 300) {
  let contentWidth = 0;
  for (const column of allColumns) {
    contentWidth += column.width || defaultColWidth;
  }
  return contentWidth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9tYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFM0Q7O0dBRUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBYztJQUM3QyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFFdEIsS0FBSyxNQUFNLENBQUMsSUFBSSxPQUFPLEVBQUU7UUFDdkIsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO0tBQ2xDO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxVQUFlLEVBQUUsYUFBa0I7SUFDcEUsTUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkQsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkQsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTdDLElBQUksWUFBWSxLQUFLLGFBQWEsRUFBRTtRQUNsQyxZQUFZLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUN6RDtBQUNILENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsWUFBWSxDQUFDLFdBQWdCLEVBQUUsUUFBYSxFQUFFLGFBQWtCO0lBQ3ZFLDZFQUE2RTtJQUM3RSxLQUFLLE1BQU0sSUFBSSxJQUFJLFdBQVcsRUFBRTtRQUM5QixLQUFLLE1BQU0sTUFBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtnQkFDekIsUUFBUSxJQUFJ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LEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDcEc7QUFFSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLHNCQUFzQixDQUFDLGVBQXNCLEVBQUUsZ0JBQXVCO0lBQzdFLEtBQUssTUFBTSxNQUFNLElBQUksZ0JBQWdCLEVBQUU7UUFDckMsTUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNsQztBQUNILENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsZUFBZSxDQUFDLFVBQWUsRUFBRSxrQkFBMEIsR0FBRztJQUNyRSxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFckIsS0FBSyxNQUFNLE1BQU0sSUFBSSxVQUFVLEVBQUU7UUFDL0IsWUFBWSxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksZUFBZSxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbHVtbnNCeVBpbiwgY29sdW1uc1RvdGFsV2lkdGggfSBmcm9tICcuL2NvbHVtbic7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgVG90YWwgRmxleCBHcm93XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG90YWxGbGV4R3Jvdyhjb2x1bW5zOiBhbnlbXSkge1xyXG4gIGxldCB0b3RhbEZsZXhHcm93ID0gMDtcclxuXHJcbiAgZm9yIChjb25zdCBjIG9mIGNvbHVtbnMpIHtcclxuICAgIHRvdGFsRmxleEdyb3cgKz0gYy5mbGV4R3JvdyB8fCAwO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRvdGFsRmxleEdyb3c7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGp1c3RzIHRoZSBjb2x1bW4gd2lkdGhzLlxyXG4gKiBJbnNwaXJlZCBieTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZpeGVkLWRhdGEtdGFibGUvYmxvYi9tYXN0ZXIvc3JjL0ZpeGVkRGF0YVRhYmxlV2lkdGhIZWxwZXIuanNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGp1c3RDb2x1bW5XaWR0aHMoYWxsQ29sdW1uczogYW55LCBleHBlY3RlZFdpZHRoOiBhbnkpIHtcclxuICBjb25zdCBjb2x1bW5zV2lkdGggPSBjb2x1bW5zVG90YWxXaWR0aChhbGxDb2x1bW5zKTtcclxuICBjb25zdCB0b3RhbEZsZXhHcm93ID0gZ2V0VG90YWxGbGV4R3JvdyhhbGxDb2x1bW5zKTtcclxuICBjb25zdCBjb2xzQnlHcm91cCA9IGNvbHVtbnNCeVBpbihhbGxDb2x1bW5zKTtcclxuXHJcbiAgaWYgKGNvbHVtbnNXaWR0aCAhPT0gZXhwZWN0ZWRXaWR0aCkge1xyXG4gICAgc2NhbGVDb2x1bW5zKGNvbHNCeUdyb3VwLCBleHBlY3RlZFdpZHRoLCB0b3RhbEZsZXhHcm93KTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXNpemVzIGNvbHVtbnMgYmFzZWQgb24gdGhlIGZsZXhHcm93IHByb3BlcnR5LCB3aGlsZSByZXNwZWN0aW5nIG1hbnVhbGx5IHNldCB3aWR0aHNcclxuICovXHJcbmZ1bmN0aW9uIHNjYWxlQ29sdW1ucyhjb2xzQnlHcm91cDogYW55LCBtYXhXaWR0aDogYW55LCB0b3RhbEZsZXhHcm93OiBhbnkpIHtcclxuICAvLyBjYWxjdWxhdGUgdG90YWwgd2lkdGggYW5kIGZsZXhncm93IHBvaW50cyBmb3IgY291bHVtbnMgdGhhdCBjYW4gYmUgcmVzaXplZFxyXG4gIGZvciAoY29uc3QgYXR0ciBpbiBjb2xzQnlHcm91cCkge1xyXG4gICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sc0J5R3JvdXBbYXR0cl0pIHtcclxuICAgICAgaWYgKCFjb2x1bW4uY2FuQXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgIG1heFdpZHRoIC09IGNvbHVtbi53aWR0aDtcclxuICAgICAgICB0b3RhbEZsZXhHcm93IC09IGNvbHVtbi5mbGV4R3JvdyA/IGNvbHVtbi5mbGV4R3JvdyA6IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29sdW1uLndpZHRoID0gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgaGFzTWluV2lkdGggPSB7fTtcclxuICBsZXQgcmVtYWluaW5nV2lkdGggPSBtYXhXaWR0aDtcclxuXHJcbiAgLy8gcmVzaXplIGNvbHVtbnMgdW50aWwgbm8gd2lkdGggaXMgbGVmdCB0byBiZSBkaXN0cmlidXRlZFxyXG4gIGRvIHtcclxuICAgIGNvbnN0IHdpZHRoUGVyRmxleFBvaW50ID0gcmVtYWluaW5nV2lkdGggLyB0b3RhbEZsZXhHcm93O1xyXG4gICAgcmVtYWluaW5nV2lkdGggPSAwO1xyXG5cclxuICAgIGZvciAoY29uc3QgYXR0ciBpbiBjb2xzQnlHcm91cCkge1xyXG4gICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2xzQnlHcm91cFthdHRyXSkge1xyXG4gICAgICAgIC8vIGlmIHRoZSBjb2x1bW4gY2FuIGJlIHJlc2l6ZSBhbmQgaXQgaGFzbid0IHJlYWNoZWQgaXRzIG1pbmltdW0gd2lkdGggeWV0XHJcbiAgICAgICAgaWYgKGNvbHVtbi5jYW5BdXRvUmVzaXplICYmICFoYXNNaW5XaWR0aFtjb2x1bW4ucHJvcF0pIHtcclxuICAgICAgICAgIGNvbnN0IG5ld1dpZHRoID0gY29sdW1uLndpZHRoICsgY29sdW1uLmZsZXhHcm93ICogd2lkdGhQZXJGbGV4UG9pbnQ7XHJcbiAgICAgICAgICBpZiAoY29sdW1uLm1pbldpZHRoICE9PSB1bmRlZmluZWQgJiYgbmV3V2lkdGggPCBjb2x1bW4ubWluV2lkdGgpIHtcclxuICAgICAgICAgICAgcmVtYWluaW5nV2lkdGggKz0gbmV3V2lkdGggLSBjb2x1bW4ubWluV2lkdGg7XHJcbiAgICAgICAgICAgIGNvbHVtbi53aWR0aCA9IGNvbHVtbi5taW5XaWR0aDtcclxuICAgICAgICAgICAgaGFzTWluV2lkdGhbY29sdW1uLnByb3BdID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbHVtbi53aWR0aCA9IG5ld1dpZHRoO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gd2hpbGUgKHJlbWFpbmluZ1dpZHRoICE9PSAwKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZvcmNlcyB0aGUgd2lkdGggb2YgdGhlIGNvbHVtbnMgdG9cclxuICogZGlzdHJpYnV0ZSBlcXVhbGx5IGJ1dCBvdmVyZmxvd2luZyB3aGVuIG5lY2Vzc2FyeVxyXG4gKlxyXG4gKiBSdWxlczpcclxuICpcclxuICogIC0gSWYgY29tYmluZWQgd2l0aHMgYXJlIGxlc3MgdGhhbiB0aGUgdG90YWwgd2lkdGggb2YgdGhlIGdyaWQsXHJcbiAqICAgIHByb3BvcnRpb24gdGhlIHdpZHRocyBnaXZlbiB0aGUgbWluIC8gbWF4IC8gbm9ybWFsIHdpZHRocyB0byBmaWxsIHRoZSB3aWR0aC5cclxuICpcclxuICogIC0gSWYgdGhlIGNvbWJpbmVkIHdpZHRocywgZXhjZWVkIHRoZSB0b3RhbCB3aWR0aCBvZiB0aGUgZ3JpZCxcclxuICogICAgdXNlIHRoZSBzdGFuZGFyZCB3aWR0aHMuXHJcbiAqXHJcbiAqICAtIElmIGEgY29sdW1uIGlzIHJlc2l6ZWQsIGl0IHNob3VsZCBhbHdheXMgdXNlIHRoYXQgd2lkdGhcclxuICpcclxuICogIC0gVGhlIHByb3BvcnRpb25hbCB3aWR0aHMgc2hvdWxkIG5ldmVyIGZhbGwgYmVsb3cgbWluIHNpemUgaWYgc3BlY2lmaWVkLlxyXG4gKlxyXG4gKiAgLSBJZiB0aGUgZ3JpZCBzdGFydHMgb2ZmIHNtYWxsIGJ1dCB0aGVuIGJlY29tZXMgZ3JlYXRlciB0aGFuIHRoZSBzaXplICggKyAvIC0gKVxyXG4gKiAgICB0aGUgd2lkdGggc2hvdWxkIHVzZSB0aGUgb3JpZ2luYWwgd2lkdGg7IG5vdCB0aGUgbmV3bHkgcHJvcG9ydGlvbmVkIHdpZHRocy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JjZUZpbGxDb2x1bW5XaWR0aHMoXHJcbiAgYWxsQ29sdW1uczogYW55W10sXHJcbiAgZXhwZWN0ZWRXaWR0aDogbnVtYmVyLFxyXG4gIHN0YXJ0SWR4OiBudW1iZXIsXHJcbiAgYWxsb3dCbGVlZDogYm9vbGVhbixcclxuICBkZWZhdWx0Q29sV2lkdGg6IG51bWJlciA9IDMwMCxcclxuICBsZXZlbDogbnVtYmVyID0gMFxyXG4pIHtcclxuICBjb25zdCBjb2x1bW5zVG9SZXNpemUgPSBhbGxDb2x1bW5zLnNsaWNlKHN0YXJ0SWR4ICsgMSwgYWxsQ29sdW1ucy5sZW5ndGgpLmZpbHRlcihjID0+IHtcclxuICAgIHJldHVybiBjLmNhbkF1dG9SZXNpemUgIT09IGZhbHNlO1xyXG4gIH0pO1xyXG5cclxuICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zVG9SZXNpemUpIHtcclxuICAgIGlmICghY29sdW1uLiQkb2xkV2lkdGgpIHtcclxuICAgICAgY29sdW1uLiQkb2xkV2lkdGggPSBjb2x1bW4ud2lkdGg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsZXQgYWRkaXRpb25XaWR0aFBlckNvbHVtbiA9IDA7XHJcbiAgbGV0IGV4Y2VlZHNXaW5kb3cgPSBmYWxzZTtcclxuICBsZXQgY29udGVudFdpZHRoID0gZ2V0Q29udGVudFdpZHRoKGFsbENvbHVtbnMsIGRlZmF1bHRDb2xXaWR0aCk7XHJcbiAgbGV0IHJlbWFpbmluZ1dpZHRoID0gZXhwZWN0ZWRXaWR0aCAtIGNvbnRlbnRXaWR0aDtcclxuICBjb25zdCBjb2x1bW5zUHJvY2Vzc2VkOiBhbnlbXSA9IFtdO1xyXG4gIGNvbnN0IHJlbWFpbmluZ1dpZHRoTGltaXQgPSAxOyAvLyB3aGVuIHRvIHN0b3BcclxuXHJcbiAgLy8gVGhpcyBsb29wIHRha2VzIGNhcmUgb2YgdGhlXHJcbiAgZG8ge1xyXG4gICAgYWRkaXRpb25XaWR0aFBlckNvbHVtbiA9IHJlbWFpbmluZ1dpZHRoIC8gY29sdW1uc1RvUmVzaXplLmxlbmd0aDtcclxuICAgIGV4Y2VlZHNXaW5kb3cgPSBjb250ZW50V2lkdGggPj0gZXhwZWN0ZWRXaWR0aDtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zVG9SZXNpemUpIHtcclxuICAgICAgaWYgKGV4Y2VlZHNXaW5kb3cgJiYgYWxsb3dCbGVlZCkge1xyXG4gICAgICAgIGNvbHVtbi53aWR0aCA9IGNvbHVtbi4kJG9sZFdpZHRoIHx8IGNvbHVtbi53aWR0aCB8fCBkZWZhdWx0Q29sV2lkdGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbmV3U2l6ZSA9IChjb2x1bW4ud2lkdGggfHwgZGVmYXVsdENvbFdpZHRoKSArIGFkZGl0aW9uV2lkdGhQZXJDb2x1bW47XHJcblxyXG4gICAgICAgIGlmIChjb2x1bW4ubWluV2lkdGggJiYgbmV3U2l6ZSA8IGNvbHVtbi5taW5XaWR0aCkge1xyXG4gICAgICAgICAgY29sdW1uLndpZHRoID0gY29sdW1uLm1pbldpZHRoO1xyXG4gICAgICAgICAgY29sdW1uc1Byb2Nlc3NlZC5wdXNoKGNvbHVtbik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb2x1bW4ubWF4V2lkdGggJiYgbmV3U2l6ZSA+IGNvbHVtbi5tYXhXaWR0aCkge1xyXG4gICAgICAgICAgY29sdW1uLndpZHRoID0gY29sdW1uLm1heFdpZHRoO1xyXG4gICAgICAgICAgY29sdW1uc1Byb2Nlc3NlZC5wdXNoKGNvbHVtbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbHVtbi53aWR0aCA9IG5ld1NpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb2x1bW4ud2lkdGggPSBNYXRoLm1heCgwLCBjb2x1bW4ud2lkdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRlbnRXaWR0aCA9IGdldENvbnRlbnRXaWR0aChhbGxDb2x1bW5zKTtcclxuICAgIHJlbWFpbmluZ1dpZHRoID0gZXhwZWN0ZWRXaWR0aCAtIGNvbnRlbnRXaWR0aDtcclxuICAgIHJlbW92ZVByb2Nlc3NlZENvbHVtbnMoY29sdW1uc1RvUmVzaXplLCBjb2x1bW5zUHJvY2Vzc2VkKTtcclxuICB9IHdoaWxlIChyZW1haW5pbmdXaWR0aCA+IHJlbWFpbmluZ1dpZHRoTGltaXQgJiYgY29sdW1uc1RvUmVzaXplLmxlbmd0aCAhPT0gMCk7XHJcblxyXG4gIGlmIChNYXRoLmFicyhyZW1haW5pbmdXaWR0aCkgPiAxICYmIGxldmVsIDwgNSkge1xyXG4gICAgZm9yY2VGaWxsQ29sdW1uV2lkdGhzKGFsbENvbHVtbnMsIGV4cGVjdGVkV2lkdGgsIHN0YXJ0SWR4LCBhbGxvd0JsZWVkLCBkZWZhdWx0Q29sV2lkdGgsIGxldmVsICsgMSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgcHJvY2Vzc2VkIGNvbHVtbnMgZnJvbSB0aGUgY3VycmVudCBhY3RpdmUgY29sdW1ucy5cclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZVByb2Nlc3NlZENvbHVtbnMoY29sdW1uc1RvUmVzaXplOiBhbnlbXSwgY29sdW1uc1Byb2Nlc3NlZDogYW55W10pIHtcclxuICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zUHJvY2Vzc2VkKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IGNvbHVtbnNUb1Jlc2l6ZS5pbmRleE9mKGNvbHVtbik7XHJcbiAgICBjb2x1bW5zVG9SZXNpemUuc3BsaWNlKGluZGV4LCAxKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uc1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29udGVudFdpZHRoKGFsbENvbHVtbnM6IGFueSwgZGVmYXVsdENvbFdpZHRoOiBudW1iZXIgPSAzMDApOiBudW1iZXIge1xyXG4gIGxldCBjb250ZW50V2lkdGggPSAwO1xyXG5cclxuICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBhbGxDb2x1bW5zKSB7XHJcbiAgICBjb250ZW50V2lkdGggKz0gY29sdW1uLndpZHRoIHx8IGRlZmF1bHRDb2xXaWR0aDtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb250ZW50V2lkdGg7XHJcbn1cclxuIl19
