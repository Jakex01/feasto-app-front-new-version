import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatusFilter'
})
export class OrderStatusFilterPipe implements PipeTransform {

  transform(orders: any[], excludedStatuses: string[]): any[] {
    if (!orders || !excludedStatuses) {
      return orders;
    }
    return orders.filter(order => !excludedStatuses.includes(order.orderStatus));
  }
}
