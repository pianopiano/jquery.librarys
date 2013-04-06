/*!
 * jQuery librarys
 */
 (function($){
	$.utils = {
		trackEvent: function(target, config){
			if(_gaq){
				var $this = target;
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

			var flash = false;
			try{
			    var f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			    flash = true;
			} catch(e) {
			    flash = false;
			}
			if (!flash){
			    if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] ?navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0){
			        flash = true;
			    }
			};
			return flash;
		},
		browser: function(){
			var agent = ''
			,	userAgent = navigator.userAgent;
			if(userAgent.search(/iPhone/) != -1){
				agent = 'iPhone';
			} else if(userAgent.search(/iPad/) != -1){
				agent = 'iPad';
			} else if(userAgent.search(/iPod/) != -1){
				agent = 'iPod';
			} else if(userAgent.search(/Android/) != -1){
				agent = 'Android';
			} else {
				if(userAgent.search(/Safari/) != -1){
					agent = 'Safari';
					if (userAgent.search(/Chrome/) != -1){
						agent = 'Chrome';
					}
				} else if (userAgent.search(/Firefox/) != -1) {
					agent = 'Firefox';
				} else if (userAgent.search(/Opera/) != -1) {
					agent = 'Opera';
				} else if (userAgent.search(/MSIE 9/) != -1) {
					agent = 'ie9';
				} else {
					agent = 'undefined';
				};
			};
			return agent;
		},
		shuffleArray: function(array){
			var i = array.length;
		    while(i){
		        var j = Math.floor(Math.random()*i)
		        ,	t = array[--i];
		        array[i] = array[j];
		        array[j] = t;
		    }
		    return array;
		},
		geoLocation: function(){
			if (navigator.geolocation){
				var pos = new Object();
				navigator.geolocation.getCurrentPosition(
					function(){
						pos.let = position.coords.latitude;
						pos.lng = position.coords.longitude;
						pos.alt = position.coords.altitude
						return pos;
					}
				);
			}
		}
	},
	$.display = {
		rollHover: function($elm,config){
			var $this = $elm;
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
	    	length = $this.length;
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
					location.href = $(this).find('a').attr('href');
				});
			});
			return false;
		},
		scrollTop: function($elm, config){
			var $target = $('html');
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
			var $win = $(window)
			,	$doc = $(document)
			,	$ww  = $win.width()
			,	$wh  = $win.height()
			,	$this=$elm
			,	$scrollTop = 0
			,	option=$.extend({
				},config);
				
			var build = function(src) {
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
				$ww  = $win.width();
				$wh  = $win.height();
				var $lightbox = $('#lightboxContainer');
				$lightbox.css({
					'top':($wh/2)-($lightbox.height()/2)+$scrollTop+'px',
					'left':($ww/2)-($lightbox.width()/2)+'px'
				});
			};
			function onScrollHandler(){
				$scrollTop = $win.scrollTop();
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

	        length = images.length;
	        $(document.body).css({'overflow':'hidden'}).prepend(
	        	'<div class="bgFitSlider" id="frontBg"></div>'+
	        	'<div class="bgFitSlider" id="backBg"></div>'
	        );
	        var $frontBg=$('#frontBg'),$backBg=$('#backBg');
	        $frontBg.css({'background':'url('+images[0]+') no-repeat center center fixed'});
	        $backBg.css({'background':'url('+images[1]+') no-repeat center center fixed'}).hide();
	        $this = $('.bgFitSlider').css({
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
	        slideTime = option.slideTime;
	        fadeTime = option.fadeTime;
	        
	        for (var i=0;i<length;i++){
                var img = new Image();
                img.src = images[i];
                img.onerror = function(){return false;};
                img.onload = function(){
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
	        
	        function addTimer() {timer = setInterval(onTimerEventHandler, slideTime);}
	        function removeTimer(){clearInterval(timer);}
	        function onTimerEventHandler() {
	            now++;
	            flag = !flag;
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
	            var n = now+1;
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
	$.audio = {
		format: function(){
			var fmt
			,	audio = new Audio();
	        if      (audio.canPlayType("audio/ogg") == 'maybe') { fmt = 'ogg'; }
	        else if (audio.canPlayType("audio/mp3") == 'maybe') { fmt = 'mp3'; }
	        else if (audio.canPlayType("audio/wav") == 'maybe') { fmt = 'wav'; }
			audio=null;
			return fmt;
		}
	}
})(jQuery);