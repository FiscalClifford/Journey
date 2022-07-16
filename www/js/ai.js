
function sendRequestJ()
{
	//let inputQuestion = document.getElementById('query').value;
	inputQuestion = "what is your favorite color?";
    post = "query="+inputQuestion;
 	
	//post = {query: "Write a tagline for an ice cream shop."}
	const url = "http://localhost/openai/server.php";
	let xhr = new XMLHttpRequest();
	var data = undefined;
	xhr.open('POST', url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(post);
	 
	xhr.onload = function () {
		console.log(xhr);
        if(xhr.status === 200) {
			//document.getElementById('response').innerHTML = xhr.responseText;
			console.log(xhr.responseText);
            data = JSON.parse(xhr.responseText);
            console.log(data);
		}    
	}
    
}

var result = sendRequestJ()
console.log(result);





// console.log("testing post");
// var result = sendRequestJ();





