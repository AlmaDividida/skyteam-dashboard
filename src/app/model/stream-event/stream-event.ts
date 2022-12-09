import { StreamType } from "../stream-type/stream-type";

export class StreamEvent {
    time_day!: number;
    time_hour!: number;
    viewers!: number;
    stream_type!: StreamType;
}
