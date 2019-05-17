export class StatisticsNode {
  public children: StatisticsNode[];
  public item: string;
}

/** Flat to-do item node with expandable and level information */
export class StatisticsFlatNode {
  public item: string;
  public level: number;
  public expandable: boolean;
}

export interface StatisticsData {
  [key: string]: any;
}
