var url_base="http://wwwp.cs.unc.edu/Courses/comp426-f15/users/sclewis/Codiad/workspace/cs426/Final%20Project/HLFP.php";
$(document).ready(function(){

	 $.ajax({url:url_base+"/stats/10longestAssignments",
			type:"GET",
			dataType:"json",
			success:function(data,status,jqXHR){
				var content1 = $("#stats_1_content");
				content1.append("<h1>10 Longest Assignments</h1>");
				content1.append("<p><ol id='ol1'></ol></p>");
				for (var i=0; i<data.length; i++) {
			    	load_longest_assignment_display(data[i]);
		    	}  
			},
			error:function(jqXHR,textStatus,errorThrown){
				alert('error');
			}
		});
		
		var load_longest_assignment_display=function(assign){
			var info=JSON.parse(assign);
			var className=info.cname;
			var profName=info.pname;
			var semester=info.semester;
			var anum=info.anum;
			var hours=info.hours;
			var mins=info.minutes;
			
			var list = $("#ol1");
			list.append("<li>"+className+" - "+profName+" - A"+anum+" - "+hours+"h "+mins+"m</li>");
		};
    
    
   		$.ajax({url:url_base+"/stats/10fastestAssignments",
			type:"GET",
			dataType:"json",
			success:function(data,status,jqXHR){
				var content2 = $("#stats_2_content");
				content2.append("<h1>10 Shortest Assignments</h1>");
				content2.append("<p><ol id='ol2'></ol></p>");
				for (var i=0; i<data.length; i++) {
			    	fastest_assignment(data[i]);
		    	}  
			},
			error:function(jqXHR,textStatus,errorThrown){
				alert('error');
			}
		});
		
		var fastest_assignment=function(assign){
			var info=JSON.parse(assign);
			var className=info.cname;
			var profName=info.pname;
			var semester=info.semester;
			var anum=info.anum;
			var hours=info.hours;
			var mins=info.minutes;
			
			var list = $("#ol2");
			list.append("<li>"+className+" - "+profName+" - A"+anum+" - "+hours+"h "+mins+"m</li>");
		};
		
		
		$.ajax({url:url_base+"/stats/10longestSections",
			type:"GET",
			dataType:"json",
			success:function(data,status,jqXHR){
				var content3 = $("#stats_3_content");
				content3.append("<h1>10 Most Time<br>Consuming Classes</h1>");
				content3.append("<p><ol id='ol3'></ol></p>");
				for (var i=0; i<data.length; i++) {
			    	most_time_consuming_class(data[i]);
		    	}  
			},
			error:function(jqXHR,textStatus,errorThrown){
				alert('error');
			}
		});
		
		var most_time_consuming_class=function(assign){
			var info=JSON.parse(assign);
			var className=info.cname;
			var profName=info.pname;
			var semester=info.semester;
			var hours=info.hours;
			var mins=info.minutes;
			
			var list = $("#ol3");
			list.append("<li>"+className+" - "+profName+" - "+semester+" - "+hours+"h "+mins+"m</li>");
		};
		
		$.ajax({url:url_base+"/stats/10shortestSections",
			type:"GET",
			dataType:"json",
			success:function(data,status,jqXHR){
				var content4 = $("#stats_4_content");
				content4.append("<h1>10 Least Time<br>Consuming Classes</h1>");
				content4.append("<p><ol id='ol4'></ol></p>");
				for (var i=0; i<data.length; i++) {
			    	least_time_consuming_class(data[i]);
		    	}  
			},
			error:function(jqXHR,textStatus,errorThrown){
				alert('error');
			}
		});
		
		var least_time_consuming_class=function(assign){
			var info=JSON.parse(assign);
			var className=info.cname;
			var profName=info.pname;
			var semester=info.semester;
			var hours=info.hours;
			var mins=info.minutes;
			
			var list = $("#ol4");
			list.append("<li>"+className+" - "+profName+" - "+semester+" - "+hours+"h "+mins+"m</li>");
		};
});