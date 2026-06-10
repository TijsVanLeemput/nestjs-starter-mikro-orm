module.exports = {
  Entity: () => (target) => target,
  PrimaryKey: () => (target, propertyName) => {},
  Property: () => (target, propertyName) => {},
  Column: () => (target, propertyName) => {},
  Relation: () => (target, propertyName) => {},
  OneToMany: () => (target, propertyName) => {},
  ManyToOne: () => (target, propertyName) => {},
  ManyToMany: () => (target, propertyName) => {},
  Index: () => (target) => target,
};
