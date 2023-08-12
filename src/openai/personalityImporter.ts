import fs from "fs";
import path from "path";
import logger from "../logger";

export type PersonalityStruct = {
  name: string,
  introduction: string,
  characteristics: string[],
  behaviors: string[],
  restrictions: string[]
}

const EMPTY_PERSONALITY = `{
  "name": "",
  "introduction": "",
  "characteristics": [],
  "behaviors": [],
  "restrictions": []
}`;

class PersonalityImporter {
  name: string;
  personalityContent: string;

  constructor(name: string) {
    this.name = name;
    this.personalityContent = this.getPersonalityContent();
  }

  getPersonalityContent() {
    try {
      const currentDir = path.resolve();
      const filePath = path.join(currentDir, `${this.name}.json`);
      const content = fs.readFileSync(filePath, "utf-8");
      return this.parseAndReplaceContent(content);
    } catch {
      logger.warn(`Not able to find ${this.name}.json`);
      return EMPTY_PERSONALITY;
    }
  }

  getPersonalityAsJSON(): PersonalityStruct {
    return JSON.parse(this.personalityContent);
  }

  parseAndReplaceContent(content: string) {
    return content.replaceAll(/{{name}}/gm, this.name);
  }
}

export default PersonalityImporter;