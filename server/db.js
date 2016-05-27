'use-strict'

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE Employees (employeeId INT, firstName TEXT, lastName TEXT, company TEXT, date TEXT)");

  var stmt = db.prepare("INSERT INTO Employees VALUES (?)");
  for (var i = 0; i < 10; i++) {
      const date = new Date();
      const getDate = date.toLocateTimeString();
  }
  stmt.finalize();

  db.each("SELECT rowid AS employeeId, info FROM Employees", function(err, row) {
      console.log(row.employeeId + ": " + row.info);
  });
});

db.close();
