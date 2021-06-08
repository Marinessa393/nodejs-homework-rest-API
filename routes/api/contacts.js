const express = require("express");
const router = express.Router();
const Model = require("../../model");
const {
  ValidateCreateContact,
  ValidateChangeContact,
} = require("./validation");

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await Model.listContacts();
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Model.getContactById(req.params.contactId);
    if (contact) {
      res.json({ status: "success", code: 200, data: { contact } });
    }
    res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", ValidateCreateContact, async (req, res, next) => {
  try {
    const contacts = await Model.addContact(req.body);
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Model.removeContact(req.params.contactId);
    if (contact) {
      res.json({ status: "success", code: 200, message: "contact deleted" });
    }
    res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", ValidateChangeContact, async (req, res, next) => {
  if (!req.body) {
    return res.json({ status: "error", code: 400, message: "missing fields" });
  }
  try {
    const contact = await Model.updateContact(req.params.contactId, req.body);
    if (contact) {
      res.json({ status: "success", code: 200, data: { contact } });
    }
    res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
