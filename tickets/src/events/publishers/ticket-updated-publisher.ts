import { Publisher, Subjects, TicketUpdatedEvent } from '@edudemo/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    
}