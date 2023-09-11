import { Router } from "express";
import amazonScraping from "../controllers/AmazonController";

const router = Router();

router.get("/produto/:produto", amazonScraping);


export default router