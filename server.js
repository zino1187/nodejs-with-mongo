var http=require("http");
var express=require("express");
var bodyParser=require("body-parser");
var mongo=require("mongodb").MongoClient;
var app=express();
var server=http.createServer(app);

app.use(express.static(__dirname+"/views/"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//목록보기 요청
app.get("/member/list", function(request, response){
	mongo.connect("mongodb://localhost:27017", function(error, con){
		if(error){
			console.log("접속실패");
		}else{
			console.log("접속 성공");
			var db=con.db("testdb");
			db.collection("members", function(err, collection){
				collection.find().toArray(function(e, result){
					if(e){
						console.log(e);
					}else{
						console.log(result);
						response.writeHead(200,{"Content-Type":"text/json"});
						response.end(JSON.stringify(result));
					}
					con.close();
				});
			});
		}
	});
});


//insert 요청 처리 
app.use("/member/regist",function(request, response){
	mongo.connect("mongodb://localhost:27017", function(error, con){
		if(error){
			console.log(error);
		}else{
			var db=con.db("testdb");
			var obj={name:"쫄바지", price:3500};
			db.collection("members").insertOne(obj, function(err, result){
				if(err){
					console.log(err);
				}else{
					console.log("1 document 입력성공 !!");
				}
				con.close();
			});

		}
	});	
});


//update 요청 처리 


//delete 요청 처리 


server.listen(9999, function(){
	console.log("웹서버가 9999포트에서 실행 중...");
});