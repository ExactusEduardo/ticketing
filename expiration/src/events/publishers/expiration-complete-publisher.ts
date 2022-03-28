import { Subjects, Publisher, ExpirationCompleteEvent } from '@edudemo/common'
import { queueGroupName } from '../listeners/queue-group-name';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;
}