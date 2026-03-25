[1mdiff --git a/controllers/todoController.js b/controllers/todoController.js[m
[1mindex b73365e..2ca4a02 100644[m
[1m--- a/controllers/todoController.js[m
[1m+++ b/controllers/todoController.js[m
[36m@@ -120,8 +120,34 @@[m [mconst getItemById = async (req,res)=>[m
     }[m
 }[m
 [m
[32m+[m[32m// update[m
[32m+[m[32mconst update = async (req,res)=>[m
[32m+[m[32m{[m
[32m+[m[32m    try[m
[32m+[m[32m    {[m
[32m+[m[32m        const { id } = req.params;[m
[32m+[m
[32m+[m[32m        const { title , description } = req.body;[m
[32m+[m[41m        [m
[32m+[m[32m        const updated = await ToDoItem.findByIdAndUpdate(id , {title:title,description:description} , { returnDocument: 'after' })[m
[32m+[m
[32m+[m[32m        return res.status(200).json({[m
[32m+[m[32m            ok:true,[m
[32m+[m[32m            data:updated[m
[32m+[m[32m        })[m
[32m+[m[32m    }[m
[32m+[m[32m    catch(error)[m
[32m+[m[32m    {[m
[32m+[m[32m        return res.status(500).json({[m
[32m+[m[32m            ok:false,[m
[32m+[m[32m            message:error.message[m
[32m+[m[32m        })[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[32m+[m
 module.exports = {[m
     getAll,[m
     additem,[m
[31m-    getItemById[m
[32m+[m[32m    getItemById,[m
[32m+[m[32m    update[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/routes/todoRoute.js b/routes/todoRoute.js[m
[1mindex 5c75b8c..07a4775 100644[m
[1m--- a/routes/todoRoute.js[m
[1m+++ b/routes/todoRoute.js[m
[36m@@ -5,7 +5,8 @@[m [mconst Verification = require('../middlewares/userVerification')[m
 const { [m
     getAll,[m
     additem,[m
[31m-    getItemById[m
[32m+[m[32m    getItemById,[m
[32m+[m[32m    update[m
 } = require('../controllers/todoController')[m
 [m
 const route = express.Router()[m
[36m@@ -16,4 +17,6 @@[m [mroute.post('/add' , Verification , additem )[m
 [m
 route.get('/:id' , Verification , getItemById)[m
 [m
[32m+[m[32mroute.patch('/update/:id' , update)[m
[32m+[m
 module.exports = route;[m
\ No newline at end of file[m
