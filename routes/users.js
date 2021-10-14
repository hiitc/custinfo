const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('./dbconn');
//const models = require("../models");

db.connect();

// 메인 페이지
router.get('/', function(req, res, next) {
  res.send('환영합니다~');
});

// 로그인 GET
router.get('/login', function(req, res) {
  res.render("user/login");
});

// 로그인 POST
router.post("/login", async function(req,res,next){
  var body = req.body;

  var query = "select * from dbo.hpage_custlist('" + body.userName + "','" + body.hpNo + "') order by shortname, buildno, houseno";
  console.log(query);
  
  db.execute(query, function(result){
    console.log(result);

    if (result != null && result.recordset.length > 0){
      res.render('user/list', {title: '계약 리스트', result: result.recordset});
    } else {
      res.render("error");
    }
  });
});

  // 로그인 POST
router.post("/detail", async function(req,res,next){
  var body = req.body;

  var query = "select * from dbo.hpage_agree_info('" + body.custCode + "'," + body.seq + ")";
  console.log(query);
  
  db.execute(query, function(result){
    console.log(result);

    if (result != null && result.recordset.length > 0){
      //console.log(result);
      res.send(result.recordset);
    } else {
      res.render("error");
    }
  });
});

router.post("/detail_top", async function(req,res,next){
  var body = req.body;

  var query = "select * from dbo.hpage_contract_info('" + body.custCode + "'," + body.seq + ") order by shortname, buildno, houseno";
  console.log(query);

  
  db.execute(query, function(result){
    console.log(result);

    if (result != null && result.recordset.length > 0){
      //console.log(result);
      res.send(result.recordset);
    } else {
      res.render("error");
    }
  });
});
  //res.render("user/login");
  //
  // let result = await models.user.findOne({
  //   where: {
  //     email : body.userEmail
  //   }
  // });
  //
  // var dbPassword = result.dataValues.password;
  // var inputPassword = body.password;
  // var salt = result.dataValues.salt;
  // var hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
  //
  // if(dbPassword === hashPassword){
  //   console.log("비밀번호 일치");
  //   res.redirect("/user");
  // }
  // else{
  //   console.log("비밀번호 불일치");
  //   res.redirect("/user/login");
  // }

module.exports = router;
