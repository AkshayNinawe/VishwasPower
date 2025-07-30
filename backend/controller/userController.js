import User from "../model/User.js";

export const createTask = async(req, res) => {
    console.log("BACKEND : Inside create task funtion.")
    try{
        const newTask = new Task(req.body);
        // const {email} = newTask;
        // console.log(newTask, email)
        // const taskExist = await Task.findOne({email})

        // console.log(email, taskExist)
        // if(taskExist){
        //     return res.status(400).json({message: "Task already exisit."})
        // }
        console.log(req.body)
        const savedData = await newTask.save();
        console.log(savedData, newTask )
        res.status(200).json(savedData)

    } catch(error) {
        res.status(500).json({errorMessage:error.message})
    }
}

export const getAllUser = async(req, res) => {
    console.log("BACKEND : Inside get all task function")
    try{
        const userData =  await User.find();
        if(!userData || userData.length === 0){
            return res.status(404).json({message:"There is no task added in the DB."})
        }
        res.status(200).json(userData);
    } catch(error){
        res.status(500).json({errorMessage:error.message})
    }
}

export const getUserByID =  async(req, res) =>{
    try{
        const id = req.params.id;
        const userData = await User.findById(id);
        if(!userData || userData.length === 0){
            return res.status(404).json({message:"There is no user added in the DB."})
        }
        res.status(200).json(userData);
    } catch(error){
        res.status(500).json({errorMessage:error.message})
    }
}

export const updateUser =  async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await User.findById(id);
        if(!userData || userData.length === 0){
            return res.status(404).json({message:"User not found in DB."})
        }
        const newUserData = await User.findByIdAndUpdate(id, req.body, {
            new:true
        })
        res.status(200).json(newUserData)
    } catch (error){
        res.status(500).json({errorMessage:error.message})
    }
}

export const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await User.findById(id);
        if(!userData || userData.length === 0){
            return res.status(404).json({message:"User not found in DB."})
        }
        conolte
        await User.findByIdAndDelete(id)
        res.status(200).json({message:"User Data is deleted successfully"})
    } catch (error){
        res.status(500).json({errorMessage:error.message})
    }
}