import express from "express";
import ReadingList from "../models/readingList.js";
import { checkSession, tokenExtractor } from "../util/middleware.js";

const router = express.Router();

router.post("/", tokenExtractor, checkSession, async (req, res) => {
  const { id: userId } = req.decodedToken;
  const { blogId } = req.body;

  const result = await ReadingList.create({ userId, blogId });
  res.json(result);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  const readingList = await ReadingList.findByPk(id);
  if (!readingList) return res.status(404).json({ error: "Not found" });
  if (readingList.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  readingList.read = read;
  await readingList.save();
  res.json(readingList);
});

router.delete("/:id", tokenExtractor, checkSession, async (req, res) => {
  const { id } = req.params;
  const userId = req.decodedToken.id;

  const readingList = await ReadingList.findByPk(id);

  if (readingList.userId !== userId) {
    console.log("un");

    return res.status(401).json({ error: "Unauthorized" });
  }

  await readingList.destroy();
  res.status(204).end();
});
export default router;
