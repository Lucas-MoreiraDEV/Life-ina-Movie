import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const url = "https://api.themoviedb.org/3/"
const bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTNhY2VlNDI2ZDQ2MjE5YTFlYmNiMmY5MzdkZGMxNiIsIm5iZiI6MTc1NjQ3OTczNC40OTYsInN1YiI6IjY4YjFjMGY2YjljZDIwZjhhZjllMTE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QPFm_yGe4zzQ_7gK-fRba71M2svRSsnJ9YcuCNI-w-k"
const apiKey = "c93acee426d46219a1ebcb2f937ddc16"
const config = {
    headers: {
        Authorization: `Bearer ${bearerToken}`,
    }
}
let language = "pt-BR"


app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const paginaAtual = req.query.pag || 1;
    try {
        let response = await axios.get(url + "movie/popular?page=" + paginaAtual + "&include_adult=false" + "&language=" + language, config)
        let data = response.data
        res.render("index", { pagina: data});
    } catch (error) {
        console.error("Error fetching data from TMDB API:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/movie/:id", async (req, res) => {
    const movieID = req.params.id;
    try {
        const response = await axios.get(url + "movie/" + movieID + "?language=" + language, config);
        const data = response.data;
        res.render("filme", { filme: data});
    } catch (error) {
        console.error("Error fetching movie details from TMDB API:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/search", async (req, res) => {
    const search = req.query.pesquisa;
    try {
        const response = await axios.get(url + "search/movie?query=" + search + "&include_adult=false" + "&language=" + language, config);
        const data = response.data;
        res.render("index", { pagina: data } );
    } catch (error) {
        console.error("Error fetching search results from TMDB API:", error);
        res.status(500).send("Internal Server Error");
    }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});