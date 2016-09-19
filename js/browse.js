//--------------------------DONE-----------------
var url_base="http://wwwp.cs.unc.edu/Courses/comp426-f15/users/sclewis/Codiad/workspace/cs426/Final%20Project/HLFP.php";

$(document).ready(function(){
	var did;
	//LOAD DEPARTMENTS	
	$.ajax({url:url_base+"/department",
		type:"GET",
		dataType:"json",
		success:function(departments,status,jqXHR){
			//alert("ajax request successful");
		    for (var i=0; i<departments.length; i++) {
		    	//display individual department
		    	load_dept(departments[i]);
		    	//-------------------classes-
		    }  
		}	
	});
	

	$('#browse_wrapper').on("click",'div.browse_dept',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();

		//alert("clicked on dept");
		did=e.target.id;
	    $('#browse_wrapper').empty();
		$.ajax({url:url_base+"/class/department/"+did,//---!!--
			type:"GET",
			dataType:"json",
			success:function(classes,status,jqXHR){
				//alert("ajax");
				for (var i=0; i<classes.length; i++) {
		    	//display individual classes
		    	load_class(classes[i]);
		    	//alert(classes[i]);
		    }  
			}
		});
	});
	$('#browse_wrapper').on("click",'div.browse_class',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();

		console.log("clicked on class");
		var cid=e.target.id;
		$('#browse_wrapper').empty();
		//alert('clicked on class');
	    $.ajax({url:url_base+"/section/class/"+cid,
			type:"GET",
			dataType:"json",
			success:function(sections,status,jqXHR){
				//alert("ajax");
				//$('#browse_wrapper').empty();
				for (var i=0; i<sections.length; i++) {
		    	//display individual sections
		    	load_section(sections[i]);
		    	//console.log(sections[i]);
		    }  
			}
		});
	})
	$('#browse_wrapper').on("click",'div.browse_sect',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		console.log("clicked on section");
		var sid=e.target.id;
		$('#browse_wrapper').empty();
		//alert('clicked on class');
	    $.ajax({url:url_base+"/assignment/section/"+sid,
			type:"GET",
			dataType:"json",
			success:function(assignments,status,jqXHR){
				//alert("ajax");
				for (var i=0; i<assignments.length; i++) {
		    	//display individual sections
		    	load_assign(assignments[i]);
		    	//console.log(sections[i]);
		    }  
			}
		});
	});
	$('#browse_wrapper').on("click",'div.browse_assign',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		var aid=e.target.id;
		var redirect="http://wwwp.cs.unc.edu/Courses/comp426-f15/users/sclewis/Codiad/workspace/cs426/Final%20Project/assignment.html?id="+aid
		//console.log(redirect);
		window.location.assign(redirect);
	});

});
var load_assign=function(assign){
	    //alert("loading sections");
	    var assignments=JSON.parse(assign);
		var semester, sid, number, cname,pname,aid;
		semester=assignments.semester;
		number=assignments.number;
		cname=assignments.cname;
		sid=assignments.sid;
		pname=assignments.pname;
		aid=assignments.aid;

        //alert(semester);
		var a = new Assignments(semester,number,cname,sid,pname,aid);
		//alert("load class"+name);
		//$('div#'+did).append(c.makeDiv())
		
		$('#browse_wrapper').append(a.makeDiv());

};
var load_section=function(sections){
	    //alert("loading sections");
	    var parsesect=JSON.parse(sections);
		var semester, sid, cid, pid,pname;
		semester=parsesect.semester;
		pid=parsesect.pid;
		cid=parsesect.cid;
		sid=parsesect.sid;
		pname=parsesect.pname;
        //alert(semester);
		var s = new Section(semester,pid,cid,sid,pname);
		//alert("load class"+name);
		//$('div#'+did).append(c.makeDiv())
		
		$('#browse_wrapper').append(s.makeDiv());

};
var load_class=function(classes){
	    var parseclass=JSON.parse(classes);
		var name, did, cid;
		name=parseclass.name;
		did=parseclass.did;
		cid=parseclass.cid;
		var c = new Classes(name,did,cid);
		//alert("load class"+name);
		//$('div#'+did).append(c.makeDiv())
		$('#browse_wrapper').append(c.makeDiv());

};
var load_dept=function(dept){
    var department=JSON.parse(dept);
 	var name, did,abrev;
 	
    name=department.name;
    did=department.did;
    abrev=department.abbreviation;
   
    var d = new Department(name,did,abrev);
    console.log(name);
	$('#browse_wrapper').append(d.makeDiv());
	//$('<div/>',{"id":'wrapper'}).append("string").appendTo('#browse_wrapper');
	
};
var Assignments=function(semester,number,cname,sid,pname,aid){
	this.semester=semester;
	this.number=number;
	this.cname=cname;
	this.sid=sid;
	this.pname=pname;
	this.aid=aid;
}
Assignments.prototype.makeDiv=function(){
	var aDiv=$("<div></div>");
    aDiv.addClass('browse_assign');
    aDiv.attr('id', this.aid);
    aDiv.html("Assignment "+this.number);
    aDiv.data('browse_assign', this);
    return aDiv;
}
var Section=function(semester,pid,cid,sid,pname){
	this.semester=semester;
	this.pid=pid;
	this.cid=cid;
	this.sid=sid;
	this.pname=pname;
}
Section.prototype.makeDiv=function(){
	var sDiv=$("<div></div>");
    sDiv.addClass('browse_sect');
    sDiv.attr('id', this.sid);
    sDiv.html(this.pname+" - "+this.semester);
    sDiv.data('browse_sect', this);
    return sDiv;
}
var Classes =function(name,did,cid){
	this.name=name;
	this.did=did;
	this.cid=cid;
}
Classes.prototype.makeDiv=function(){
	var cDiv=$("<div></div>");
    cDiv.addClass('browse_class');
    cDiv.attr('id', this.cid);
    cDiv.html(this.name);
    cDiv.data('browse_class', this);
    return cDiv;
}
var Department=function(name,did,abrev){
	this.name=name;
	this.did=did;
	this.abrev=abrev;
};
Department.prototype.makeDiv=function(){
	var dDiv=$("<div></div>");
    dDiv.addClass('browse_dept');
    dDiv.attr('id', this.did);
    dDiv.html(this.abrev +" - "+ this.name);
    dDiv.data('browse_dept', this);
    return dDiv;
};


/*
<div id = 'browse_dept'>
           				<div id = 'browse_class'>
           					<div id = 'browse_sect'>
           						<div id = 'browse_assignment'></div>
           					</div>
           						
           				</div>
*/