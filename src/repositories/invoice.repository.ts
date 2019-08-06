import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Invoice, InvoiceRelations, LineItem } from '../models';
import { LineItemRepository } from '../repositories';
import { DbDataSource } from '../datasources';

export class InvoiceRepository extends DefaultCrudRepository<Invoice, typeof Invoice.prototype.id, InvoiceRelations> {
  public readonly lineItems: HasManyRepositoryFactory<LineItem, typeof Invoice.prototype.id>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter(LineItemRepository)
    protected lineItemRepositoryGetter: Getter<LineItemRepository>, ) {
    super(Invoice, dataSource);
    this.lineItems = this.createHasManyRepositoryFactoryFor('lineItems', lineItemRepositoryGetter);
  }


}
