/*
 *Description: some useful tools for JavaScript
 *Author: b2ns
 */

(function (exports){
  "use strict";
  /* every thing bind to the function '_' */
  var _=function (){};
  /* export to global */
  exports.Tools=exports._=_;

  /********** TOOLS DEFINE AFTER THIS LINE **********/

  /***** Class And Object *****/
  /* define a class and extends from only one super class */
  _.class=function (member,dad){
	var Class=function (){
	  this.init.apply(this,arguments);
	};
	if(typeof dad === "function"){
	  var F=function (){};
	  F.prototype=dad.prototype;
	  Class.prototype=new F();
	  Class.prototype.constructor=Class;
	  Class.prototype.super=dad.prototype;
	}
	Class.prototype.init=function (){};
	for(var m in member){
	  if(member.hasOwnProperty(m))
		Class.prototype[m]=member[m];
	}
	return Class;
  };
  /* multiple extends using mixin */
  _.mixin=function (son,dads){
	for(var i=0,len=dads.length;i<len;i++){
	  var dad=dads[i];
	  for(var method in dad.prototype)
		if(!son.prototype[method])
		  son.prototype[method]=dad.prototype[method];
	}
  };
  /* clone an object */
  _.clone=function (obj){
	var F=function (){};
	F.prototype=obj;
	return new F();
  };
  /* lazy load a singleton */
  _.lazySingleton=function (constructor){
	var instance=null;
	return {
	  getInstance: function (){
	    return (instance)?instance:constructor();
	  }
	};
  };

  /***** normal use *****/
  /* loop */
  _.loop=function (fn,N){
    var N=N||1;
	for(var i=0;i<N;i++)
	  fn.call(null,i);
  };
  /* random number */
  _.random=function (a,b){
	switch(arguments.length){
	  case 0: a=0,b=100;break;
	  case 1: b=a,a=0;break;
	  default: ;
	}
	return Math.floor(Math.random()*(b-a))+a;
  };
  /* random string */
  _.randomStr=function (length){
    var length=length||5;
	var arr=new Array(length);
	while(length--){
	  arr[length]=String.fromCharCode(Math.floor(Math.random()*26)+97);
	}
	return arr.join("");
  };
  /* timer */
  _.Timer=_.class({
	init: function (){
	  this._time=0;
	},
	start: function (){
	  this._time=Date.now();
	},
	end: function (){
	  var tmp=Date.now()-this._time;
	  console.log(tmp+" ms");
	  return tmp;
	},
  });
  /* counter */
  _.Counter=_.class({
	init: function (num){
	  this._count=num||0;
	},
	show: function (){
	  return this._count;
	},
	add: function (num){
	  num=num||1;
	  if(num<0) num=-num;
	  return this._count+=num;
	},
	sub: function (num){
	  num=num||1;
	  if(num<0) num=-num;
	  return this._count-=num;
	},
	reset:function (num){
	  return this._count=num||0;
	},
  });

  /***** Other Stuff Related To JavaScript *****/
  /* exact type of variable */
  _.typeof=function (variable){
	return Object.prototype.toString.call(variable).slice(8, -1);
  };
  /* bind this to a certain object */
  _.proxy=function (that,fn){
	return function (){
	  return fn.apply(that,arguments);
	};
  };


  
})(window);
