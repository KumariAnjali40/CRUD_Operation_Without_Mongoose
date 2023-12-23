const { json } = require("body-parser");
const express = require("express");
const fs=require("fs");


const app = express();

//whenever we want to send the request we need to wrte this at the top,
//for text.
// app.use(express.text()); //middleware.

//for JSON.
app.use(express.json()) //middleware.


//for get request.

app.get("/" ,(req,res)=>{
    //logic
    res.send("Welcome To Home Page");
})

//for post request.
app.post("/adduser",(req,res)=>{
    //logic.
    console.log(req.body);
    res.send("WOHHO! new user added");
})

//for reading all the data from db.json need to install fs module at the top.

app.get("/data",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    })
})

//for reading only a part of data from db.json.
app.get("/students" , (req,res)=>{
   const data= JSON.parse(fs.readFileSync("./db.json","utf-8"))
    res.send(data.students);
})

//for posting one data.
app.post("/addstudent",(req,res)=>{
    //step1 ===> read the complete data file.
    const data=fs.readFileSync("./db.json", "utf-8");
    //step2===> parse the data.
    const parsed_data=JSON.parse(data);
    //step3 ===>filter students array from it.
    //step4===> push the req.body in the students array.
    parsed_data.students.push(req.body)
    //step5===> write the complete data back to the file.
    fs.writeFileSync("./db.json",JSON.stringify(parsed_data));
    console.log("new student added");
})



//patch request.
app.patch("/updateuser/:id",(req,res)=>{

      const studentIdToUpdate=req.name.id;
    //step1===> Read the complete data file.
    const data =fs.readFileSync("./db.json","utf-8");

    //step2===> parse the data.
    const parsed_data=JSON.parse(data);

    //step3===>find the index of the student with the given id.
    const updateIndex=parsed_data.students.findIndex(student =>{
        student.id===studentIdToUpdate;
    })
    if(updateIndex!== -1){
        //update the student data.
        parsed_data.students[updateIndex]={...parsed_data.student[updateIndex], ...req.body};

        //wirte the complete data back to file.
        fs.writeFileSync("./db.json", JSON.stringify(parsed_data));

        res.send("Student updated")
    }else{
        res.status(404).send("student not found");
    }
});


//delete
app.delete("/deleteuser",(res,req)=>{
   
})

app.listen(4500,()=>{
    console.log("Server is running at port 4500");
})