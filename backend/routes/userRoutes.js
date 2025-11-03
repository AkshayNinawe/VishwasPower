import express from "express"
import {getAllUser} from "../controller/userController.js"
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// route.post("/addtask", createTask) // create user
// route.get("/user/:id", getUserByID) // Get user having ID
// route.put("/user/update/:id", updateUser) // Update user having ID
// route.delete("/delete/user/:id", deleteUser); // delete the data


router.get('/alluser', protect, getAllUser);
// router.get('/', protect, getDishes);
// router.get('/:id', protect, getDishById);



export default router;
