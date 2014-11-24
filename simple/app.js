app.use(islogin(['/test/xx']));

app.use(islogin({pattern:[/\/test\/*?/,],redirect:'/'}))

//app.use('/', routes);
//app.use('/users', users);