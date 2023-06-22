const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

// Define uma rota para o endpoint GET
app.get("/cnae/:cod", async (req, res) => {
  try {
    const codigo = req.params.cod;

    // Requisição HTTP para a URL
    const response = await axios.get(
      `https://www.vriconsulting.com.br/trabalhista/grau-risco-rat.php?busca=${codigo}`
    );

    // Carregar conteúdo HTML retornado
    const $ = cheerio.load(response.data);

    // objeto com os dados capturados
    const data = {
      valor: $("td[title='Grau de Risco da CNAE.']").text().trim(),
    };

    // Retorne os dados capturados
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocorreu um erro na API");
  }
});

const port = process.env.PORT || 3000;

// Inicia o servidor
app.listen(port, () => {
  console.log(`Api rodando na porta ${port} 🚀`);
});
