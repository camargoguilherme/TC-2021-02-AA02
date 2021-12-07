const axios = require("axios");

const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

// Buscando todas as noticias
api
  .get("/noticia")
  .then(({ data }) => {
    //data.map((noticia) => console.log(JSON.stringify(noticia, null, 2)));
    const index = getRandom(data.length);
    const id = data[index].id;
    api
      .get(`/noticia/${id}`)
      .then(({ data }) => {
        console.log(`noticia com id '${id}'`, JSON.stringify(data, null, 2));
      })
      .catch((error) =>
        console.error(`Erro ao buscar noticia com id '${id}'`, error)
      );

    api
      .put(`/enviar/${id}`)
      .then(({ data }) => {
        console.log(`E-mail enviados para:`, JSON.stringify(data, null, 2));
      })
      .catch((error) =>
        console.error(
          `Erro ao buscar ao enviar email sobre a noticia com id '${id}'`,
          error
        )
      );
  })
  .catch((error) => console.error("Erro ao buscar noticias.", error));
