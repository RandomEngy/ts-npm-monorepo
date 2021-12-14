import { SharedClass } from "@ts-npm-mono/shared";
import { v4 as uuidV4 } from "uuid";

const instance: SharedClass = new SharedClass();
console.info(`${instance.greeting} - ${uuidV4()}`);