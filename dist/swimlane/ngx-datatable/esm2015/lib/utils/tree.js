import { getterForProp } from './column-prop-getters';
export function optionalGetterForProp(prop) {
  return prop && (row => getterForProp(prop)(row, prop));
}
/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param rows
 *
 */
export function groupRowsByParents(rows, from, to) {
  if (from && to) {
    const nodeById = {};
    const l = rows.length;
    let node = null;
    nodeById[0] = new TreeNode(); // that's the root node
    const uniqIDs = rows.reduce((arr, item) => {
      const toValue = to(item);
      if (arr.indexOf(toValue) === -1) {
        arr.push(toValue);
      }
      return arr;
    }, []);
    for (let i = 0; i < l; i++) {
      // make TreeNode objects for each item
      nodeById[to(rows[i])] = new TreeNode(rows[i]);
    }
    for (let i = 0; i < l; i++) {
      // link all TreeNode objects
      node = nodeById[to(rows[i])];
      let parent = 0;
      const fromValue = from(node.row);
      if (!!fromValue && uniqIDs.indexOf(fromValue) > -1) {
        parent = fromValue;
      }
      node.parent = nodeById[parent];
      node.row['level'] = node.parent.row['level'] + 1;
      node.parent.children.push(node);
    }
    let resolvedRows = [];
    nodeById[0].flatten(function () {
      resolvedRows = [...resolvedRows, this.row];
    }, true);
    return resolvedRows;
  } else {
    return rows;
  }
}
class TreeNode {
  constructor(row = null) {
    if (!row) {
      row = {
        level: -1,
        treeStatus: 'expanded'
      };
    }
    this.row = row;
    this.parent = null;
    this.children = [];
  }
  flatten(f, recursive) {
    if (this.row['treeStatus'] === 'expanded') {
      for (let i = 0, l = this.children.length; i < l; i++) {
        const child = this.children[i];
        f.apply(child, Array.prototype.slice.call(arguments, 2));
        if (recursive) child.flatten.apply(child, arguments);
      }
    }
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi91dGlscy90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUl0RCxNQUFNLFVBQVUscUJBQXFCLENBQUMsSUFBcUI7SUFDekQsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLElBQVcsRUFBRSxJQUEwQixFQUFFLEVBQXdCO0lBQ2xHLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtRQUNkLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFvQixJQUFJLENBQUM7UUFFakMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyx1QkFBdUI7UUFFckQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN4QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25CO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFUCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLHNDQUFzQztZQUN0QyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLDRCQUE0QjtZQUM1QixJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xELE1BQU0sR0FBRyxTQUFTLENBQUM7YUFDcEI7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7UUFFRCxJQUFJLFlBQVksR0FBVSxFQUFFLENBQUM7UUFDN0IsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNsQixZQUFZLEdBQUcsQ0FBQyxHQUFHLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsT0FBTyxZQUFZLENBQUM7S0FDckI7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsTUFBTSxRQUFRO0lBS1osWUFBWSxNQUFrQixJQUFJO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixHQUFHLEdBQUc7Z0JBQ0osS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDVCxVQUFVLEVBQUUsVUFBVTthQUN2QixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBTSxFQUFFLFNBQWtCO1FBQ2hDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsSUFBSSxTQUFTO29CQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN0RDtTQUNGO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0dGVyRm9yUHJvcCB9IGZyb20gJy4vY29sdW1uLXByb3AtZ2V0dGVycyc7XHJcbmltcG9ydCB7IFRhYmxlQ29sdW1uUHJvcCB9IGZyb20gJy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcclxuXHJcbmV4cG9ydCB0eXBlIE9wdGlvbmFsVmFsdWVHZXR0ZXIgPSAocm93OiBhbnkpID0+IGFueSB8IHVuZGVmaW5lZDtcclxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbmFsR2V0dGVyRm9yUHJvcChwcm9wOiBUYWJsZUNvbHVtblByb3ApOiBPcHRpb25hbFZhbHVlR2V0dGVyIHtcclxuICByZXR1cm4gcHJvcCAmJiAocm93ID0+IGdldHRlckZvclByb3AocHJvcCkocm93LCBwcm9wKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9ucyByZWFycmFuZ2UgaXRlbXMgYnkgdGhlaXIgcGFyZW50c1xyXG4gKiBBbHNvIHNldHMgdGhlIGxldmVsIHZhbHVlIHRvIGVhY2ggb2YgdGhlIGl0ZW1zXHJcbiAqXHJcbiAqIE5vdGU6IEV4cGVjdGluZyBlYWNoIGl0ZW0gaGFzIGEgcHJvcGVydHkgY2FsbGVkIHBhcmVudElkXHJcbiAqIE5vdGU6IFRoaXMgYWxnb3JpdGhtIHdpbGwgZmFpbCBpZiBhIGxpc3QgaGFzIHR3byBvciBtb3JlIGl0ZW1zIHdpdGggc2FtZSBJRFxyXG4gKiBOT1RFOiBUaGlzIGFsZ29yaXRobSB3aWxsIGZhaWwgaWYgdGhlcmUgaXMgYSBkZWFkbG9jayBvZiByZWxhdGlvbnNoaXBcclxuICpcclxuICogRm9yIGV4YW1wbGUsXHJcbiAqXHJcbiAqIElucHV0XHJcbiAqXHJcbiAqIGlkIC0+IHBhcmVudFxyXG4gKiAxICAtPiAwXHJcbiAqIDIgIC0+IDBcclxuICogMyAgLT4gMVxyXG4gKiA0ICAtPiAxXHJcbiAqIDUgIC0+IDJcclxuICogNyAgLT4gOFxyXG4gKiA2ICAtPiAzXHJcbiAqXHJcbiAqXHJcbiAqIE91dHB1dFxyXG4gKiBpZCAtPiBsZXZlbFxyXG4gKiAxICAgICAgLT4gMFxyXG4gKiAtLTMgICAgLT4gMVxyXG4gKiAtLS0tNiAgLT4gMlxyXG4gKiAtLTQgICAgLT4gMVxyXG4gKiAyICAgICAgLT4gMFxyXG4gKiAtLTUgICAgLT4gMVxyXG4gKiA3ICAgICAtPiA4XHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSByb3dzXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBSb3dzQnlQYXJlbnRzKHJvd3M6IGFueVtdLCBmcm9tPzogT3B0aW9uYWxWYWx1ZUdldHRlciwgdG8/OiBPcHRpb25hbFZhbHVlR2V0dGVyKTogYW55W10ge1xyXG4gIGlmIChmcm9tICYmIHRvKSB7XHJcbiAgICBjb25zdCBub2RlQnlJZCA9IHt9O1xyXG4gICAgY29uc3QgbCA9IHJvd3MubGVuZ3RoO1xyXG4gICAgbGV0IG5vZGU6IFRyZWVOb2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgbm9kZUJ5SWRbMF0gPSBuZXcgVHJlZU5vZGUoKTsgLy8gdGhhdCdzIHRoZSByb290IG5vZGVcclxuXHJcbiAgICBjb25zdCB1bmlxSURzID0gcm93cy5yZWR1Y2UoKGFyciwgaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCB0b1ZhbHVlID0gdG8oaXRlbSk7XHJcbiAgICAgIGlmIChhcnIuaW5kZXhPZih0b1ZhbHVlKSA9PT0gLTEpIHtcclxuICAgICAgICBhcnIucHVzaCh0b1ZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYXJyO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIC8vIG1ha2UgVHJlZU5vZGUgb2JqZWN0cyBmb3IgZWFjaCBpdGVtXHJcbiAgICAgIG5vZGVCeUlkW3RvKHJvd3NbaV0pXSA9IG5ldyBUcmVlTm9kZShyb3dzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAvLyBsaW5rIGFsbCBUcmVlTm9kZSBvYmplY3RzXHJcbiAgICAgIG5vZGUgPSBub2RlQnlJZFt0byhyb3dzW2ldKV07XHJcbiAgICAgIGxldCBwYXJlbnQgPSAwO1xyXG4gICAgICBjb25zdCBmcm9tVmFsdWUgPSBmcm9tKG5vZGUucm93KTtcclxuICAgICAgaWYgKCEhZnJvbVZhbHVlICYmIHVuaXFJRHMuaW5kZXhPZihmcm9tVmFsdWUpID4gLTEpIHtcclxuICAgICAgICBwYXJlbnQgPSBmcm9tVmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgbm9kZS5wYXJlbnQgPSBub2RlQnlJZFtwYXJlbnRdO1xyXG4gICAgICBub2RlLnJvd1snbGV2ZWwnXSA9IG5vZGUucGFyZW50LnJvd1snbGV2ZWwnXSArIDE7XHJcbiAgICAgIG5vZGUucGFyZW50LmNoaWxkcmVuLnB1c2gobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc29sdmVkUm93czogYW55W10gPSBbXTtcclxuICAgIG5vZGVCeUlkWzBdLmZsYXR0ZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXNvbHZlZFJvd3MgPSBbLi4ucmVzb2x2ZWRSb3dzLCB0aGlzLnJvd107XHJcbiAgICB9LCB0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gcmVzb2x2ZWRSb3dzO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gcm93cztcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFRyZWVOb2RlIHtcclxuICBwdWJsaWMgcm93OiBhbnk7XHJcbiAgcHVibGljIHBhcmVudDogYW55O1xyXG4gIHB1YmxpYyBjaGlsZHJlbjogYW55W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJvdzogYW55IHwgbnVsbCA9IG51bGwpIHtcclxuICAgIGlmICghcm93KSB7XHJcbiAgICAgIHJvdyA9IHtcclxuICAgICAgICBsZXZlbDogLTEsXHJcbiAgICAgICAgdHJlZVN0YXR1czogJ2V4cGFuZGVkJ1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5yb3cgPSByb3c7XHJcbiAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgfVxyXG5cclxuICBmbGF0dGVuKGY6IGFueSwgcmVjdXJzaXZlOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy5yb3dbJ3RyZWVTdGF0dXMnXSA9PT0gJ2V4cGFuZGVkJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGYuYXBwbHkoY2hpbGQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikpO1xyXG4gICAgICAgIGlmIChyZWN1cnNpdmUpIGNoaWxkLmZsYXR0ZW4uYXBwbHkoY2hpbGQsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
