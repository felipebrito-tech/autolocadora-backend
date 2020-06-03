const app = require('./config/custom-express')();
const port = app.get('port');

app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));