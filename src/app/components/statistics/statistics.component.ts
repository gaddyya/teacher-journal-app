import { StatisticsDatabaseService } from '../../common/services/statistics-database.service';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { StatisticsFlatNode, StatisticsNode } from 'src/app/common/entities/Statistics.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.sass']
})
export class StatisticsComponent {

  public statisticsMenu: FormControl = new FormControl;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  public flatNodeMap: Map<StatisticsFlatNode, StatisticsNode> = new Map<StatisticsFlatNode, StatisticsNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  public nestedNodeMap: Map<StatisticsNode, StatisticsFlatNode> = new Map<StatisticsNode, StatisticsFlatNode>();

  /** A selected parent node to be inserted */
  public selectedParent: StatisticsFlatNode | undefined = undefined;

  /** The new item's name */
  public newItemName: string = '';

  public treeControl: FlatTreeControl<StatisticsFlatNode>;

  public treeFlattener: MatTreeFlattener<StatisticsNode, StatisticsFlatNode>;

  public dataSource: MatTreeFlatDataSource<StatisticsNode, StatisticsFlatNode>;

  /** The selection for checklist */
  public checklistSelection: SelectionModel<StatisticsFlatNode> = new SelectionModel<StatisticsFlatNode>(true /* multiple */);

  constructor(private database: StatisticsDatabaseService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);
    this.treeControl = new FlatTreeControl<StatisticsFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  public getLevel = (node: StatisticsFlatNode) => node.level;

  public isExpandable = (node: StatisticsFlatNode) => node.expandable;

  public getChildren = (node: StatisticsNode): StatisticsNode[] => node.children;

  public hasChild = (_: number, _nodeData: StatisticsFlatNode) => _nodeData.expandable;

  public hasNoContent = (_: number, _nodeData: StatisticsFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  public transformer = (node: StatisticsNode, level: number) => {
    const existingNode: StatisticsFlatNode = this.nestedNodeMap.get(node);
    const flatNode: StatisticsFlatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new StatisticsFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  public descendantsAllSelected(node: StatisticsFlatNode): boolean {
    const descendants: StatisticsFlatNode[] = this.treeControl.getDescendants(node);
    const descAllSelected: boolean = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  public descendantsPartiallySelected(node: StatisticsFlatNode): boolean {
    const descendants: StatisticsFlatNode[] = this.treeControl.getDescendants(node);
    const result: boolean = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  public itemSelectionToggle(node: StatisticsFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants: StatisticsFlatNode[] = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  public leafItemSelectionToggle(node: StatisticsFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  public checkAllParentsSelection(node: StatisticsFlatNode): void {
    let parent: StatisticsFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  public checkRootNodeSelection(node: StatisticsFlatNode): void {
    const nodeSelected: boolean = this.checklistSelection.isSelected(node);
    const descendants: StatisticsFlatNode[] = this.treeControl.getDescendants(node);
    const descAllSelected: boolean = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  public getParentNode(node: StatisticsFlatNode): StatisticsFlatNode | null {
    const currentLevel: number = this.getLevel(node);

    if (currentLevel < 1) {
      return undefined;
    }

    const startIndex: number = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i: number = startIndex; i >= 0; i--) {
      const currentNode: StatisticsFlatNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return undefined;
  }
}
