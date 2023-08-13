import PersonalityImporter from "./personalityImporter";

class Personality {
  name: string;
  introduction: string | null;
  characteristics: string[];
  behaviors: string[];
  restrictions: string[];

  constructor(name: string, preset = true) {
    this.name = name;
    this.introduction = null;
    this.characteristics = [];
    this.behaviors = [];
    this.restrictions = [];
    if (preset) {
      this.setUpPresetPersonality();
    }
  }

  setUpPresetPersonality() {
    const personalityBase = new PersonalityImporter(this.name);
    const personalityContent = personalityBase.getPersonalityAsJSON();
    this.setIntroduction(personalityContent.name);
    personalityContent.characteristics.forEach(
      characteristic => this.addCharacteristic(characteristic));
    personalityContent.behaviors.forEach(
      behavior => this.addBehavior(behavior));
    personalityContent.restrictions.forEach(
      restriction => this.addRestriction(restriction));
  }

  addCharacteristic(characteristic: string) {
    this.characteristics.push(characteristic);
  }

  addBehavior(behavior: string) {
    this.behaviors.push(behavior);
  }

  addRestriction(restriction: string) {
    this.restrictions.push(restriction);
  }

  setIntroduction(introduction: string) {
    this.introduction = introduction;
  }
}

export default Personality;