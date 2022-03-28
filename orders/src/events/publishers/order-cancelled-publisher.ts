import { Publisher, OrderCancelledEvent, Subjects }  from '@edudemo/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    
}