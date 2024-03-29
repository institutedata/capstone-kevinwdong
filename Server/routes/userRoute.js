import { Router } from "express";
let router = Router();
import { userController } from "../controllers/index.js";


router.post('/register', (req, res) => {
   userController.registerUser(req, res);
})

router.post('/login', (req, res) => {
   userController.authenticateUser(req, res);
})

router.get('/profile', (req, res) => {
   userController.updateUserProfile(req, res);
})

// router.get('/get', (req, res) => {
//    userController.getUser(req, res);
// })

// router.post('/create', (req, res) => {
//    userController.createUser(req, res);
// })

// router.put('/update', (req, res) => {
//    userController.updateUser(req, res)
// })

// router.delete('/delete', (req, res) => {
//    userController.deleteUser(req, res)
// })



export default router;
