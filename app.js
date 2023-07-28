const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

require("dotenv").config()

const PORT = 3000
const app = express()
const reciever_email = []

const verdict = []
const PERMA_questions = [
  {},
{"question":"How often do you find yourself happy?","option1":"Rarely","option2":"Frequently","code":"P"},
{"question":"Do you often experience feelings of excitement and enthusiasm?","option1":"Rarely","option2":"Frequently","code":"P"},
{"question":"How frequently do you feel grateful for the good things in your life?","option1":"Rarely","option2":"Frequently","code":"P"},

{"question":"Do you actively seek out new challenges to keep yourself engaged?","option1":"Rarely","option2":"Frequently","code":"E"},
{"question":"How often do when you're doing activities you enjoy, you lose track of time?","option1":"Rarely","option2":"Frequently","code":"E"},
{"question":"How often do you get completely absorbed in what you're doing?","option1":"Rarely","option2":"Frequently","code":"E"},

{"question":"Do you feel like you have a support system of friends and family?","option1":"Negative","option2":"Affiramative","code":"R"},
{"question":"How often do you spend quality time with people who uplift and inspire you?","option1":"Negative","option2":"Affiramative","code":"R"},
{"question":"Do you feel comfortable sharing your thoughts and feelings with others?","option1":"Negative","option2":"Affiramative","code":"R"},


{"question":" Do you feel a sense of purpose and direction in your life?","option1":"Negative","option2":"Affirmative","code":"M"},
{"question":" Do you feel that your life has a deeper meaning beyond just day-to-day activities?","option1":"Negative","option2":"Affirmative","code":"M"},
{"question":"Do you like going to college/school/office ?","option1":"Negative","option2":"Affirmative","code":"M"},


{"question":"Have you achieved any major goals ?","option1":"Negative","option2":"Affirmative","code":"A"},
{"question":"Do you think your Parents are proud of you?","option1":"Negative","option2":"Affirmative","code":"A"},
{"question":"Do you think people respect you ?","option1":"Negative","option2":"Affirmative","code":"A"},


{"question":"Do you feel jealous at some times ?","option1":"Negative","option2":"Affiramative","code":"P"},
{"question":"Do you feel you need a partner?","option1":"Negative","option2":"Affiramative","code":"R"},
{"question":"Do you spend negative time on socials?","option1":"Negative","option2":"Affiramative","code":"M"},
{"question":"Can you dance without fear in public?","option1":"Negative","option2":"Affiramative","code":"E"},
{"question":"Do you think you have done good in your life so far ?","option1":"Negative","option2":"Affiramative","code":"A"},
]



app.use(express.static(__dirname+"/Public"));  //use this to use css files insie templates 
app.use(bodyParser.urlencoded({extended:true}));


app.set('views', __dirname + '/views');
app.set("view engine","ejs");

//Email
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: process.env.FROM,
    pass: process.env.PASS
  }
});





app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/question",(req,res)=>{
    const reciever = req.body.reciever_email
    reciever_email.push(reciever)
    res.render("questions")
})

app.post("/result",(req,res)=>{
  let p = (parseFloat(req.body.avalue)+parseFloat(req.body.bvalue)+parseFloat(req.body.cvalue)+parseFloat(req.body.dvalue))/2
  let e = (parseFloat(req.body.evalue)+parseFloat(req.body.fvalue)+parseFloat(req.body.gvalue)+parseFloat(req.body.hvalue))/2
  let r = (parseFloat(req.body.ivalue)+parseFloat(req.body.jvalue)+parseFloat(req.body.kvalue)+parseFloat(req.body.lvalue))/2
  let m = (parseFloat(req.body.mvalue)+parseFloat(req.body.nvalue)+parseFloat(req.body.ovalue)+parseFloat(req.body.pvalue))/2
  let a = (parseFloat(req.body.qvalue)+parseFloat(req.body.rvalue)+parseFloat(req.body.svalue)+parseFloat(req.body.tvalue))/2


  if(p<e && p<r && p<m && p<a ){
    verdict.push("I've noticed that you've been experiencing some fluctuations in your positive emotions lately. It's completely normal to have ups and downs, but it's essential to take note of how you're feeling overall. Let's work together to identify activities and practices that bring you joy and help you maintain a positive outlook on life. Remember, small steps can lead to significant changes in your overall well-being.")
  }
  else if(r<p && r<e && r<m && r<a ){
   verdict.push("I hope that you have healthy and positive relationships with others. However, nurturing these connections further can be very beneficial for your overall well-being. Let's discuss ways to deepen these relationships, communicate effectively, and build a support system that you can rely on during challenging times. Strong social ties contribute significantly to happiness and resilience.")
  }
  else if(e<r && e<r && e<m && e<a ){
    verdict.push("I've observed that you haven't been as engaged and enthusiastic in your daily activities recently. It's crucial to find a sense of flow and fulfillment in what you do. Let's explore your interests and passions, and see how we can incorporate them into your routine. Engaging in activities that resonate with you can boost your energy and motivation, leading to a more satisfying and productive life.")
  }
  else if(m<r && m<p && m<e && m<a ){
     verdict.push("It seems like you've been contemplating the bigger picture and searching for a sense of purpose in your life. Finding meaning is a journey that requires self-reflection and exploration of your values and aspirations. Let's work together to uncover your passions and align your actions with what truly matters to you. Discovering your sense of purpose will bring more fulfillment and a greater sense of direction.")
  }
  else if(a<r && a<p && a<m && a<e ){
     verdict.push("I want you to know that i beleive you've achieved some remarkable things, and your hard work is commendable. However, I also sense that you might be setting high expectations for yourself. It's essential to recognize and celebrate your accomplishments, no matter how small they might seem. We'll work on setting realistic and achievable goals, which will give you a sense of progress and success, boosting your self-confidence and well-being.")
  }


  const mailOptions = {
        from:process.env.FROM,
        to:reciever_email[0],
        subject:"Euphoria Check",
        text:`Here are your PERMA scores\n\nPositive Emotions: ${p} \nEngagement: ${e} \nRelationships: ${r} \nMeaning: ${m} \nAccomplishment: ${a} \n\n ${verdict[0]} \n\n Aryan Inguz.`
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            res.send(error)
        }else{
            res.send("mail sent!"+info.response)
        }
    })
  res.render("result",{pos:p,eng:e,mea:m,rel:r,acc:a})
})


app.listen(process.env.PORT || 3000,function(){
  console.log("Server Started Sucessfully")
})