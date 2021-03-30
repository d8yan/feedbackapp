
//global database object
var db;

//general purpose error handler
function errorHandler(error){
    console.error("SQL error: " + error.message);
}

var DB ={
    dyCreateDatabase: function (){
        var shortName = "Feedback App";
        var version = "1.0";
        var displayName = "DB for DYFeedbackA3 App";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }

        db = window.openDatabase(shortName, version, displayName,dbSize,dbCreateSuccess);
    },
    dyCreateTables:function (){

        function txFunction(tx) {

            var sql= ["DROP TABLE IF EXISTS type;",
                      "CREATE TABLE IF NOT EXISTS type( "
                     + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                     + "name VARCHAR(20) NOT NULL);",
                      "INSERT INTO type (name) VALUES ('Canadian');",
                      "INSERT INTO type (name) VALUES ('Asian');",
                      "INSERT INTO type (name) VALUES ('Others');",
                      "CREATE TABLE IF NOT EXISTS review( "
                     + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                     + "businessName VARCHAR(30) NOT NULL,"
                     + "typeId INTEGER NOT NULL,"
                     + "reviewerEmail VARCHAR(30),"
                     + "reviewerComments TEXT,"
                     + "reviewDate DATE,"
                     + "hasRating VARCHAR(1),"
                     + "rating1 INTEGER,"
                     + "rating2 INTEGER,"
                     + "rating3 INTEGER,"
                     + "FOREIGN KEY(typeId) REFERENCES type(id));"];

            var options = [];

            var successCallback = [ function (){console.info("Success: Dropping type table successfully");},
                                    function (){console.info("Success: Creating type table successfully");},
                                    function (){console.info("Success: Inserting first row successfully");},
                                    function (){console.info("Success: Inserting second row successfully");},
                                    function (){console.info("Success: Inserting third row successfully");},
                                    function (){console.info("Success: Creating review table successfully");}]

            for(var i = 0; i < sql.length; i++)
            {
                tx.executeSql(sql[i],options, successCallback[i](),errorHandler);
            }

        }

        function successTransaction() {
            console.info("Success: Create table transaction is successful");
        }
        //step1
        db.transaction(txFunction, errorHandler,successTransaction);
    },
    dyDropTables:function (){
        function txFunction(tx) {

            var sql = ["DROP TABLE IF EXISTS type;","DROP TABLE IF EXISTS review;"];
            var options = [];

            function successCallback() {
                console.info("Success: Deleting tables successfully");
            }

            //step2
            for(var i = 0; i < sql.length; i++)
            {
                tx.executeSql(sql[i],options, successCallback,errorHandler);
            }
        }

        function successTransaction() {
            console.info("Success: Deleting table transaction is successful");
        }
        //step1
        db.transaction(txFunction, errorHandler,successTransaction);
    }
};
