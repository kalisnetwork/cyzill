import Express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Express.Router()

router.get('/profile', getUser);
router.put('/profile', updateUser);
router.delete('/profile', deleteUser);

export default router;
