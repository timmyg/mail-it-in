Sesh = class Sesh {
  // get CARDS() {
  //   return "buy.cards";
  // }
  // static get CARDS() {
  //   return "buy.cards";
  // }

  static push(name, value) {
    if (Session.get(name)) {
      const sessionData = Session.get(name);
      if (sessionData.indexOf(value) === -1) {
        sessionData.push(value);
        Session.set(name, sessionData);
      }
    } else {
      Session.set(name, [value]);
    }
  }

  static remove(name, value) {
    const sessionData = Session.get(name);
    const newData = sessionData.filter(e => e !== value);
    Session.set(name, newData);
  }

  static toggle(name, value) {
    const sessionData = Session.get(name);
    if (!sessionData || sessionData.indexOf(value) === -1) {
      this.push(name, value);
    } else {
      this.remove(name, value);
    }
  }

  static contains(name, value) {
    const sessionData = Session.get(name);
    if (sessionData && sessionData.indexOf(value) > -1) {
      return true;
    }
  }

  static isEmpty(name) {
    const sessionData = Session.get(name);
    if (!sessionData || !sessionData.length) {
      return true;
    }
  }

  static getLength(name) {
    const sessionData = Session.get(name);
    if (sessionData) {
      return sessionData.length;
    }
    return 0;
  }
};

export { Sesh };
