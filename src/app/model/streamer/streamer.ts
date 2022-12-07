import { Group } from "../group/group";
import { Schedule } from "../schedule/schedule";

export class Streamer {
    name!: string;
    email!: string;
    whatsapp!: string;
    channel!: string;
    group!: Group;
    points!: number;
    schedule!: Schedule[];
}
