// const { router, knexDb } = require("../../utils/routes.imports.utils");
const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/update-superpower", async (req, res) => {
    try {
        const {superpowerName,superpowerDescription  , superpowerId } = req.body;
        await knexDb("Superpower")
            .update({
                superpowerName: superpowerName,
                superpowerDescription : superpowerDescription
            })
            .where({ superpowerId: superpowerId });
        res.status(200).send({
            payload: [],
            message: "Successfully updated weakness",
            success: true, a
        });
    } catch (e) {
        console.error({ error: e });
        res.status(500).send([]);
    }
});

module.exports = router;
