$(document).ready(function() {
	//Функция добавления хидера
	function addHeader(key, key1, id) {
		console.log(typeof(id))
		var id1 = id.replace(/\s/g,"_")
//		var key11 = key1.replace(/\s/g,"_")
		$("." + key).append('<header id="' + id1 + '">' + key1 + '</header>');
		$("." + key +">header").wrap('<div class="row"></div>');
		$("." + key + ">div.row>header").addClass("col-xs-5 col-sm-2 col-sm-offset-2 col-md-2 col-md-offset-2 col-lg-2 col-lg-offset-2 text-right");
		console.log ("add header " + key1)
	}
	//Функция добавления параграфа
	function addP(key, key1, value1) {
		var key1 = key1.replace(/\s/g,"_")
		$("#" + key1).after("<p>" + value1 + "</p>");
		$("." + key +">div.row>p").addClass("col-xs-7");
		console.log ("add <p>")
	}
	//Функция добавления пораграфа с ссылкой
	function addPLink(key, key1, key2 , value2) {
		var key1 = key1.replace(/\s/g,"_")
		$("#" + key1).after('<p><a href="' + value2 + '">' + key2 + '</a></p>');
		$("." + key +">div.row>p").addClass("col-xs-7");
		console.log ("add <p><a>")
	}
	//Получаем 
  $.getJSON("js/data.json", function(data) {
		
		$.each(data, function(key, value) {
			console.log("KEY: " + key + " " + "VALUE: " + value)
			if (key === "mainContent") {
				console.log(key + " is Main section ")
				$.each(value, function(key1, value1) {
					console.log(key1, value1)
					addHeader(key, key1, key1)
					if (typeof(value1) === "object") {
						console.log(value + " obj" )
						$.each(value1, function(key2, value2) {
							console.log(key2, value2)
							addPLink(key, key1, key2, value2);
						})
					}
					else {
						addP(key, key1, value1);
					}
				})
			}
			else if (key === "coverText") {
				$("." + key).append("<p>" + value + "</p>");
				$("." + key + ">p").addClass("col-xs-12 col-sm-5 col-sm-offset-4 col-md-5 col-md-offset-4 col-lg-5 col-lg-offset-4")
			}
			else if (key === "skillsContent") {
				$.each(value, function(key1, value1) {
					console.log(key1, value1)
					addHeader(key, key1, key1)
					if (typeof(value1) === "object") {
						console.log(value + " obj" )
						$.each(value1, function(key2, value2) {
							console.log(key2, value2)
							addPLink(key, key1, key2, value2);
						})
					}
					else {
						addP(key, key1, value1);
					}
				})
			}
			else if (key === "worksContent") {
				$.each(value, function(key1, value1) {
					console.log(key1, value1)
					$("." + key).append('<div id ="' + key1 +'" class="row"></div>')
					$.each(value1, function(key2, value2) {
						console.log(key2, value2)
						addHeader(key + ">#" + key1, key2, key1+"-"+key2)
						addP(key + ">#" + key1, key1+"-"+key2, value2)
					})
				})
			}
			else if (key === "educationContent") {
				$.each(value, function(key1, value1) {
					console.log(key1, value1)
					addHeader(key, key1, key1)
					$.each(value1, function(key2, value2) {
						console.log(key2, value2)
						$("." + key + ">div.row").append('<p id="' + key2 + '"><a href="#">' + key2 + '</a></p>')
						$("." + key + ">div.row>p").addClass("col-xs-7")
						$("." + key + " p" + ":nth-child(2)").nextAll("p").addClass("col-xs-offset-5 col-sm-offset-4")
						$.each(value2, function(key3, value3) {
							if (key3 === "link") {
								console.log(value3)
								$("#" + key2 + ">a").attr('href', value3)
							}
							else {
								$("#" + key2 + ">a").after(" - " + value3)
							}
						})
					})
				})
			}
		})
	});	
});