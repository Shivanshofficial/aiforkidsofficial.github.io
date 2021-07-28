function submitAnswers() {
	var results = document.getElementById("results");

	var total = 5;
	var score = 0;
	
	// get user input
	
	var q1 = document.forms["quizForm"]["q1"].value;
	var q2 = document.forms["quizForm"]["q2"].value;
	var q3 = document.forms["quizForm"]["q3"].value;
	var q4 = document.forms["quizForm"]["q4"].value;
	var q5 = document.forms["quizForm"]["q5"].value;

	// validation - did the submitter skip any Q's? 

	for (var i = 1; i <= total; i++) {
		if(eval("q" + i) == null || eval("q" + i) == "") {
			results.innerHTML ='<h3>You missed question  <span>'+i+'</span> </h3>';
			return false;
		}
	}
	
	// set correct answers
	
	var answers = ['b', 'a', 'd', 'b', 'd'];	
	
	// check answers (note i - 1 to account for array starting with [0])
	
	for (var i = 1; i <= total; i++) {
		if (eval("q" + i) == answers[i - 1]) {
			score++;
		}
	}

	// display results
	

	results.innerHTML ='<h3>You Scored <span> '+score+' </span> out of <span>'+total+'</span> </h3>';

	// because we are not actually submitting this form
	return false;
}
