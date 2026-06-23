import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/filmes", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "filmes.html"));
});

app.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "contato.html"));
});

const catalogo = [
    { id: 1, titulo: "Pânico", ano: 1996, diretor: "Wes Craven" },
    { id: 2, titulo: "Shrek 2", ano: 2004, diretor: "Andrew Adamson" },
    { id: 3, titulo: "Todo Mundo Quase Morto", ano: 2004, diretor: "Edgar Wright" }
];

app.get("/api/filmes", (req, res) => {
    res.json(catalogo);
});

app.get("/api/filmes/busca", (req, res) => {
    const { termo } = req.query;
    
    if (!termo) {
        return res.json(catalogo);
    }

    const resultados = catalogo.filter(filme => 
        filme.titulo.toLowerCase().includes(termo.toLowerCase())
    );

    if (resultados.length === 0) {
        return res.status(404).json({ mensagem: "Nenhum filme/série encontrado com esse termo." });
    }

    res.json(resultados);
});

app.get("/api/filmes/:id", (req, res) => {
    const { id } = req.params;
    const filmeEncontrado = catalogo.find(filme => filme.id === parseInt(id));

    if (!filmeEncontrado) {
        return res.status(404).json({ mensagem: "ID não encontrado no catálogo." });
    }

    res.json(filmeEncontrado);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});