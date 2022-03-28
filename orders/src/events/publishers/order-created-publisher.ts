import { Publisher, OrderCreatedEvent, Subjects }  from '@edudemo/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    
}