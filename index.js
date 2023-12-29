// const { json } = require("body-parser");
// const express = require("express");
// const fs=require("fs");


// const app = express();

// //whenever we want to send the request we need to wrte this at the top,
// //for text.
// // app.use(express.text()); //middleware.

// //for JSON.
// app.use(express.json()) //middleware.


// //for get request.

// app.get("/" ,(req,res)=>{
//     //logic
//     res.send("Welcome To Home Page");
// })

// //for post request.
// app.post("/adduser",(req,res)=>{
//     //logic.
//     console.log(req.body);
//     res.send("WOHHO! new user added");
// })

// //for reading all the data from db.json need to install fs module at the top.

// app.get("/data",(req,res)=>{
//     fs.readFile("./db.json","utf-8",(err,data)=>{
//         if(err){
//             res.send(err);
//         }else{
//             res.send(data);
//         }
//     })
// })

// //for reading only a part of data from db.json.
// app.get("/students" , (req,res)=>{
//    const data= JSON.parse(fs.readFileSync("./db.json","utf-8"))
//     res.send(data.students);
// })

// //for posting one data.
// app.post("/addstudent",(req,res)=>{
//     //step1 ===> read the complete data file.
//     const data=fs.readFileSync("./db.json", "utf-8");
//     //step2===> parse the data.
//     const parsed_data=JSON.parse(data);
//     //step3 ===>filter students array from it.
//     //step4===> push the req.body in the students array.
//     parsed_data.students.push(req.body)
//     //step5===> write the complete data back to the file.
//     fs.writeFileSync("./db.json",JSON.stringify(parsed_data));
//     console.log("new student added");
// })




// app.patch("/udatestudent/:id",(req,res)=>{
//     const studentId=req.params.id;
//     const updateStudent=req.body;
//     const data=JSON.parse(fs.readFileSync("./db.json","utf-8"));
//     let student=data.students;
//     let index=-1;
//     let count=0;
//     student.forEach((stu)=>{
//         if(stu.id===studentId){
//             index=count;
//         }
//         count++;
//     })
//     data.students[index]={...data.students[index], ...updateStudent}
//     fs.writeFileSync("./db.json",JSON.stringify(data));
//     res.send("Wohho!   Student updated");
// })




// // delete
// app.delete("/deleteuser/:id", (req, res) => {
//     let id = req.params.id;
//     const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
//     let index = data.students.findIndex((student) => {
//        return student.id == Number.parseInt(id);
//     });
 
//     if (index >= 0) {
//        let deletedStudent = data.students[index];
//        data.students.splice(index, 1);
//        fs.writeFileSync("./db.json", JSON.stringify(data));
//        res.json(deletedStudent);
//     } else {
//        res.status(404).send("Student not found");
//     }
//  });
 

// app.listen(4500,()=>{
//     console.log("Server is running at port 4500");
// })







//  import required modules from nodejs and build the server

const express=require('express');
const fs=require('fs');
// export the server


const app=express();
app.use(express.json());

//get the data.
app.get('/',(req,res)=>{
    const totalData=JSON.parse(fs.readFileSync("./db.json","utf-8"));
    const todos=totalData.todos;

    res.status(200).send(todos);
    console.log("get the data");
})

///post.
//read the data .
//get the array
//push the req.body.
//get the totol data.
//write 


app.post('/',(req,res)=>{
    const totalData=JSON.parse(fs.readFileSync('./db.json',"utf-8"));
    const todos=totalData.todos;
    todos.push(req.body);
    totalData.todos=todos;
    fs.writeFileSync('./db.json',JSON.stringify(totalData),"utf-8");
    res.status(200).json(totalData.todos);
})

//put

app.put('/:id',(req,res)=>{
    const id=+req.params.id;
    const totalData=JSON.parse(fs.readFileSync('./db.json',"utf-8"));
    const todos=totalData.todos;

    let index=-1;
    let count=0;
    todos.forEach(data=>{
        if(data.id===id){
            index=count;
        }
        count++;
    })
    if(index==-1){
        res.status(400).send("Invalid argument");
    }else{
        todos[index]=req.body;
        totalData.todos=todos;
       
        fs.writeFileSync('./db.json',JSON.stringify(totalData),"utf-8");
        res.status(200).send(totalData.todos);

    }
})
//Delete 
 app.delete('/:id',(req,res)=>{
    let id=+req.params.id;
    const totalData=JSON.parse(fs.readFileSync('./db.json','utf-8'));
    let todo=totalData.todos;
    let index=-1;
    let count=0;
    todo.forEach(data=>{
        if(data.id==id){
            index=count;
        }
        count++;
    })
    if(index==-1){
        res.status(400).send("Invalid argument");
    }else{
        todo=todo.filter(data=> data.id!=id)
        totalData.todos=todo;
        fs.writeFileSync('./db.json',JSON.stringify(totalData));
        res.status(200).json(totalData.todos);
    }
 })


// eg.module.exports = app;

app.listen(4500,()=>{
    console.log("port is runnig on 4500");
})

module.exports=app;
