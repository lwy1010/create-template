const superagent = require("superagent");
const cheerio = require("cheerio");
const { Movie } = require("../models/movie");
const mongoose = require("mongoose");
const config = require("config");

async function getMovieTrailer(href) {
  const res = await superagent.get(href);
  const $ = cheerio.load(res.text);
  return $("source").attr("src");
}

async function getMovieDetail(href) {
  const res = await superagent.get(href);
  const $ = cheerio.load(res.text);
  const idMatched = href.match(/subject\/(\d+)/);
  const movie = { id: idMatched[1] };

  movie.name = $(`[property="v:itemreviewed"]`).text();
  movie.author = $(`[rel="v:directedBy"]`).first().text();
  movie.duration = $(`[property="v:runtime"]`).text();
  movie.categories = [];
  $(`[property="v:genre"]`).each((i, elm) => {
    movie.categories.push($(elm).text());
  });
  movie.pubdate = $(`[property="v:initialReleaseDate"]`).first().text();
  movie.rate = Number($(`[property="v:average"]`).text());
  movie.summary = $(`[property="v:summary"]`).text().replace(/\s*/g, "");
  movie.poster = $("div#mainpic img").attr("src");
  movie.casts = [];
  $("ul.celebrities-list li:not(.fake)").each((i, elm) => {
    const name = $(elm).find("a.name").text();
    const matched = $(elm)
      .find(".avatar")
      .attr("style")
      .match(/(https[s]?:[^)]+)/);
    if (!matched || !matched.length) return;
    movie.casts.push({
      name,
      avatar: matched[1],
    });
  });
  const trailer = $("li.label-trailer a");
  if (trailer.length) {
    movie.cover = trailer.attr("style").match(/(https[s]?:[^)]+)/)[1];
    movie.video = await getMovieTrailer(trailer.attr("href"));
  }
  return movie;
}

module.exports = async () => {
  try {
    await mongoose.connect(config.get("db"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    await Movie.deleteMany({});

    const res = await superagent.get("https://movie.douban.com/cinema/nowplaying/guangzhou");
    const $ = cheerio.load(res.text);
    $("#nowplaying ul.lists .list-item").each(async (i, el) => {
      const href = $(el).find(".stitle a").attr("href");
      const movieDetail = await getMovieDetail(href);
      const movie = new Movie(movieDetail);
      await movie.save();
      console.log(`Saved info of《${movie.name}》`);
    });
  } catch (error) {
    console.log(error);
  }
};
