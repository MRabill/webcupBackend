const { router, knexDb } = require("../../utils/routes.imports.utils");

router.get("/APIBACKEND/get-user-profile-details/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        // Retrieve user details along with associated superpower, weakness, and equipment using inner joins
        const getUserProfile = await knexDb("User")
            .where("User.userId", userId)
            .innerJoin("User_Superpower", "User.userId", "=", "User_Superpower.userId")
            .innerJoin("Superpower", "User_Superpower.superpowerId", "=", "Superpower.superpowerId")
            .innerJoin("User_Weakness", "User.userId", "=", "User_Weakness.userId")
            .innerJoin("Weakness", "User_Weakness.weaknessId", "=", "Weakness.weaknessId")
            .innerJoin("User_Equipment", "User.userId", "=", "User_Equipment.userId")
            .innerJoin("Equipment", "User_Equipment.equipmentId", "=", "Equipment.equipmentId")
            .select("User.*", "Superpower.*", "Weakness.*", "Equipment.*");

        // Extract unique superpowers, weaknesses, and equipment using Sets
        const superpowersSet = new Set();
        const weaknessesSet = new Set();
        const equipmentSet = new Set();

        const userDetail = getUserProfile.reduce((acc, {
            userId,
            username,
            role,
            image,
            password,
            heroName,
            contactInfo,
            superpowerId,
            superpowerName,
            superpowerDescription,
            weaknessId,
            weaknessName,
            weaknessDescription,
            equipmentId,
            equipmentName,
            equipmentDescription
        }) => {
            if (!superpowersSet.has(superpowerId)) {
                superpowersSet.add(superpowerId);
                acc.superpowers.push({
                    superpowerId,
                    superpowerName,
                    superpowerDescription
                });
            }

            if (!weaknessesSet.has(weaknessId)) {
                weaknessesSet.add(weaknessId);
                acc.weaknesses.push({
                    weaknessId,
                    weaknessName,
                    weaknessDescription
                });
            }

            if (!equipmentSet.has(equipmentId)) {
                equipmentSet.add(equipmentId);
                acc.equipment.push({
                    equipmentId,
                    equipmentName,
                    equipmentDescription
                });
            }

            return {
                userId,
                username,
                role,
                image,
                password,
                heroName,
                contactInfo,
                superpowers: [...acc.superpowers],
                weaknesses: [...acc.weaknesses],
                equipment: [...acc.equipment]
            };
        }, {
            superpowers: [],
            weaknesses: [],
            equipment: []
        });

        res.status(200).json({
            payload: userDetail,
            message: "Successfully fetched user profile",
            success: true,
        });
    } catch (e) {
        console.error({ error: e });
        res.status(500).send([]);
    }
});


module.exports = router;
