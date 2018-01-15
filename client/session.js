Sesh = class Sesh {
  // static get CARDS() {
  //   return "buy.cards";
  // }
  CARDS = "buy.cards";
  static push(name, data) {
    if (Session.get(name)) {
      const sessionData = Session.get(name);
      sessionData.push(data);
      Session.set(name, sessionData);
    } else {
      Session.set(name, [data]);
    }
  }
};
