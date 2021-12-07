const express = require("express");
const cors = require("cors");
const storage = require("node-persist");
const { uuid } = require("uuidv4");
const nodeMailer = require("nodemailer");

async function server() {
  const port = process.env.PORT || 3333;

  const app = express();

  app.use(cors());
  app.use(express.json());

  await storage.init({
    dir: "db",
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: "utf8",
    logging: false, // can also be custom logging function
    ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object
    expiredInterval: 60 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache
    // in some cases, you (or some other service) might add non-valid storage files to your
    // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
    forgiveParseErrors: false,
  });

  const transporter = nodeMailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "guilhermecamargo57@hotmail.com",
      pass: "xsmtpsib-77d65afc2d312186b1fb3dac7efead10ecbea1d429c073a8071bc2c1e64817cf-q5spmC8Yt6HJWv1R",
    },
  });

  app.get("/noticia", async (req, res) => {
    const noticias = (await storage.getItem("noticias")) || [];
    return res.json(noticias);
  });

  app.get("/noticia/:id", async (req, res) => {
    const { id } = req.params;
    const noticias = (await storage.getItem("noticias")) || [];
    const noticiaEncontada = noticias.find((noticia) => noticia.id === id) || {
      message: `Notícia com id '${id}' não encontrada `,
      status: 404,
    };
    return res.status(noticiaEncontada?.status || 200).json(noticiaEncontada);
  });

  app.post("/noticia", async (req, res) => {
    const { titulo, resumo, url } = req.body;
    const noticias = (await storage.getItem("noticias")) || [];
    const novaNoticia = { titulo, resumo, url, id: uuid() };
    noticias.push(novaNoticia);
    await storage.setItem("noticias", noticias);
    return res.json(novaNoticia);
  });

  app.post("/inscricao", async (req, res) => {
    const { email } = req.body;
    const inscricoes = (await storage.getItem("inscricoes")) || [];
    const emailJaCadastrado = inscricoes.some(
      (incricao) => incricao.email === email
    );
    let result = { message: "", status: 400 };
    if (!emailJaCadastrado) {
      const inscricao = { email, id: uuid() };
      inscricoes.push(inscricao);
      await storage.setItem("inscricoes", inscricoes);
      result = inscricao;
    } else {
      result.message = `Email '${email}' já cadastrado`;
    }
    return res.status(result?.status || 200).json(result);
  });

  app.put("/enviar/:id", async (req, res) => {
    const { id } = req.params;
    const noticias = (await storage.getItem("noticias")) || [];
    const noticiaExiste = noticias.find((noticia) => noticia.id === id);
    let result = { message: "", status: 400 };
    let emailEnviados = [];
    let intervaloDeEnvio;
    if (noticiaExiste) {
      const inscricoes = (await storage.getItem("inscricoes")) || [];
      if (inscricoes.length === 0) {
        result = { message: "Não há emails cadastrados", status: 400 };
      } else {
        while (inscricoes.length > 0) {
          await new Promise((resolve, reject) => {
            setTimeout(async () => {
              const inscricao = inscricoes.pop();
              console.log(
                "Enviando noticia",
                noticiaExiste,
                `para email ${inscricao.email}`
              );

              try {
                await transporter.sendMail({
                  from: '"Atividade Avaliativa 2 👻" <atividade-avaliativa-2@topicos.com>', // sender address
                  to: inscricao.email, // list of receivers
                  subject: noticiaExiste.titulo, // Subject line
                  text: `${noticiaExiste.resumo} \n ${noticiaExiste.url}`,
                });
                emailEnviados.push(inscricao);
                resolve();
              } catch (error) {
                emailEnviados["message"] = "Erro ao enviar email";
                emailEnviados["status"] = 500;
                reject(error);
              }
            }, 2000);
          });
        }
        result = emailEnviados;
      }
    } else {
      result.message = `Noticia com id '${id}' não cadastrada`;
    }
    return res.status(result?.status || 200).json(result);
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

server();
