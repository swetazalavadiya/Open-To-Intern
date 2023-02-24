const getcollegedata=async function(req,res){
    try{
        let collegeName=req.query.collegeName

        let filterdata= await collegeModel.findOne({name:collegeName})

        if(!filterdata)return res.status(400).send({status:false, message:'college does not exist'})
        let fullName=filterdata.fullName
        let collegelogo=filterdata.logolink
        let collegeid=filterdata._id

        let getintern=await internmodel.find({collegeId:collegeId}).select({_id:1, name:1, email:1, mobile:1})
        res.status(200).send({status:true})


    }catch(err){

    }
}