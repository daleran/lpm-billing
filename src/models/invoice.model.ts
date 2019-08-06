import { Entity, model, property, belongsTo } from '@loopback/repository';
import { LineItem } from './line-item.model'
import { Client } from './client.model';

@model({ settings: {} })
export class Invoice extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  createdOn?: string;

  @belongsTo(() => Client)
  clientId: string;

  @property({
    type: 'boolean',
    default: false,
  })
  sent?: boolean;

  @property.array(LineItem)
  lineItems?: LineItem[];

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
