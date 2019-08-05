import {DefaultCrudRepository} from '@loopback/repository';
import {LineItem, LineItemRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LineItemRepository extends DefaultCrudRepository<
  LineItem,
  typeof LineItem.prototype.id,
  LineItemRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(LineItem, dataSource);
  }
}
