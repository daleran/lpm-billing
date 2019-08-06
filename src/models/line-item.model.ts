import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class LineItem extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    required: true,
  })
  dateStarted: string;

  @property({
    type: 'number',
    required: true,
  })
  duration: number;


  constructor(data?: Partial<LineItem>) {
    super(data);
  }
}

export interface LineItemRelations {
  // describe navigational properties here
}

export type LineItemWithRelations = LineItem & LineItemRelations;
