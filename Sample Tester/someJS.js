var url_base="http://wwwp.cs.unc.edu/Courses/comp426-f15/users/sclewis/Codiad/workspace/cs426/Final%20Project/HLFP.php";

$(document).ready(function(){
	$(document).ready(function(){
	$(".main").append("you ran the program!<br>");
	$.ajax({ url:url_base+"/search/class/comp",
		type:"GET",
		dataType:"json",
		beforeSend:function(jqXHR, settings){
			$(".main").append("starting ajax call.<br>");
		},
		success:function(data,status, jqXHR){
			if(data!==null) {
				for(var i=0; i<data.length; i++) {
					var thing = JSON.parse(data[i]);
					$(".main").append("data="+thing.name+"<br>");
				}
			} else {
				$(".main").append("No search results");
			}
		},
		error:function(jqXHR, textStatus, errorThrown ){
			$(".main").append("ERROR!!!<br>");
			$(".main").append("textStatus="+textStatus+"<br>");
			$(".main").append("errorThrown="+errorThrown);
		},
		complete:function(){
			$(".main").append("<br>completed");
		}
	});
	
	$("form").submit(function(e){
		e.preventDefault();
		alert($(this).serialize());
		$.ajax({url: url_base + "/submit",
			type:"POST",
			data:$(this).serialize(),
			success:function(response, status, jqXHR){
				$(".main").append(response);
			},
			error:function(jqXHR, textStatus, errorThrown) {
				alert("textstatus: " + textStatus +" and error:  "+ errorThrown);
			}
		});
	});
});
});