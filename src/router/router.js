const controller = require("../controller/nativeSQlQueryController");

const router = require("express").Router();

router.get("/create", controller.createSchema);
router.post("/insert", controller.insertRecord);
router.get("/all", controller.getAllRecord);
router.put("/update", controller.updateRecord);
router.delete("/delete/:id", controller.deleteParticularRecord);
router.delete("/deleteAll", controller.deleteAllRecord);
router.post("/bulk", controller.multipleRecordInsertion);
router.put("/bulkUpdate", controller.bulkUpdate);
router.post("/joins", controller.oneToOneMappingRecordInsertion);
router.post("/bulkInsert", controller.oneToOneMappingRecordBulkInsertion);
router.get("/joinFetch", controller.fetchSinleRecordInJoinTable);
router.post("/fetch", controller.fetchRecord);
router.put("/updateJoin", controller.updateJoinTable);
router.delete("/remove", controller.deleteData);

module.exports = router;
