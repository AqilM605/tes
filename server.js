

require('dotenv').config('.env');
// set port, listen for requests
const PORT = process.env.PORT || process.env.PORT_BACKUP;
const app = require('./index');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
