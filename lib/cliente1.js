const axios = require("axios");
const faker = require("faker");

const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

// Cria Noticia #1
api
  .post("/noticia", {
    titulo: faker.lorem.sentence(),
    resumo: faker.lorem.paragraph(),
    url: faker.internet.url(),
  })
  .then(({ data }) => {
    console.log("Noticia #1 criada", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao criar noticia #1", error));

// Cria Noticia #2
api
  .post("/noticia", {
    titulo: faker.lorem.sentence(),
    resumo: faker.lorem.paragraph(),
    url: faker.internet.url(),
  })
  .then(({ data }) => {
    console.log("Noticia #2 criada", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao criar noticia #2", error));

// Cria Noticia #3
api
  .post("/noticia", {
    titulo: faker.lorem.sentence(),
    resumo: faker.lorem.paragraph(),
    url: faker.internet.url(),
  })
  .then(({ data }) => {
    console.log("Noticia #3 criada", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao criar noticia #3", error));

// Cria Noticia #4
api
  .post("/noticia", {
    titulo: faker.lorem.sentence(),
    resumo: faker.lorem.paragraph(),
    url: faker.internet.url(),
  })
  .then(({ data }) => {
    console.log("Noticia #4 criada", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao criar noticia #4", error));

// Cria Noticia #5
api
  .post("/noticia", {
    titulo: faker.lorem.sentence(),
    resumo: faker.lorem.paragraph(),
    url: faker.internet.url(),
  })
  .then(({ data }) => {
    console.log("Noticia #5 criada", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao criar noticia #5", error));

// Cadastrar Email #1
api
  .post("/inscricao", { email: faker.internet.email() })
  .then(({ data }) => {
    console.log("Email #1 cadastrado", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao cadastrar email #1", error));

// Cadastrar Email #2
api
  .post("/inscricao", { email: faker.internet.email() })
  .then(({ data }) => {
    console.log("Email #2 cadastrado", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao cadastrar email #2", error));

// Cadastrar Email #3
api
  .post("/inscricao", { email: faker.internet.email() })
  .then(({ data }) => {
    console.log("Email #3 cadastrado", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao cadastrar email #3", error));

// Cadastrar Email #4
api
  .post("/inscricao", { email: faker.internet.email() })
  .then(({ data }) => {
    console.log("Email #4 cadastrado", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao cadastrar email #4", error));

// Cadastrar Email #5
api
  .post("/inscricao", { email: faker.internet.email() })
  .then(({ data }) => {
    console.log("Email #5 cadastrado", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao cadastrar email #5", error));

// Cadastrar Email #6
api
  .post("/inscricao", { email: faker.internet.email() })
  .then(({ data }) => {
    console.log("Email #6 cadastrado", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao cadastrar email #6", error));

// Cadastrar Email #7
api
  .post("/inscricao", { email: faker.internet.email() })
  .then(({ data }) => {
    console.log("Email #7 cadastrado", JSON.stringify(data, null, 2));
  })
  .catch((error) => console.error("Erro ao cadastrar email #7", error));
