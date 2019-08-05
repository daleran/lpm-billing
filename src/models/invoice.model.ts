import { Entity, model, property, hasMany } from '@loopback/repository';
import { LineItem, LineItemWithRelations } from './line-item.model';
import { ClientWithRelations } from './client.model';

@model({ settings: {} })
export class Invoice extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property()
  clientID?: string

  @property({
    type: 'date',
    required: true,
  })
  createdOn: string;

  @property({
    type: 'boolean',
    default: false,
  })
  sent?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  paid?: boolean;

  @hasMany(() => LineItem)
  lineItems?: LineItem[];


  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  clientID?: ClientWithRelations;
  lineItems?: LineItemWithRelations[];
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
