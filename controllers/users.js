const User= require("../models/user");

module.exports.renderSignupForm= (req, res)=>
{
    res.render("users/signup.ejs");
}


module.exports.signup=async (req, res)=>
{
    try{
        let {username, email, password}= req.body;
        let newUser= new User({username, email});
        let registeredUser= await User.register(newUser, password);
        req.login(registeredUser, (err)=>
        {
            if(err){
                return next(err);
            }else{
                console.log(registeredUser);
                req.flash("success", "User Created");
                res.redirect("/listings");
            }
        })

    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}

module.exports.renderLoginForm= (req, res)=>
{
    res.render("users/login.ejs");
}

module.exports.login= async (req, res)=>
{
    req.flash("success","You are successfully login ");
    let redirectUrl= res.locals.redirectUrl || "/listings";
    // if(res.locals.redirectUrl){
    //     res.redirect(res.locals.redirectUrl);
    // }
    // else{
    //     res.redirect("/listings");
    // }
    res.redirect(redirectUrl);

}

module.exports.logout=(req, res)=>
{
    req.logout((err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success", "You are Successfully Logged Out");
            res.redirect("/listings");
        }
    })
}