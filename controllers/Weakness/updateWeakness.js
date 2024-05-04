// const { router, knexDb } = require("../../utils/routes.imports.utils");
const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/update-weakness", async (req, res) => {
    try {
        const { weaknessName, weaknessDescription, weaknessId } = req.body;
        await knexDb("Weakness")
            .update({
                weaknessName: weaknessName,
                weaknessDescription: weaknessDescription
            })
            .where({ weaknessId: weaknessId });
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
