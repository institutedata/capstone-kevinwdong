import { Router } from "express";
let router = Router();
import { postController } from "../controllers/index.js"; 


router.get('/get', (req, res) => {
   postController.getPost(req, res);
})

router.post('/create', (req, res) => {
   postController.createPost(req, res);
})

router.put('/update', (req, res) => {
   postController.updatePost(req, res)
})

router.put('/updateComment', (req, res) => {
   postController.updatePostComment(req, res)
})

router.put('/updateStar', (req, res) => {
   postController.updatePostStar(req, res)
})

router.delete('/delete', (req, res) => {
   postController.deletePost(req, res)
})


export default router;