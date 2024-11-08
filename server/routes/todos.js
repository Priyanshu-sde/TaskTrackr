import express from 'express';
import Todo from '../model/todos.js';
import { authenticate } from '../auth/auth.js';

const router = express.Router();

router.post('/newTodo',authenticate, async (req,res) => {
    const { title } = req.body;
    const todo = await Todo.create({
        title ,
        done: false,
        userId : req.userId
    });
    res.json({message: 'Task Created',todo});
});

router.get('/todos', authenticate, async (req,res) =>{
    const todos = await Todo.find({
        userId:req.userId
    });
    res.json(todos);
});

router.put('/todos/:id', authenticate, async(req,res) => {
    const {id } = req.params;
    const {title} = req.body;
    const todo = await Todo.findByIdAndUpdate({
        _id : id,
        userId : req.userId
    }, {title} ,{new: true});
    res.json({message:'Todo Updated', todo });

});

router.patch('/todos/:id/done',authenticate,async (req,res) => {
    const { id } = req.params;
    const todo = await Todo.findOneAndUpdate({_id: id, userId:req.userId},{done : true}, {new:true});
    res.json({
        message:'Todo Done', todo
    });
});

router.delete('/todos/:id',authenticate, async (req,res) => {
    const {id} = req.params;
    await Todo.findOneAndDelete({_id:id, userId: req.userId});
    res.json({
        message:'Todo Deleted'
    });
});



export default router;


