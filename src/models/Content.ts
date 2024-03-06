import { Attachement } from "./Attachement";

export interface Content {
    text: string;
    attachements: Attachement[] | null;
}