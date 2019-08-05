import { Entity, model, property } from '@loopback/repository';
import { InvoiceWithRelations } from './invoice.model';

@model({ settings: {} })
export class LineItem extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property()
  invoiceId?: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

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
  invoiceId?: InvoiceWithRelations;
}

export type LineItemWithRelations = LineItem & LineItemRelations;
