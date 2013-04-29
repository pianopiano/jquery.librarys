/*
 * jQuery librarys
 */
 (function($){
	$.utils={
		stageSize: function(){
			var $win=$(window)
			,	$doc=$(document)
			,	size=new Object();
			size.winW=$win.width();
			size.winH=$win.height();
			size.winHW=$win.width()/2;
			size.winHH=$win.width()/2;
			size.docW=$doc.width();
			size.docH=$doc.height();
			size.docHW=$doc.width()/2;
			size.docHH=$doc.width()/2;
			return size;
		},
		trackEvent: function(target, config){
			if(_gaq){
				var $this=target;
				var options=$.extend({
		        	category: '',
		        	action:'',
		        	label:''
		        },config);
		        $this.each(function(){
			        $(this).click(function(){
				        _gaq.push(['_trackEvent', options.category, options.action,$(this).attr(options.label)]);
			        })
		        });
			}
	        return false;
		},
		flashplayer: function(){
			var flash=false;
			try{
			    var f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			    flash=true;
			} catch(e) {
			    flash=false;
			}
			if (!flash){
			    if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] ?navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0){
			        flash=true;
			    }
			};
			return flash;
		},
		textURL: function($elm, config){
			var $this=$elm,
				options=$.extend({
		        	target: "_blank"
		        },config);
			var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			elm.html(elm.html().replace(exp,"<a href='$1' target='"+options.target+"'>$1</a>"));
		},
		browser: function(){
			var agent=''
			,	userAgent=navigator.userAgent
			,	appVersion=navigator.appVersion;
			if(userAgent.search(/iPhone/) != -1){
				agent='iPhone';
			} else if(userAgent.search(/iPad/) != -1){
				agent='iPad';
			} else if(userAgent.search(/iPod/) != -1){
				agent='iPod';
			} else if(userAgent.search(/Android/) != -1){
				agent='Android';
			} else {
				if(userAgent.search(/Safari/) != -1){
					agent='Safari';
					if (userAgent.search(/Chrome/) != -1){
						agent='Chrome';
					}
				} else if (userAgent.search(/Firefox/) != -1) {
					agent='Firefox';
				} else if (userAgent.search(/Opera/) != -1) {
					agent='Opera';
				} else if (userAgent.search(/MSIE 10/) != -1) {
					agent='ie10';
				} else if (userAgent.search(/MSIE 9/) != -1) {
					agent='ie9';
				} else if (userAgent.search(/MSIE 8/) != -1) {
					agent='ie8';
				} else if (userAgent.search(/MSIE 7/) != -1) {
					agent='ie7';
				} else if (userAgent.search(/MSIE 6/) != -1) {
					agent='ie6';
				} else {
					if(!jQuery.support.opacity){
					    if(!jQuery.support.style){
					        if (typeof document.documentElement.style.maxHeight != "undefined") {
					    		agent='ie7';
					        }
					        else {
					    		agent='ie6';
					        }
					    }else{
					    	agent='ie8';
					    }
					} else {
						agent='undefined';
					}
				};
			};
			return agent;
		},
		getDate: function(){
			var _date=new Object()
			,	weekArray=new Array("日","月","火","水","木","金","土")
			,	d=new Date();
			_date.year=(d.getYear() < 2000) ? d.getYear()+1900 : d.getYear();
			_date.month=d.getMonth() + 1;
			_date.date=d.getDate();
			_date.days=d.getDay();
			_date.hours=d.getHours();
			_date.minutes=d.getMinutes();
			_date.seconds=d.getSeconds();
			_date.day=_date.year + "年" + _date.month + "月" + _date.date + "日";
			_date.week=weekArray[_date.days] + "曜日";
			_date.time=_date.hours + "時" + _date.minutes + "分" + _date.seconds + "秒";
			_date.full=_date.day + " " + _date.week + " " + _date.time;
			return _date;
		},
		scriptLoader: function(srcs, complete) {
		    var num=0
		    ,	len=srcs.length;
		    srcs.forEach(function(src) {
		        var script=document.createElement("script");
		        script.src=src;
		        script.onload=function() {
		            script.removeAttribute("onload");
		            num++
		            if (num===len) {complete();}
		        };
		        document.getElementsByTagName("head")[0].appendChild(script);
		    });
		},
		array:{
			shuffle: function(array){
				var i=array.length;
			    while(i){
			        var j=Math.floor(Math.random()*i)
			        ,	t=array[--i];
			        array[i]=array[j];
			        array[j]=t;
			    }
			    return array;
			}
		},
		geoLocation: function(){
			if (navigator.geolocation){
				var pos=new Object();
				navigator.geolocation.getCurrentPosition(
					function(){
						pos.let=position.coords.latitude;
						pos.lng=position.coords.longitude;
						pos.alt=position.coords.altitude
						pos.hea=position.coords.heading
						pos.spd=position.coords.speed
						return pos;
					}
				);
			} else {
				alert("geolocation not supported");
			}
		}
	},
	$.display={
		text: {
			textAnimate: function($elm, config) {
				var $this=$elm,
					text=$this.text(),
					letters=text.split(''),
					length=letters.length,
					num=1,
					options=$.extend({
			        	delay:5,
			        	fadeTime:150,
			        	complete:function(){}
			        },config);
	
				$this.each(function(){
					$(this).html(text.replace(/./g, '<span class="txtanim_one">$&</span>')).find('span.txtanim_one').each(function(i, one){
						$(one).css('opacity','0');
						setTimeout(function(){
							$(one).animate({'opacity':'1'}, options.fadeTime);
							if (++num==length-1) setTimeout(options.complete, options.fadeTime);
						}, options.delay * i);
					});
				});
			},
			addHellip: function($elm,num) {
				var $this=$elm;
				var text=$this.html();
				$this.html(textExcerpt($this.html(),num)+'<br /><button class="moreBtn">read more</button>');
				$('.moreBtn').on('click',function(){
					$this.html(text);
					$(this).off('click').empty().remove();
				})
				function textExcerpt(str, n) {
					var txts=str.split('');
					txts.splice(n, txts.length-1);
					return txts.join('') + (txts.length !== str.split('').length ? '&hellip;' : '');
				}
			}
		},
		carrousel: function($elm,config){
			var $this=$elm
			,	childTagName=$this.children().get()[0].localName
			,	$child=$this.children(childTagName)
			,	gChildTagName=$child.children().get()[0].localName
			,	$gChild=$child.children(gChildTagName)
			,	length=0
			,	fullWidth=0
			,	width=0
			,	addTimer
			,	removeTimer
			,	move
			,	carTimer
	        ,	nextSlide
	        ,	prevSlide
	        ,	setBtns
	        ,	resetBtns
	        ,	onPrevClickHandler
	        ,	onNextClickHandler;
	        
			
			var options=$.extend({
	        	time:3000,
	        	slideTime:500,
	        	easing:'swing',
	        	btn:false
	        },config);
	        
	        nextSlide=function() {
		        $child.children(gChildTagName).eq(0).insertAfter( $child.children(gChildTagName).eq(length-1) );
	        };
	        
	        prevSlide=function() {
		        $child.children(gChildTagName).eq(length-1).insertBefore($child.children(gChildTagName).eq(0));
	        }
	        
	        setBtns=function() {
		        $this.children('.prev').on('click', onPrevClickHandler).end().children('.next').on('click', onNextClickHandler);
	        }
	        
	        resetBtns=function() {
		        $this.children('.prev').off('click', onPrevClickHandler).end().children('.next').off('click', onNextClickHandler);
	        }
	        
	        onPrevClickHandler=function() {
		        move(0,prevSlide);
	        }
	        
	        onNextClickHandler=function() {
	        	move(-(width*2), nextSlide);
	        }
	        addTimer=function(){carTimer=setInterval(function(){
		        move(-(width*2), nextSlide);
	        }, options.time);};
	        
	        removeTimer=function(){clearInterval(carTimer);};
	        
	        move=function(left, callback){
	        	resetBtns();
		        $child.stop().animate({'left': left+'px'},{duration: options.slideTime, easing: options.easing, complete: function(){
		        	callback();
		        	$child.css({'left':-width+'px'});
		        	if (options.btn) setBtns();
		        }});
	        };
	        	        
	        $this.hover(removeTimer,addTimer).each(function(){
		        length=$gChild.length;
		        width=$gChild.eq(0).width() +
		        	parseInt($gChild.eq(0).css('margin-left')[0])+
		        		parseInt($gChild.eq(0).css('margin-right')[0]);
		        fullWidth=width*length;
		        $child.css({'width':fullWidth+'px','left':-width+'px'})
		        $gChild.eq(0).before($gChild.eq(length-1));
		        addTimer();
		        if (options.btn) setBtns();
	        }).children(gChildTagName).on('click', function(){
		        location.href=$(this).find('a').attr('href');
	        })
		},
		rollHover: function($elm,config){
			var $this=$elm;
			var options=$.extend({
	        	opacity:0.7,
	        	over:0,
	        	out:0
	        },config);
			$this.each(function(){
		        $(this).css({'cursor':'pointer'}).hover(function(){
			        $(this).stop().fadeTo(options.over,options.opacity);
		        },function(){
			       $(this).stop().fadeTo(options.out,1.0);
		        })
	        })
	        return this;
		},
		heightAlign: function($elm,config){
			var $this=$elm,length,option=$.extend({line:0},config);
	    	length=$this.length;
	        $this.each(function(){
		        var i;
	        	if (option.line==0){
			        var arr=[];
					for (i=0;i<length;i++){arr.push($this.eq(i).height())};
					arr.sort(function(a,b){if( a < b ) return 1;if( a > b ) return -1;return 0;});
					$this.height(arr[0]);
	        	} else {
					for (var i=0;i<length;i++){i % option.line ? 'return': liner(i);};
					function liner(i){
						var arr=[],n;
						for (n=0;n<option.line;n++){arr.push($this.eq(i+n).height());};
						arr.sort(function(a,b){if(a<b) return 1;if(a>b) return -1;return 0;});
						for (n=0;n<option.line;n++){$this.eq(i+n).height(arr[0])};
					}
	        	}
	        });
	        return false;
		},
		boxLink: function($elm,config){
			var $this=$elm
			,	option=$.extend({
					hover:false,
					opacity:0.7,
					over:0,
					out:0
				},config);
			$this.css({'cursor':'pointer'}).each(function(){
				if (option.hover){
					$.display.rollHover($(this),{opacity:option.opacity,over:option.over,out:option.out});
				};
				$this.click(function(){
					location.href=$(this).find('a').attr('href');
				});
			});
			return false;
		},
		scrollTop: function($elm, config){
			var $target=$('html');
			var option=$.extend({
				time:1000,
				easing:'easeInOutExpo',
				complete:function(){}
			},config);
			$elm.click(function(){
				var n=0;
				$('body,html').animate({scrollTop: 0}, {duration:option.time,easing:option.easing,complete:function(){
					option.complete();
				}});
			});
			return false;
		},
		lightbox: function($elm, config){
			var $win=$(window)
			,	$doc=$(document)
			,	$ww =$win.width()
			,	$wh =$win.height()
			,	$this=$elm
			,	$scrollTop=0
			,	option=$.extend({
				},config);
				
			var build=function(src) {
				$win.resize(onResizeHandler);
				$win.scroll(onScrollHandler);
				
				$(document.body).css({'position':'relative'}).append(
					'<div id="lightbackground"></div>'+
					'<img src="'+src+'" id="lightboxContainer" />'
				);
				$('#lightboxContainer').css({
					'position':'absolute',
					'top':'0',
					'left':'0',
					'z-index':2,
					'display':'none'
				}).click(remove);
				$('#lightbackground').css({
					'position':'absolute',
					'top':'0',
					'left':'0',
					'width':'100%',
					'height':'100%',
					'background-color':'#000',
					'opacity':'0.8',
					'z-index':1,
					'display':'none'
				}).fadeIn(300, function(){
					$('#lightboxContainer').fadeIn();
				});
				
				onResizeHandler();
			};
			function onResizeHandler(){
				$ww =$win.width();
				$wh =$win.height();
				var $lightbox=$('#lightboxContainer');
				$lightbox.css({
					'top':($wh/2)-($lightbox.height()/2)+$scrollTop+'px',
					'left':($ww/2)-($lightbox.width()/2)+'px'
				});
			};
			function onScrollHandler(){
				$scrollTop=$win.scrollTop();
				onResizeHandler();
			}
			function remove() {
				$('#lightboxContainer').fadeOut(300, function(){
					$(this).empty().remove();
					$('#lightbackground').fadeOut(300, function(){
						$(this).empty().remove();
					});
				})
			}
			$elm.click(function(e){
				build($(e.target).attr('src'));
				return false;
			});
		},
		bgFitSlider: function(array, config){
			var $this
			,	length
			,	timer
			,	slideTime
			,	fadeTime
			,	images=array
			,	num=0
			,	now=1
			,	flag=true;

	        length=images.length;
	        $(document.body).css({'overflow':'hidden'}).prepend(
	        	'<div class="bgFitSlider" id="frontBg"></div>'+
	        	'<div class="bgFitSlider" id="backBg"></div>'
	        );
	        var $frontBg=$('#frontBg'),$backBg=$('#backBg');
	        $frontBg.css({'background':'url('+images[0]+') no-repeat center center fixed'});
	        $backBg.css({'background':'url('+images[1]+') no-repeat center center fixed'}).hide();
	        $this=$('.bgFitSlider').css({
		        'position':'fixed',
		        'top':'0',
		        'left':'0',
		        '-webkit-background-size': 'cover',
		        '-moz-background-size': 'cover',
		        '-o-background-size': 'cover',
		        'background-size': 'cover',
		        'z-index':'0'
	        })
	        
	        var option=$.extend({
	            slideTime:5000,
	            fadeTime:1000
	        }, config);
	        slideTime=option.slideTime;
	        fadeTime=option.fadeTime;
	        
	        for (var i=0;i<length;i++){
                var img=new Image();
                img.src=images[i];
                img.onerror=function(){return false;};
                img.onload=function(){
                    num++;
                    if (num==(length-1)){
	                    build();
                    };
                };
            };
	        
	        function build(){
	            addTimer();
	            $(window).resize(onResizeHandler);
	            onResizeHandler();
	        }
	        
	        function onResizeHandler() {
	            $this.css({'width':$(window).width()+'px','height':$(window).height()+'px'});
	        }
	        
	        function addTimer() {timer=setInterval(onTimerEventHandler, slideTime);}
	        function removeTimer(){clearInterval(timer);}
	        function onTimerEventHandler() {
	            now++;
	            flag=!flag;
	            if (now==length){now=0;};
	            changeImage();
	        }
	        
	        function changeImage() {
	            if (flag){
	                $frontBg.fadeIn(fadeTime);
	               $backBg.fadeOut(fadeTime,chage);
	            } else if (!flag){
	                $frontBg.fadeOut(fadeTime);
	               $backBg.fadeIn(fadeTime,chage);
	            }
	        }
	        
	        function chage(){
	            var n=now+1;
	            if (n==length){n=0;}
	            if (now % 2){
	               $backBg.css({'background': 'url('+images[n]+') no-repeat center center fixed'})
	            } else {
	                $frontBg.css({'background': 'url('+images[n]+') no-repeat center center fixed'})
	            }
	        }
	        return false;			
		}
	},
	$.cookie={
		set: function(config){
			var option=$.extend({
	            name: '',
	            value: '',
	            expires: 0,
	            path: ''
	        }, config);
	        if (!option.name) return;
	        var cookie=option.name + '=' + escape(option.value);
	        if (option.path=='/'){
		        cookie += '; path=' + '/';
	        } else if (option.path=='this'){
		        cookie += '; path=' + location.pathname;
	        };
	        if (option.expires){
				var expires=new Date(new Date().getTime() + (60*60*24*1000*option.expires));
				expires=expires.toGMTString();
	        };
	        document.cookie=cookie;
		},
		get: function(name){
			if (!name) return;
			if (document.cookie) {
				var cookies=document.cookie.split('; ');
				for (var i=0; i<cookies.length; i++){
					var values=cookies[i].split('=');
					if(values[0]==name) {
						return unescape(values[1]);
					}
				}
			}
		}
	},
	$.audio={
		format: function(){
			var fmt
			,	audio=new Audio();
	        if      (audio.canPlayType("audio/ogg") == 'maybe') { fmt='ogg'; }
	        else if (audio.canPlayType("audio/mp3") == 'maybe') { fmt='mp3'; }
	        else if (audio.canPlayType("audio/wav") == 'maybe') { fmt='wav'; }
			audio=null;
			return fmt;
		}
	}
})(jQuery);