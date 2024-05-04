const { router, knexDb } = require("../../utils/routes.imports.utils");

router.get("/APIBACKEND/get-news", async (req, res) => {
  try {
    const getNews = await knexDb("News").select("*");

    res.status(200).send({
      payload: getNews,
      message: "Successfully fetched News",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
