import Action from "../models/actioModel.js";

export async function getLogs(req,res){
    try{
        const logs  = await Action.find()
        .sort({timestamp:-1})
        .limit(20)
        .populate("user","username")
        .populate("task","title")
        return res.status(200).json({ logs });

    }catch(err){
        return res.status(500).json({ message: "Failed to fetch activity logs" });
    }
}