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
			size.winHH=$win.height()/2;
			size.docW=$doc.width();
			size.docH=$doc.height();
			size.docHW=$doc.width()/2;
			size.docHH=$doc.height()/2;
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
			$this.html($this.html().replace(exp,"<a href='$1' target='"+options.target+"'>$1</a>"));
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
		preloadImages: function(srcs, callback){
			var len = srcs.length
	    	,	num=0;
		    srcs.forEach(function(src){
			    var img = new Image();
			    img.src = src;
			    img.onload = function(){
				    num++;
				    if (num===len)callback();
			    }
		    })
		},
		scriptLoader: function(srcs, callback) {
		    var num=0
		    ,	len=srcs.length;
		    srcs.forEach(function(src) {
		        var script=document.createElement('script');
		        script.type='text/javascript';
		        script.src=src;
		        script.onload=function() {
		            script.removeAttribute('onload');
		            num++
		            if (num===len) callback();
		        };
		        document.getElementsByTagName('head')[0].appendChild(script);
		    });
		},
		cssLoader: function(hrefs, callback) {
			var num=0
		    ,	len=hrefs.length;
		    hrefs.forEach(function(href) {
			    var link=document.createElement('link');
                link.rel='stylesheet';
                link.type='text/css';
                link.href=href;
                document.getElementsByTagName("head")[0].appendChild(link);
                num++;
                if (num===len) callback();
		    });
		},
		scrollPosition: function(){
			var pos = new Object()
			,	$doc = $(document)
			,	$win = $(window);
			pos.top = $doc.scrollTop() / ($doc.height()-$win.height()) * 100
			pos.left = $doc.scrollLeft() / ($doc.width()-$win.width()) * 100
			return pos;
		},
		randomColor: function(){
			return '#'+('00000'+(Math.random() * (1<<24)|0).toString(16)).slice(-6));
		},
		arrayUtil: {
			shuffle: function(array){
				var i=array.length;
			    while(i){
			        var j=Math.floor(Math.random()*i)
			        ,	t=array[--i];
			        array[i]=array[j];
			        array[j]=t;
			    }
			    return array;
			},
			clone: function(array){
				var rep = [].concat(array);
				return rep;
			}
		},
		objectUtil: {
			length: function(object){
				return Object.keys(object).length;
			},
			keys: function(object) {
				return Object.keys(object);
			},
			clone: function(object) {
				var rep = function(){};
				rep.prototype = object;
				return rep;
			},
			properties: function(object){
				var properties = ''
				,	agent = $.utils.browser();
			    if (agent==='Safari'||agent==='Chrome') {
				    properties = JSON.stringify(object);
			    } else {
				    properties = object.toSource();
			    }
			    return properties;
			}
		},
		formUtil: {
			val2Object: function($elm){
				var $this = $elm
				,	length = $this.length
				,	objct = new Object();
				for (var i=0;i<length;i++) {
					var prop = $this.eq(i).attr('name');
					var val = $this.eq(i).val();
					objct[i] = {prop:val};
				}
				return objct;
			},
			val2String: function($elm){
				var $this = $elm
				,	length = $this.length
				,	string = '';
				for (var i=0;i<length;i++) {
					string += $this.eq(i).attr('name')+'='+$this.eq(i).val();
					if (i!=length-1) str += ',';
				}
				return string;
			}
		}
		/*
		,geoLocation: function(){
			if (navigator.geolocation){
				var pos=new Object();
				navigator.geolocation.getCurrentPosition(
					function(){
						pos.let=position.coords.latitude;
						pos.lng=position.coords.longitude;
						pos.alt=position.coords.altitude;
						pos.hea=position.coords.heading;
						pos.spd=position.coords.speed;
						return pos;
					}
				);
			} else {
				alert("geolocation not supported");
			}
		}
		*/
	},
	$.display={
		flick: function($elm, config){
	    	var $this=$elm
	    	,	$flickArea = $this.find('#flickArea')
	    	,	$innerBox = $flickArea.children('.innerBox')
	    	,	$boxMargin=parseInt($innerBox.css('margin-left').split('px')[0])+parseInt($innerBox.css('margin-right').split('px')[0])
	    	,	$flickAreaLeft = parseInt($flickArea.css('left').split('px')[0])
	    	,	$boxWidth = $innerBox.width()
	    	,	length=$innerBox.length
	    	,	left=0
	    	,	velocityX=0
	    	,	prevPageX=0
	    	,	downPoint=0
	    	,	now=0
	    	,	diff=0
	    	,	val=0
	    	,	timer
	    	,	direction='+'
	    	,	points=[]
	    	,	press=false
	    	,	hasTouch=false
	    	,	noFlick=true
	    	,	event = 'mouse'
	    	,	eventTypes = {
		    		down: {
			    		mouse: 'mousedown',
			    		touch: 'touchstart',
			    		MSPointer: 'MSPointerDown'
		    		},
		    		move: {
			    		mouse: 'mousemove',
			    		touch: 'touchmove',
			    		MSPointer: 'MSPointerMove'
		    		},
		    		up: {
			    		mouse: 'mouseup',
			    		touch: 'touchend',
			    		MSPointer: 'MSPointerUp'
		    		},
		    		out: {
			    		mouse: 'mouseout',
			    		touch: 'touchend',
			    		MSPointer: 'MSPointerUp'
		    		}
	    		}
	    	,	options=$.extend({
		    	
	    		}, config);
	    	
            $this.each(start);
            
            function start() {
                $flickArea.width(($innerBox.width()+$boxMargin)*length);
                for (var i=0;i<length;i++) {
                    points.push(-($boxMargin+$innerBox.width())*i);
                }
                if ("ontouchstart" in window) {
	                hasTouch=true;
	                event = 'touch';
                } else {
	                hasTouch=false;
	                event = 'mouse';
                }
                if (window.navigator.msPointerEnabled) {
                	hasTouch=true;
	                event = 'MSPointer';
                }
                
                $flickArea.on(eventTypes.down[event],downEvent);
                $innerBox.children('a').on('click', function(e){
	                e.preventDefault();
                })
                addTimer();
            }

            function addTimer() {
                timer=setInterval(function(){
                    $flickAreaLeft = parseInt($flickArea.css('left').split('px')[0]);
                    if (press) {
                        //val += velocityX;
                        if ($flickAreaLeft>($boxWidth+$boxMargin)*0.2||$flickAreaLeft<-$flickArea.width()+($boxWidth*0.8)) upEvent(null);
                        diff=points[now] - $flickAreaLeft;
                        val += (diff*0.1) + (velocityX*0.8);
                        $flickArea.css({left: val});
                    } else {
                        if (!noFlick){
                            diff=points[now] - $flickAreaLeft;
                            val += diff*0.3;
                            $flickArea.css({left: val});
                        }
                    }
                }, 30);
            }

            function removeTimer() {
                clearInterval(timer);
            }

            function downEvent(e) {
            	e.preventDefault();
                var pX=getPageX(e);
                prevPageX=pX;
                downPoint=pX;
                $flickArea.on(eventTypes.up[event], upEvent).on(eventTypes.out[event], outEvent).on(eventTypes.move[event], moveEvent);
            }
            
            function moveEvent(e) {
            	e.preventDefault();
                press=true;
                var pX=getPageX(e);
                left=pX - prevPageX;
                if (prevPageX < pX) {
                    noFlick = false;
                    direction='-';
                    velocityX=pX - prevPageX;
                } else if (prevPageX > pX) {
                    noFlick = false;
                    direction='+';
                    velocityX=-(prevPageX - pX);
                }
                prevPageX=pX;
            }
            
            function outEvent(e) {
            	if (e)e.preventDefault();
                if (!noFlick) press=false;
                $flickArea.off(eventTypes.move[event]).off(eventTypes.up[event]).off(eventTypes.out[event]);
            }
            
            function upEvent(e) {
                var pX=0;
                if (e==null) {
	                pX=downPoint+1;
                } else {
                	e.preventDefault();
	                pX = getPageX(e);
                }
                if (downPoint == pX) {
                    noFlick = true;
                    direction='none';
                    velocityX=0;
                    windowOpen(e);
                } else {
                    noFlick = false;
                }
                if (!noFlick) {
                    if (direction=='+') {
                        now += 1;
                        if (now>=length-1) now=length-1;
                    } else {
                        now -= 1;
                        if (now<=0) now=0;
                    }
                    press=false;
                }
                $flickArea.off(eventTypes.move[event]).off(eventTypes.up[event]).off(eventTypes.out[event]);
            }
            
            function windowOpen(e) {
	            var href = $(e.target).parent('a').attr('href');
	            if (href!=undefined) {
		            location.href = href;
	            }
            }
            
            function getPageX(e) {
            	var pX=0;
                if (hasTouch) pX=e.originalEvent.changedTouches[0].pageX;
                else pX=e.pageX;
                return pX;
            }
	    },
	    spriteAnimateion: function($elm, config){
    		var $this=$elm
    		,	num=1
    		,	length=0
    		,	pos={}
    		,	events=null
    		,	timer
    		,	isPlaying = false
		    ,	options=$.extend({
	    			position: null,
	    			interval: 50,
	    			isPlaying: false,
		        	loop: false,
		        	complete:null
		        },config);
		    pos = options.position;
		    if (pos==null) return;
		    length = Object.keys(pos).length+1;
		    events = options.events;
		    isPlaying = options.isPlaying;
		    $this.each(function(){
		    	if (isPlaying) start()
		    	
		    });
		    
		    function start() {
		    	if (isPlaying)stop();
			    timer=setInterval(animate, options.interval);
		    };
		    
		    function stop() {
			    clearInterval(timer);
		    };
		    
		    function animate() {
			    $this.css({
			    	'background-position-x':-pos[num].x+'px',
			    	'background-position-y':-pos[num].y+'px'
			    })
		    	num++;
		    	if(num==length) {
			    	if (options.loop==false) {
				    	stop();
				    	if (options.complete!=null) {
					    	options.complete();
					    	return false;
				    	}
			    	}
			    	num=1;
		    	};
		    	
		    }
		    
		    return {
			    start:start,
			    stop:stop
		    };
	    },
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
		imageViewer: function($eml, config) {
			var $this = $eml
			,	$main = $this.find('.imageViewerMainImage')
			,	$thumb= $this.find('.imageViewerThumbnail')
			,	length= $thumb.children().length
			,	options=$.extend({
		        	fadeIn: false
		        },config);
			
			$this.each(function(){
				$main.height($main.find('img').height());
				$thumb.children().click(function(e){
					$main.find('img').attr('src', $(e.currentTarget).find('a').attr('href'));
					if (options.fadeIn) {
						$main.find('img').hide().fadeIn(500);
					};
					return false;
				});
			});
		},
		bgSlider: function($elm, config){
			var $this = $elm
			,	to = {}
			,	flom = {}
			,	options=$.extend({
		        	flom:0,
		        	to:100,
		        	pos:'vertical', //side
		        	time:300,
		        	easing: 'linear',
		        	delay:0
		        },config);
		    if (options.pos=='vertical') {
			    flom = {'background-position-y':options.flom+'%'};
			    to = {'background-position-y':options.to+'%'};
		    } else if (options.pos=='side') {
			    flom = {'background-position-x':options.flom+'%'};
			    to = {'background-position-x':options.to+'%'};
		    }
		    $this.css(flom).each(function(){
			    $(this).hover(function(){
				    $(this).stop().animate(to, options.time, options.easing);
			    }, function(){
				    $(this).stop().delay(options.delay).animate(flom, options.time, options.easing);
			    });
		    });
		    return this;
		},
		tooltip: function($elm, config){
			var $this = $elm
			,	nowTitle = ''
			,	$toolContainer
			,	$toolBox
			,	$triangle
			,	targetImage = false
			,	options=$.extend({
		        	bgColor: '#ffffff',
		        	color: '#333333',
		        	fontWeight: 'bold',
		        	fontsize: '11px',
		        	opacity: 0.9,
		        	borderRadius:'5px',
		        	border: '1px solid #333',
		        	animate: true,
		        	easing: 'swing',
		        	toolBox: false
		        },config);
		        
			var offset = new Object();
			offset.top = 0;
			offset.left = 0;
			buildToolBox();
			
			function buildToolBox() {
				$toolContainer = $('<div class="toolContainer"></div>').css({
					'position': 'absolute',
					'top': offset.top+'px',
					'left': offset.left+'px',
					'display': 'none'
				});
				
				$toolBox = $('<div class="toolBox"></div>').css({
					'padding':'5px 7px',
					'background-color': options.bgColor,
					'color':options.color,
					'fontWeight': options.fontWeight,
					'font-size': options.fontsize,
					'opacity': options.opacity,
					'border-radius': options.borderRadius,  
				    '-webkit-border-radius': options.borderRadius,
				    '-moz-border-radius': options.borderRadius,
				    'border': options.border
				});
								
				$triangle = $('<div class="triangle"></div>').css({
					'position': 'absolute',
					'top': 0+'px',
					'left': 0+'px',
					'height':'10px',
				    'width':'10px',
				    'border':'5px solid #333',
				    'border-top-color':'#333'
				}).css({
					'height':'0',
				    'width':'0',
				    'border-color':'transparent',
				    'border-top-color':'#333'
				});
				
				$(document.body).append($toolContainer);
				$toolContainer.append($toolBox);
				$toolBox.after($triangle);
			}
		
			$this.hover(function(e){
				addToolBox($(e.target));
			}, function(e){
				removeToolBox($(e.target));
			});
			
			function addToolBox($target) {
				var ofs = $target.offset();
				nowTitle = $target.attr('title');
				
				if (nowTitle.search(/image:/) != -1) targetImage = true;
				$toolBox.empty();
				$target.attr('title','');
				if (!targetImage) {
					$toolBox.text(nowTitle);
				} else {
					$toolBox.append('<img src="images/m1.jpg">');
				}
				
				$toolContainer.css({
					'top': ofs.top-$toolContainer.height()-5+'px',
					'left': ofs.left-($toolContainer.width()/2)+($target.width()/2)+'px'
				});
				
				$triangle.css({
					'top': $toolContainer.height()+'px',
					'left': $toolContainer.width()/2-5+'px'
				});
				
				if (!options.animate){
					$toolContainer.stop().show();
				} else {
					var posY = ofs.top-$toolContainer.height()-5;
					$toolContainer.css({
						'top': posY-5+'px'
					}).stop().show().animate({'top':posY+'px'},100, options.easing);
				};
			};
			
			function removeToolBox($target) {
				$target.attr('title',nowTitle);
				$toolContainer.stop().hide();
				if (targetImage) $toolBox.empty();
				targetImage = false;
			}
		},
		textCounter: function($elm, config){
			var $this = $elm
			,	offset = $this.offset()
			,	num
			,	options=$.extend({
					limit: 10,
		        	bgColor: '#cccccc',
		        	color: '#333333',
		        	overColor: '#ff0000',
		        	fontWeight: 'bold',
		        	fontsize: '11px',
		        	opacity: 0.9
		        },config);
			num = options.limit;
			
			$this.each(function(){
				var $contBox = $('<span class="textCountBox"></span>').css({
					'position': 'absolute',
					'display': 'block',
					'padding': '3px',
					'text-align': 'right',
					'background-color': options.bgColor,
					'color': options.color,
					'fontWeight': options.fontWeight,
					'font-size':options.fontsize,
					'opacity': options.opacity
				}).text(num);
				
				$(document.body).append($contBox);
				$(window).resize(resizeHandler).keydown(keydownHandler);
				
				function keydownHandler(){
					var n = num - $this.val().length
					,	col = options.color;
					if(n<0){col = options.overColor} else {col = options.color};
					$contBox.css({'color':col}).text(n);
					resizeHandler();
				}
				
				function resizeHandler() {
					offset = $this.offset();
					$contBox.css({
						'top': offset.top+'px',
						'left': offset.left+$this.width()-$contBox.width()+'px',
					})
				};
				resizeHandler();
			})
			
		},
		accordion: function($elm, config) {
			var $this = $elm
			,	$dt = $this.find('dt')
			,	$dd = $this.find('dd')
			,	length = $dt.length
			,	options=$.extend({
					speed:'fast',
					open:function(){},
					close:function(){},
		        	one:false
		        },config);
	        
	        $this.each(function(){
		        $dd.hide();
		        $dt.click(function(){
		        	if($(this).is(".open")){
			        	$(this).removeClass('open').next('dd').slideToggle(options.speed,options.close);
		        	} else {
			        	if (options.one)oneLine();
			        	$(this).addClass('open').next('dd').slideToggle(options.speed,options.open);
		        	}
		        });
	        });
	        
        	function oneLine() {
	        	for (var i=0;i<length;i++){
		        	if ($dt.eq(i).is('.open')){
		        		$dt.eq(i).removeClass('open').next('dd').slideToggle(options.speed,options.close);
		        	}
	        	}
        	};
		},
		newsticker: function($elm, config){
	    	var $this=$elm
	    	,	$thisWidth=$this.width()
		    ,	scrollTimer
		    ,	totalWidth=0
		    ,	left=0
		    ,	num=0
		    ,	timer
		    ,	hoverFlag=false
		    ,	$ul=$this.find('ul')
		    ,	$li=$ul.find('li')
		    ,	length=$li.length
		    ,	action = ''
		    ,	marginRight=parseInt($ul.find('li').css('margin-right').split('px')[0]);
	        
	        var option=$.extend({
	        	action:'scroll',
	        	easing:'swing',
	        	scrollTime: 20,
	        	slideTime:5000
	        }, config);
	        action = option.action;
	        
	        $this.each(function(){
		        for (var i=0;i<length;i++){
					totalWidth += $li.eq(i).width()+marginRight;
				};
				$ul.width(totalWidth+200);
				
				if (action!='') {
					if (action=='scroll') setScroll();
					if (action=='slide') setSlide();
				}
	        });
	        
	        function setSlide() {
	        	for (var i=0;i<length;i++){
		        	$li.eq(i).css({
		        		'position':'absolute',
		        		'top':'0',
		        		'left':$thisWidth*i+'px',
		        		'margin':'0 0 0 10px',
		        		'width':$thisWidth+'px'
		        	});
	        	}
		        addTimer();
	        }
	        	        
	        function addTimer() {timer = setInterval(slide, option.slideTime);};
	        function removeTimer() {clearInterval(timer);};
	        function slide() {
		        num += 1;
		        if (num==length) {
			        num=0;
			        $ul.css({'left':$thisWidth+'px'})
		        }
		        $ul.animate({'left':-$thisWidth*num+'px'}, 500, option.easing)
	        };
	        
	        function setScroll() {
	       		left=$thisWidth+20;
		        scroll();
	        }
	        
			function scroll(){
				scrollTimer=setInterval(function(){
					if (!hoverFlag)left -= 1;
					$ul.css({'left':left+'px'});
					if (left<-totalWidth-200){
						left=$thisWidth;
					}
				}, option.scrollTime);
			}
			
	        function start() {
		        hoverFlag = false;
	        }
	        
	        function stop() {
		        hoverFlag = true;
	        }

		    return {
		    	scroll:setScroll,
		    	slide:setSlide,
			    start:start,
			    stop:stop
		    };
			
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
			var $this=$elm
			,	options=$.extend({
				image: false,
	        	opacity:0.7,
	        	over:0,
	        	out:0
	        },config);
			$this.each(function(){
		        $(this).css({'cursor':'pointer'}).hover(function(){
					$(this).stop().fadeTo(options.over,options.opacity);
					if (options.image) {
						$(this).attr('src', $(this).attr('src').replace(/(\.gif|\.jpg|\.png)/, "_x$1"));
					}
		        },function(){
					$(this).stop().fadeTo(options.out,1.0);
					if (options.image) {
						$(this).attr('src', $(this).attr('src').replace(/_x\.(.+)$/i, '.$1') );
					}
		        })
	        });
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
	$.media={
		state: function(mediaObject){
			var state = {
				paused: mediaObject.paused,
				played: mediaObject.played,
				ended: mediaObject.ended,
				buffered: mediaObject.buffered,
				currentSrc: mediaObject.currentSrc,
				error: mediaObject.error,
				networkState: mediaObject.networkState,
				readyState: mediaObject.readyState,
				seeking: mediaObject.seeking,
				seekable: mediaObject.seekable
			}
			return state;
		},
		video: {
			size: function(mediaObject){
				var size = {
					width: mediaObject.width,
					height: mediaObject.height,
					vodeoWidth: mediaObject.vodeoWidth,
					videoHeight: mediaObject.videoHeight,				
				}
				return size;
			},
		},
		audio: {
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
	}
})(jQuery);