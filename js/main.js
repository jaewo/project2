window.addEventListener("load", function(){
	/* navigation */
	var nav=document.querySelectorAll(".nav > ul >li");
	var navlast=document.querySelector(".nav li:last-child li:last-child");
		console.log(navlast);
	for(i=0; i<nav.length; i++){
		nav[i].addEventListener("mouseenter",function(){
				this.parentNode.classList.add("over");
		});
		nav[i].addEventListener("mouseleave",function(){
				this.parentNode.classList.remove("over");
		});
		nav[i].addEventListener("focusin",function(){
			this.classList.add("over");
		});
		nav[i].addEventListener("focusout",function(){
			this.classList.remove("over");
		});
		nav[0].addEventListener("focusin",function(){
			this.parentNode.classList.add("over");
		});
	}
		navlast.addEventListener("focusout",function(){
			this.parentNode.parentNode.classList.remove("over");
			this.parentNode.parentNode.parentNode.classList.remove("over");
		});
		
	/* keyvisual */
	var Item_max=4; // Items Count
	var Item_seen=1; // Items View Count
	var moving=0.7 // Moving Speed 
	
	var btnL=document.querySelector(".left");  // 왼쪽 버튼
	var btnR=document.querySelector(".right"); // 오른쪽 버튼
		
	//Content Creation
	var Slide_frame=document.querySelector(".hero .gallery"); //transition: none;
	var Items=""; // Items Variable 
		for(var i=0; i<Item_max; i++){
			Items+="<li class='item"+i+"'><img src='images/key"+(i+1)+".jpg'></li>"+"\n";
		}
		Slide_frame.innerHTML=Items;// Items Creation
	//Items Style	
	var Item_seen2=100/Item_seen //Items View Count    100/value
	var Frame_W=Item_seen2*Item_max; //Slide_frame Width
	var itemW=100/Item_max; //Items Width
		Slide_frame.style.width=Frame_W+"%";
		for(i=0; i<Item_max; i++){
			Slide_frame.children[i].style.width=itemW+"%";
		}	
	//controller
	var Slide_Animation=false;//Slide Animation Variable	
	//Left Button;
	btnL.addEventListener("click",function(e){
		e.preventDefault();
		if(Slide_Animation==true){
			return false;
		}
		Slide_Animation=true;
		var pos=-Frame_W/Item_max;
		ResetL();
		var slideL=setInterval(moveL);
		function moveL(){
			if(pos >= 0){
				clearInterval(slideL);
				Slide_Animation=false;
			}
			else{
			pos=pos+moving;
			Slide_frame.style.left=pos+"%";
			}
		}
		function ResetL(){
			Slide_frame.style.left=pos+"%";
			Slide_frame.prepend(Slide_frame.children[Item_max-1]);
		}	
	});	
	
	//Right Button
	btnR.addEventListener("click",function(e){
		e.preventDefault();
		if(Slide_Animation==true){
			return false;
		}
		Slide_Animation=true;
		var pos=0;
		var slideR=setInterval(moveR);
		function moveR(){
			if(pos >= Frame_W/Item_max){
				clearInterval(slideR);
				resetR();
			}
			else{
			pos=pos+moving;
			Slide_frame.style.left=-pos+"%";
			}
		}
		function resetR(){
			Slide_frame.style.left=0;
			Slide_frame.append(Slide_frame.children[0]);
			Slide_Animation=false
		}	
	});	
	//Auto Slide
	var Autoslide=setInterval(function(){
		if(Slide_Animation==true){
			return false;
		}
		Slide_Animation=true;
		var pos=0;
		var slideR=setInterval(moveR);
		function moveR(){
			if(pos >= Frame_W/Item_max){
				clearInterval(slideR);
				resetR();
			}
			else{
			pos=pos+moving;
			Slide_frame.style.left=-pos+"%";
			}
		}
		function resetR(){
			Slide_frame.style.left=0;
			Slide_frame.append(Slide_frame.children[0]);
			Slide_Animation=false
		}			
	},3000);
});