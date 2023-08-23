var db = connect("mongodb://root:passRoot@localhost:27017/admin");

db = db.getSiblingDB('RINHA_DB'); // we can not use "use" statement here to switch db

db.createUser(
  {
    user: "rinhaRoot",
    pwd: "rinhaRootSecret",
    roles: [{ role: "readWrite", db: "RINHA_DB" }],
    passwordDigestor: "server",
  }
);

db.pessoas.createIndex({
  apelido: 1
}, {
  unique: true
});
db.pessoas.getIndexes();
db.createCollection('pessoas');
