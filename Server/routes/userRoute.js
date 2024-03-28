import { Router } from "express";
let router = Router();
import { userController } from "../controllers/index.js";


router.get('/get', (req, res) => {
   userController.getUser(req, res);
})

router.post('/create', (req, res) => {
   userController.createUser(req, res);
})

router.put('/update', (req, res) => {
   userController.updateUser(req, res)
})

router.delete('/delete', (req, res) => {
   userController.deleteUser(req, res)
})



export default router;
