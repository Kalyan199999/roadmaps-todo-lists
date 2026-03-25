const ToDoItem = require('../collections/todo_items')
// const User = require('../collections/user')

const { 
    isEmpty 
} = require('../utils/commonCode')

const getAll = async ( req,res )=>
{
    try 
    {
        const { id } = req.user;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;

        // No.of items to skip
        const offset = page > 0 ? (page-1)*limit : 0 ;
        
        const data = await ToDoItem.find({userId:id})
                                    .sort({updatedAt:-1})  // sorted in descending order
                                    .skip(offset)
                                    .limit(limit)

        const total = await ToDoItem.countDocuments( { userId:id } )

        return res.status(200).json({
            ok:true,
            count:total,
            page:page,
            limit:limit,
            data:data,
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

// update the items
const update = async (req,res)=>
{
    try
    {
        const { id } = req.params;

        const { title , description } = req.body;
        
        const updated = await ToDoItem.findByIdAndUpdate(   id , 
                                                            { title:title , description:description } , 
                                                            { returnDocument: 'after' }
                                                        )

        if( !updated )
        {
            return res.status(200).json({
                ok:true,
                message:"Item not found,may be invalid item id"
            })
        }

        return res.status(200).json({
            ok:true,
            data:updated
        })
    }
    catch(error)
    {
        return res.status(500).json({
            ok:false,
            message:error.message
        })
    }
}

const remove = async (req, res) => 
{
    try 
    {
        const { id } = req.params;

        const item = await ToDoItem.findByIdAndDelete(id);

        if (!item) 
        {
            
            return res.status(404).json({
                ok: false, 
                message: "Item not found. It may have already been deleted or the ID is invalid."
            });
        }
        
        return res.status(200).json({
            ok: true,
            message: "Item deleted successfully",
            data: item
        });
        
    } 
    catch (error) 
    {
        
        return res.status(500).json({
            ok: false,
            message: error.message
        });
    }
}

module.exports = {
    getAll,
    additem,
    getItemById,
    update,
    remove
}