var express = require('express');
var router = express.Router();
var path = require('path');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');
require('../passport')(passport);
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname,'../public/html/','ssr解析.html'))
});

router.get('/register',function(req,res,next){
 res.sendFile(path.join(__dirname,'../public/html/','register.html'))
})


router.post('/checkusername',(req,res)=>{
	if (req.body.name) {
        User.findOne({name:req.body.name},(err,data)=>{
           console.log(data);   
           if (data) {
           	  res.json({suceess:false,message:'该用户名已注册'});
           }else{
           	 res.json({suceess:true,message:'该用户名未注册'});
           }
         
        });
	}else{
		  res.json({success: false, message: '请传入name'});
	}
})

// 注册账户
router.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, message: '请输入您的账号密码.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // 保存用户账号
    newUser.save((err) => {
      if (err) {
        return res.json({success: false, message: '注册失败!'});
      }
      res.json({success: true, message: '成功创建新用户!'});
    });
  }
});

// 检查用户名与密码并生成一个accesstoken如果验证通过
router.post('/user/accesstoken', (req, res) => {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.json({success: false, message:'认证失败,用户不存在!'});
    } else if(user) {
      // 检查密码是否正确
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign({name: user.name}, config.secret,{
            expiresIn: 10080
          });
          user.token = token;
          user.save(function(err){
            if (err) {
              res.send(err);
            }
          });
          res.json({
            success: true,
            message: '验证成功!',
            token: 'Bearer ' + token,
            name: user.name
          });
        } else {
          res.send({success: false, message: '认证失败,密码错误!'});
        }
      });
    }
  });
});

// passport-http-bearer token 中间件验证
// 通过 header 发送 Authorization -> Bearer  + token
// 或者通过 ?access_token = token
router.get('/user/user_info',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json({username: req.user.name});
});


module.exports = router;