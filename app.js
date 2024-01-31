const express = require('express')
const bodyParser = require("body-parser")
const axios = require("axios")
const sgMail = require("@sendgrid/mail")
const inputValidator = require("./middlewares/inputvalidator")
let flash = require('connect-flash');
let session = require('express-session');

require("dotenv").config()

const API_KEY = process.env.SENDGRID_API_KEY
sgMail.setApiKey(API_KEY)


const PORT = 9000
const app = express()
const reciever_email = []

const verdict = []

app.use(express.static(__dirname + "/Public"));  //use this to use css files insie templates 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge : 60000 },
  resave: false,
  saveUninitialized: false

}));
app.use(flash());

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("index")
})

app.post("/question", (req, res) => {
  const reciever = req.body.reciever_email
  const validateEmail= (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(reciever) /* validate email */
  if(!validateEmail) return res.render("error",{errorMessage: "email validation failed!"})

  reciever_email.push(reciever)
  req.flash("message", "");
  res.render("questions", {message: req.flash('message')});
})

app.post("/result", inputValidator, async (req, res) => {
  let p = (parseFloat(req.body.avalue) + parseFloat(req.body.bvalue) + parseFloat(req.body.cvalue) + parseFloat(req.body.dvalue)) / 2
  let e = (parseFloat(req.body.evalue) + parseFloat(req.body.fvalue) + parseFloat(req.body.gvalue) + parseFloat(req.body.hvalue)) / 2
  let r = (parseFloat(req.body.ivalue) + parseFloat(req.body.jvalue) + parseFloat(req.body.kvalue) + parseFloat(req.body.lvalue)) / 2
  let m = (parseFloat(req.body.mvalue) + parseFloat(req.body.nvalue) + parseFloat(req.body.ovalue) + parseFloat(req.body.pvalue)) / 2
  let a = (parseFloat(req.body.qvalue) + parseFloat(req.body.rvalue) + parseFloat(req.body.svalue) + parseFloat(req.body.tvalue)) / 2


  if (p < e && p < r && p < m && p < a) {
    verdict.push("I've noticed that you've been experiencing some fluctuations in your positive emotions lately. It's completely normal to have ups and downs, but it's essential to take note of how you're feeling overall. Let's work together to identify activities and practices that bring you joy and help you maintain a positive outlook on life. Remember, small steps can lead to significant changes in your overall well-being.")
  }
  else if (r < p && r < e && r < m && r < a) {
    verdict.push("I hope that you have healthy and positive relationships with others. However, nurturing these connections further can be very beneficial for your overall well-being. Let's discuss ways to deepen these relationships, communicate effectively, and build a support system that you can rely on during challenging times. Strong social ties contribute significantly to happiness and resilience.")
  }
  else if (e < r && e < r && e < m && e < a) {
    verdict.push("I've observed that you haven't been as engaged and enthusiastic in your daily activities recently. It's crucial to find a sense of flow and fulfillment in what you do. Let's explore your interests and passions, and see how we can incorporate them into your routine. Engaging in activities that resonate with you can boost your energy and motivation, leading to a more satisfying and productive life.")
  }
  else if (m < r && m < p && m < e && m < a) {
    verdict.push("It seems like you've been contemplating the bigger picture and searching for a sense of purpose in your life. Finding meaning is a journey that requires self-reflection and exploration of your values and aspirations. Let's work together to uncover your passions and align your actions with what truly matters to you. Discovering your sense of purpose will bring more fulfillment and a greater sense of direction.")
  }
  else if (a < r && a < p && a < m && a < e) {
    verdict.push("I want you to know that i beleive you've achieved some remarkable things, and your hard work is commendable. However, I also sense that you might be setting high expectations for yourself. It's essential to recognize and celebrate your accomplishments, no matter how small they might seem. We'll work on setting realistic and achievable goals, which will give you a sense of progress and success, boosting your self-confidence and well-being.")
  }

  if (isNaN(p) || isNaN(e) || isNaN(r) || isNaN(m) || isNaN(a)) {
  
    res.render("error",{ errorMessage: "We're just a few steps away! Please complete all questions to unveil your PERMA Score"})
  }
  else {

    const message = {
      to: reciever_email.pop(),
      from: process.env.FROM,
      subject: "Euphoria Check",
      html: `<html>
      <head>
      <style>
      @import url('https://fonts.googleapis.com/ css2?family=Poppins:wght@300;400&display=swap');
      body {
          font-family: 'Poppins', sans-serif;
          background-color: #f4f4f4;
          color: #333333;
          margin: 0;
          padding: 0;
      }
    
      .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          margin-top: 30px;
          text-align: center;
          border-top: 6px solid #007bff; /* Adding a border-top accent */
          box-shadow:0px 0px 13px;
      }
    
      h1 {
          color: #007bff;
          text-align: center;
          margin-bottom: 20px;
      }
    
      p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 15px;
      }
    
      .scores {
          font-size: 18px;
          margin-bottom: 10px;
          color:black;
      }
    
      .verdict {
          font-size: 24px; /* Increased font size for the verdict */
          font-weight: bold;
          color: 007bff;
          margin-bottom: 20px;
      }
    
      .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 14px;
          color: #777777;
      }
    
      .footer a {
          color: #007bff;
          text-decoration: none;
      }
    
      /* Added some new styles */
      .accent-bg {
          background-color: #007bff;
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 4px;
      }
    
      .cta-button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 4px;
          
      }
    
      .cta-button:hover {
          background-color: #0056b3;
          color:white;
      }
    </style>
    </head>
    <body>
    <div class="container">
      <h1>Euphoria Check</h1>
      <p>Here are your PERMA scores:</p>
      <p class="scores">Positive Emotions: ${p}</p>
      <p class="scores">Engagement: ${e}</p>
      <p class="scores">Relationships: ${r}</p>
      <p class="scores">Meaning: ${m}</p>
      <p class="scores">Accomplishment: ${a}</p>
      <p class="verdict">${verdict.slice(-1)}</p>
      <p class="accent-bg">Aryan Inguz</p> <!-- Accentuated name -->
      <a href="https://euphoria-check-perma-meter-express.vercel.app/" class="cta-button" style="color:white;">Visit our website</a> <!-- Enhanced call-to-action button -->
    </div>
    <div class="footer">
      <p>This email was sent via Euphoria Check. &copy; 2023</p>
      <p>For more information, <a href="https://euphoria-check-perma-meter-express.vercel.app/">visit our website</a>.</p>
    </div>
      </body>
      </html>
      `,
    }
    await sgMail
      .send(message)
      .then((response) => console.log("Email sent!"))
      .catch((error) => console.log(error.message))

    res.render("result", { pos: p, eng: e, mea: m, rel: r, acc: a })
  }


})

app.post("/tips",function(req,res){
  let p = (parseFloat(req.body.avalue) + parseFloat(req.body.bvalue) + parseFloat(req.body.cvalue) + parseFloat(req.body.dvalue)) / 2
  let e = (parseFloat(req.body.evalue) + parseFloat(req.body.fvalue) + parseFloat(req.body.gvalue) + parseFloat(req.body.hvalue)) / 2
  let r = (parseFloat(req.body.ivalue) + parseFloat(req.body.jvalue) + parseFloat(req.body.kvalue) + parseFloat(req.body.lvalue)) / 2
  let m = (parseFloat(req.body.mvalue) + parseFloat(req.body.nvalue) + parseFloat(req.body.ovalue) + parseFloat(req.body.pvalue)) / 2
  let a = (parseFloat(req.body.qvalue) + parseFloat(req.body.rvalue) + parseFloat(req.body.svalue) + parseFloat(req.body.tvalue)) / 2


  if (p < e && p < r && p < m && p < a) {
    res.render("positiveemotions")
  }
  else if (r < p && r < e && r < m && r < a) {
    res.render("relationships")
  }
  else if (e < r && e < r && e < m && e < a) {
    res.render("engagement")
  }
  else if (m < r && m < p && m < e && m < a) {
    res.render("meaning")
  }
  else if (a < r && a < p && a < m && a < e) {
    res.render("accomplishments")
  }
  else{
    res.render("error",{ errorMessage: "We're just a few steps away! Please complete all questions to unveil your PERMA Score."})
  }
})

app.listen(process.env.PORT || 8000, function () {
  console.log("Server Started Sucessfully")
})
