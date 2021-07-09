let express = require('express');
let router = express.Router();
let uid2 = require("uid2");
let bcrypt = require("bcrypt");
let userModel = require('../models/users')
///////////////////////////////////////////////////////////////sign-up
router.post('/sign-up', async function(req,res,next){
  let error = []
  let result = false
  let saveuser = null
  let hash = bcrypt.hashSync(req.body.password, 10);
  const signup = await userModel.findOne({
    email: req.body.email
  })
  if(signup != null){
    error.push('utilisateur déjà présent')
  }
  if(req.body.username == ''
  || req.body.email == ''
  || req.body.password == ''
  ){
    error.push('champs vides')
  }
  if(error.length == 0){
    let signupus = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32)
    })
    saveuser = await signupus.save()
    if(saveuser){
      result = true
      token = saveuser.token
    }
    }
res.json({result, saveuser, error, token})
})
//////////////////////////////////////////////////////////////////////////sign-in
router.post('/sign-in', async function(req,res,next){
  let result = false
  let userin = null
  let error = []
  if(req.body.email == ''
  || req.body.password == ''
  ){
    error.push('champs vides')
  }

  if(error.length === 0){
    const userin = await userModel.findOne({email: req.body.email})
    if(userin){
      if(bcrypt.compareSync(req.body.password, userin.password)) {
        result = true
        token = userin.token
      }else{
        result = false
      error.push('email ou mot de passe incorrect')
      }
    } 
  }
  res.json({result, userin, error, token})
})

module.exports = router;
