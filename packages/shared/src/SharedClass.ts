import { format } from "date-fns";

export class SharedClass {
    greeting: string;

    constructor() {
        this.greeting = format(new Date(), "'Today is a' eeee");
    }
}