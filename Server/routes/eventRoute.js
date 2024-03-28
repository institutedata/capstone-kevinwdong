import { Router } from "express";
let router = Router();
import { eventController } from "../controllers/index.js"; 

router.get('/get', (req, res) => {
   eventController.getEvent(req, res);
}) 

router.post('/create', (req, res) => {
   eventController.createEvent(req, res);
})

router.put('/updateEventDetail', (req, res) => {
   eventController.updateEventDetail(req, res)
})

router.put('/updateEventComment', (req, res) => {
   eventController.updateEventComment(req, res)
})

router.put('/updateEventParticipant', (req, res) => {
   eventController.updateEventParticipant(req, res)
})

router.put('/updateEventStar', (req, res) => {
   eventController.updateEventStar(req, res)
})

router.delete('/delete', (req, res) => {
   eventController.deleteEvent(req, res)
})

export default router;