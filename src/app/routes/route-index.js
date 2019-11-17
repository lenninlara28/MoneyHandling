module.exports = (app, passport) => {

  app.get('/', (req, res) => {
      res.render('index');
  });

  app.get('/login', (req, res) => {
      res.render('login')
  });

  app.get('/signUp', (req, res) => {
      res.render('signUp')
  });
};
