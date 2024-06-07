import { VM, Console } from "./src/vm";

const device = new Console();
const vm = new VM(device);

vm.execute("\x80\x41\x80\x18\x17");
