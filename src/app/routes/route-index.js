module.exports = (app, passport) => {

  app.get('/', (req, res) => {
      res.render('index');
  });

  app.get('/login', (req, res) => {
      res.render('login',{
        message: req.flash('loginMessage')
      });
  });

  app.post('/login',passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/login  ',
    failureFlash: true
  }));


  app.get('/signUp', (req, res) => {
      res.render('signUp',{
        message: req.flash('signUpMessage')
      })
  });

  app.post('/signUp',passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signUp',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, (req,res)=>{
    res.render('profile',{
      user: req.user
    });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/Expenses', (req, res) => {
    res.render('Expenses',{
      user: req.user
    });
  });

  app.get('/Income', (req, res) => {
    res.render('Income',{
      user: req.user
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}
