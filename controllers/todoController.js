const ToDoItem = require('../collections/todo_items')
// const User = require('../collections/user')

const { 
    isEmpty 
} = require('../utils/commonCode')

const getAll = async ( req,res )=>
{
    try 
    {
        const data = await ToDoItem.find({})

        return res.status(200).json({
            ok:true,
            data:data
        })
    } 
    catch (error) 
    {
        return res.status(500).json({
            ok:false,
            message:error.message
        })
    }
}

const additem = async (req,res)=>
{
    try
    {
        const user = req.user;

        const { title , description } = req.body;

        if( !isEmpty(title) || !isEmpty(description) )
        {
            return res.status(404).json({
                ok:false,
                message:"Fields can not be empty!"
            })
        }

        const item = new ToDoItem(
            {
                userId:user.id,
                title:title,
                description:description
            }
         );

        await item.save();

        return res.status(200).json(
            {
                ok:true,
                data:{
                    id:item._id,
                    title:item.title,
                    description:item.description
                }
            }
        )
    }
    catch(error)
    {
        return res.status(500).json({
            ok:false,
            message:error.message
        })
    }
}

const getItemById = async (req,res)=>
{
    try
    {
        const { id } = req.params;

        const item = await ToDoItem.findById(id)

        if( !item )
        {
            return res.status(400).json(
                {
                    ok:false,
                    message:"Item not found!"
                }
            )
        }
        
        return res.status(200).json(
            {
                ok:true,
                data:{
                    id:item._id,
                    title:item.title,
                    description:item.description
                }
            }
        )
    }
    catch(error)
    {
        return res.status(500).json({
            ok:false,
            message:error.message
        })
    }
}

module.exports = {
    getAll,
    additem,
    getItemById
}