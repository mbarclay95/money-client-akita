import {ChartPoint} from './chart-point';

export interface ChartLine {
  name: string;
  categoryId?: number;
  series: ChartPoint[];
}
