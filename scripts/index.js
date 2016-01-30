window.onload=function(){
	var da=document.getElementById('screen');
	var left=document.getElementById('left');
	var right=document.getElementById('right');
	var fn3=function(){
		for(var i=0;i<7;i++){		
			for(var j=0;j<i+1;j++){
				var block=document.createElement('div');
				block.setAttribute('class','block');
				block.setAttribute('id',i+'_'+j);
				block.style.top=i*50+15+'px';
				block.style.left=(6-i)*65+j*130+50+'px';
				da.appendChild(block);
			}
		}
		for(var i=0;i<24;i++){
			var block=document.createElement('div');
			block.setAttribute('class','block');
			block.setAttribute('id',i+'_0'+i);
			block.style.top=0;
			block.style.left=0;
			left.appendChild(block); 
		}


	};
	fn3();
	var previous=null;
	da.onclick=function(e){
		if(e.target==this||e.target==up||e.target==down||e.target==right.lastElementChild)return;
		var id=e.target.getAttribute('id');
		var x=Number(id.split('_')[0]);
		var y=Number(id.split('_')[1]);
		if(e.target.parentElement==da){
			var nx=document.getElementById((x+1)+'_'+y);
			var ny=document.getElementById((x+1)+'_'+(y+1));
			if(nx||ny){
				return ;
			}
		}
		if(previous!==null){
			previous.style.border='none';
			var x2=previous.innerHTML;
		}
		var el=e.target;
		el.style.border='4px solid green';
		var x1=el.innerHTML;
		if(x1=='K'){
			el.parentElement.removeChild(el);
			previous=null;
			return;
		}
		switch(x1){
			case 'A':
				x1=1;
			break;
			case 'J':
				x1=11;
			break;
			case 'Q':
				x1=12;
			break;
			default:
				x1=Number(x1);
		}
		switch(x2){
			case 'A':
				x2=1;
			break;
			case 'J':
				x2=11;
			break;
			case 'Q':
				x2=12;
			break;
			default:
				x2=Number(x2);
		}
		if(x1+x2==13){
			el.parentElement.removeChild(el);
			previous.parentElement.removeChild(previous);
			previous=null;
			return ;

		}
		previous=el;	
	};

	var dict={1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'J',12:'Q',13:'K'};
	var kind=['rd','bk','fk','mh'];	
	var fn6=function(){
		var zidian={};
		var poker=[],hs,nu;
		while(poker.length!=52){
			hs=kind[Math.floor(Math.random()*4)];
			nu=dict[Math.floor(Math.random()*13+1)];
			var pai={huase:hs,number:nu};
			if(!zidian[hs+nu]){
				poker.push(pai);
				zidian[hs+nu]=true;
			}	
		}
		return poker;
	};
	var poker=fn6();
	var els=document.getElementsByClassName('block');
	for(var i=0;i<els.length;i++){
		els[i].innerHTML=poker[i].number;
		if(poker[i].huase=='rd'){
			els[i].style.backgroundImage='url(./images/hearts.jpg)';
		}
		if(poker[i].huase=='bk'){
			els[i].style.backgroundImage='url(./images/spade.jpg)';

		}
		if(poker[i].huase=='fk'){
			els[i].style.backgroundImage='url(./images/block.jpg)';
		}
		if(poker[i].huase=='mh'){
			els[i].style.backgroundImage='url(./images/plum.jpg)';
		}
	}

	var up=document.getElementById('up');
	var down=document.getElementById('down');
	up.onclick=function(){
		if(left.lastElementChild==undefined){return;}
		right.appendChild(left.removeChild(left.lastElementChild));
	};
	var jishu=0;
	down.onclick=function(){
		if(jishu==3||left.children.length!=0) return;
		while(right.children.length){
			left.appendChild(right.removeChild(right.lastElementChild));
		}
		jishu++;
	};
	up.onmousedown=function(e){
		e.preventDefault();
	}
	down.onmousedown=function(e){
		e.preventDefault();
	}

};