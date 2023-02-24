const internModel =require('../Model/internModel')
const collegeModel = require('../Model/collegeModel')
const validation = require('../validation/validation')

let newData= async function(req,res){
    
    try{
        let data = req.body
        let { Name, email, mobile, collegeName } = data
        if (!Name) return res.status(400).send({ status: false, message: "name required" })
        if (!validation.Name(data.Name)) return res.status(400).send({ status: false, message: "invalid Name" })

        if (!email) return res.status(400).send({ status: false, message: "email required" })
        if (!validation.email(data.email)) return res.status(400).send({ status: false, message: "invalid email" })
        let checkDuplicate = await internModel.findOne({ email: data.email })
        if (checkDuplicate)return res.status(400).send({ status: false, msg: "email is already exist."})

        if (!mobile) return res.status(400).send({ status: false, message: "mobile required" })
        if (!validation.mobile(data.mobile)) return res.status(400).send({ status: false, message: "invalid mobile" })
        let checkDuplicate2 = await internModel.findOne({ mobile: data.mobile })
        if (checkDuplicate2)return res.status(400).send({ status: false, msg: "mobile number is already exist."})

        let getcollegeId=await collegeModel.findOne({name:collegeName})
        if (!getcollegeId) return res.status(400).send({status:false, message:"collegename is not exist"})
        data.collegeId=getcollegeId._id

        let interns = await internModel.create(data)
        return res.status(201).send({ status: true, data: interns })

    }catch(error){
        res.status(500).send({ status: false, message: error.message, message: " server error" })
    }
}

module.exports.newData=newData