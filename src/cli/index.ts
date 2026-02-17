import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import list from "./commands/list.js";
import preview from "./commands/preview.js";
import apply from "./commands/apply.js";
import generate from "./commands/generate.js";
import current from "./commands/current.js";

yargs(hideBin(process.argv))
  .scriptName("themenal")
  .usage("$0 <cmd> [args]")
  .command(current)
  .command(list)
  .command(preview)
  .command(apply)
  .command(generate)
  .demandCommand()
  .strict()
  .help()
  .parse();
