class Personality {
  name: string;
  introduction: string | null;
  characteristics: string[];
  behaviors: string[];
  restrictions: string[];

  constructor(name: string) {
    this.name = name;
    this.introduction = null;
    this.characteristics = [];
    this.behaviors = [];
    this.restrictions = [];
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