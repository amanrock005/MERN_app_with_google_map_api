import express from "express";
import { manualAddressUpdate } from "../controllers/location.controller.js";

const router = express.Router();

router.put("/updateAddress", manualAddressUpdate);

export default router;
