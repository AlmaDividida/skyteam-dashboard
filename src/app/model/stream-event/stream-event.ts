import { StreamType } from "../stream-type/stream-type";

export class StreamEvent {
    start!: string;
    end!: string;
    title!: string;
    allDay!: string;
    free!: string;
    color!: string;
    stream_type!: StreamType;
}
