const superagent = require("superagent");
const cheerio = require("cheerio");
const { Movie } = require("../models/movie");
const mongoose = require("mongoose");
const config = require("config");

async function getMovieDetail(href) {
  const res = await superagent.get(href);
  const $ = cheerio.load(res.text);
  const idMatched = href.match(/subject\/(\d+)/);
  const movie = {};

  movie.id = idMatched[1];
  // 名称
  movie.name = $(`[property="v:itemreviewed"]`).text();
  // 导演名
  movie.author = $(`[rel="v:directedBy"]`).first().text();
  // 时长
  movie.duration = $(`[property="v:runtime"]`).text();
  // 类型
  movie.categories = [];
  $(`[property="v:genre"]`).each((i, elm) => {
    movie.categories.push($(elm).text());
  });
  // 上映日期
  movie.pubdate = $(`[property="v:initialReleaseDate"]`).first().text();
  // 评分
  movie.rate = Number($(`[property="v:average"]`).text());
  // 简介
  movie.summary = $(`[property="v:summary"]`).text().replace(/\s*/g, "");
  // 封面
  movie.poster = $("div#mainpic img").attr("src");
  // 主要演员
  movie.casts = [];
  $("ul.celebrities-list li:not(.fake)").each((i, elm) => {
    const name = $(elm).find("a.name").text();
    const matched = $(elm)
      .find(".avatar")
      .attr("style")
      .match(/(https[s]?:[^)]+)/);
    if (!matched || !matched.length) return;
    movie.casts.push({ name, avatar: matched[1] });
  });
  const trailer = $("li.label-trailer a");
  if (trailer.length) {
    movie.cover = trailer.attr("style").match(/(https[s]?:[^)]+)/)[1];
    // 预告片
    movie.video = await getMovieTrailer(trailer.attr("href"));
  }
  return movie;
}

async function getMovieTrailer(href) {
  const res = await superagent.get(href);
  const $ = cheerio.load(res.text);
  return $("source").attr("src");
}

async function crawlMovies() {
  try {
    await mongoose.connect(config.get("db"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    await Movie.deleteMany({});

    const res = await superagent.get("https://movie.douban.com/cinema/nowplaying/guangzhou");
    const $ = cheerio.load(res.text);

    const promises = $("#nowplaying ul.lists .list-item").map(async (i, el) => {
      const href = $(el).find(".stitle a").attr("href");
      const movieDetail = await getMovieDetail(href);
      if (movieDetail.video && movieDetail.duration) {
        const movie = new Movie(movieDetail);
        await movie.save();
        console.log(`Saved info of《${movie.name}》`);
      }
    });

    await Promise.all(promises);
    console.log("Done.");
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

module.exports = crawlMovies;
