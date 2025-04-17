var _timerMenuShow2;

function clearTMShM2(){
	window.clearTimeout(_timerMenuShow2);
}


$('body').on('click', 'header .header-nav .catalog, header .middle-line .catalog', function(){
	if(!$(this).hasClass('active')){
		$(this).addClass('active')
		clearTMShM2();
		
		if(typeof cM2 !== 'undefined'){			
			$('body').css({overflow: 'hidden'});		
			$('body').append(cM2);	
			//_timerMenuShow2 = window.setTimeout(function() { $('body').find('.catalog-menu').addClass('active'); console.log('A1') }, 500);
			$('body').find('#mobile-menu').removeClass('active');
			$('body').find('header .header-nav .catalog').removeClass('active');			
			$('body').find('header .middle-line .catalog').removeClass('active');			
		}else{			
			$.get('index.php?route=common/header/getMenuV2&key=2n6aKEuz6H4Avy46rhNoLat3UgCJx259', function( html ) { 
				$('body').css({overflow: 'hidden'});		
				$('body').append(html);	
				//_timerMenuShow2 = window.setTimeout(function() { $('body').find('.catalog-menu').addClass('active'); console.log('A2') }, 500);
				$('body').find('#mobile-menu').removeClass('active');
				$('body').find('header .header-nav .catalog').removeClass('active');
				$('body').find('header .middle-line .catalog').removeClass('active');				
			});			
		}
	}
});
$('body').on('mouseover', '.catalog-menu', function(){	
	$(this).addClass('active');
});
if($(window).width() > 760){
	$('body').on('mouseover', '.catalog-menu .parents ul li', function(){			
		var _this = $(this);		
		activateLi(_this);		
	});

	$('body').on('mouseleave', '.catalog-menu .parents ul li', function(){	
		clearTMShM2();
	});
}else{
	$('body').on('click', '.catalog-menu .parents ul li', function(e){
		var _this = $(this);		
		activateLi(_this);	
	});	
	$('body').on('click', '.catalog-menu .parents ul li a', function(e){
		e.stopPropagation();
	});
}
function activateLi(_this){
		
	clearTMShM2();
	$('body').find('.catalog-menu .parents ul li').removeClass('active');
	_this.addClass('active');
	//$('body').find('.catalog-menu').find('.top-childs').remove();
	//$('body').find('.catalog-menu').find('.childs').remove();
	
	_timerMenuShow2 = window.setTimeout(function() { 		
		getChildCategories(); 			
	}, 200);
	
}

function getChildCategories(){
	
	var _item = $('body').find('.catalog-menu .parents ul li.active'),
		category_id = _item.attr('data-id'),
		name = _item.text();
	
	
	if(category_id != '0'){
		
		if(typeof cM2chlds === 'undefined' || !cM2chlds[category_id]){
			$.get('index.php?route=common/header/getChildMenuV2&key=2n6aKEuz6H4Avy46rhNoLat3UgCJx259&parent_id=' + category_id + '&name=' + name, function( html ) { 
				$('body').find('.catalog-menu').find('.top-childs').remove();
				$('body').find('.catalog-menu').find('.childs').remove();
				$('body').find('.catalog-menu').append(html);	
				showMenuBanners(category_id);
				if($(window).width() <= 600){
					clearTMShM2();
					_timerMenuShow2 = window.setTimeout(function() { $('body').find('.catalog-menu .childs').addClass('active') }, 200);				
				}
				
				
			});	 
		}else{
			
			$('body').find('.catalog-menu').find('.top-childs').remove();
			$('body').find('.catalog-menu').find('.childs').remove();
			$('body').find('.catalog-menu').append(cM2chlds[category_id]);	
			showMenuBanners(category_id);
			
			if($(window).width() <= 600){
				clearTMShM2();
				_timerMenuShow2 = window.setTimeout(function() { $('body').find('.catalog-menu .childs').addClass('active') }, 200);				
			}
			
		}	
	}else{
		$('body').find('.catalog-menu').find('.top-childs').remove();
		$('body').find('.catalog-menu').find('.childs').remove();
	}
	
	
}
function showMenuBanners(category_id){
	
	//console.log(cM2bnn[category_id])
	
	//setTimeout(function() {
		if(typeof cM2bnn === 'undefined' || !cM2bnn[category_id]){		
			$('body').find('.catalog-menu .top-childs').html('');
			$('body').find('.catalog-menu .top-childs').addClass('hidden');
		}else{			
			$('body').find('.catalog-menu .top-childs').html(cM2bnn[category_id]);
			$('body').find('.catalog-menu .top-childs').removeClass('hidden');
		}
	//}, 200);
	
}
function showMenuBannersChild(category_id){
	
	//console.log(cM2bnn[category_id])
	
	if(!$('body').find('.catalog-menu .top-childs').find('.child-bn').length)
		$('body').find('.catalog-menu .top-childs').prepend('<div class="child-bn hidden"></div>');
	
	$('body').find('.catalog-menu .top-childs').find('.child-bn img').css({opacity: 0});
	
	//setTimeout(function() {
		if(typeof cM2bnn === 'undefined' || !cM2bnn[category_id]){		
			$('body').find('.catalog-menu .top-childs').find('.child-bn').html('');
			$('body').find('.catalog-menu .top-childs').find('.child-bn').addClass('hidden').css({opacity: 0});
			$('body').find('.catalog-menu .top-childs').find('.child-bn img').css({opacity: 0});
		}else{			
			$('body').find('.catalog-menu .top-childs').find('.child-bn').html(cM2bnn[category_id]);
			$('body').find('.catalog-menu .top-childs').find('.child-bn').removeClass('hidden').css({opacity: 1});
			
			setTimeout(function(){
				$('body').find('.catalog-menu .top-childs').find('.child-bn img').css({opacity: 1});
			}, 300);
		}
	//}, 200);
	
}
jQuery(function($){
	$(document).mouseup(function (e){
		var div = $(".catalog-menu > div");
		if (!div.is(e.target) && div.has(e.target).length === 0) { 
			closeMenu();
		}
	});
});

$('body').on('click', '#mobile-menu', function(){
	if(!$(this).hasClass('active')){
		$(this).addClass('active')
		clearTMShM2();
		$.get('index.php?route=common/header/getMenuV2&key=2n6aKEuz6H4Avy46rhNoLat3UgCJx259', function( html ) { 
			$('body').css({overflow: 'hidden'});		
			$('body').append(html);	
			_timerMenuShow2 = window.setTimeout(function() { 
				
				//add top menu
				_top_menu_html = '';
				_bottom_menu_html = '';
				
				for(var li = 0; li < $('header .top-line ul li').length; li++){
					
					_img = $('header .top-line ul li:eq('+ li +')').attr('data-icon');
					
					if(_img){						
						$('header .top-line ul li:eq('+ li +')').find('a').append('<img src="'+ _img +'">');						
						_top_menu_html += '<li>'+ $('header .top-line ul li:eq('+ li +')').html() +'</li>';						
					}else{
						_bottom_menu_html += '<li>'+ $('header .top-line ul li:eq('+ li +')').html() +'</li>';
					}
					
				}
				
				if(_top_menu_html != '')
					$('body').find('.catalog-menu div.parents').prepend('<ul class="top-list">' + _top_menu_html + '</ul>');
				
				if(_bottom_menu_html != '')
					$('body').find('.catalog-menu div.parents').append('<ul class="top-list bottom">' + _bottom_menu_html + '</ul>');
				
				/*_top_menu_html = '<ul class="top-list">' + $('header .top-line ul').html() + '</ul>';
				console.log(_top_menu_html)
				$('body').find('.catalog-menu div.parents').prepend(_top_menu_html);*/
				//			
			
				$('body').find('.catalog-menu').addClass('active') 
			}, 200);
			$('body').find('#mobile-menu').removeClass('active');
			$('body').find('header .header-nav .catalog').removeClass('active');
			$('body').find('header .middle-line .catalog').removeClass('active');
		});
	}
});
$('body').on('click', '.catalog-menu .close-menu', function(){
	 closeMenu();
});
$('body').on('click', '.catalog-menu > div.childs .parent-name', function(){
	$('body').find('.catalog-menu .childs').removeClass('active');
});

function closeMenu(){
	if($('body').find('.catalog-menu').length){
		$('body').find('.catalog-menu').remove();
		$('body').css({overflow: ''});
	}		
}
/*top menu*/
var itemTopShow;
$('body').on('mouseover', 'header .header-nav ul li', function(){
	
	var _this = $(this),
		_left = _this.offset().left,
		_top = _this.offset().top + _this.outerHeight(),
		_width = 0,
		_maxWidth =  $('header').width(),
		category_id = Number( _this.data('id') ),
		outerW = $('header').width() + ( $(window).width() - $('header').width() ) / 2 ,
		summW = 0;

	clearTMShM2();
	
	itemTopShow = 'header .header-nav ul li:eq('+ _this.index() +'), #nav-menu-top, header .header-nav ul';
	
	if(!_this.hasClass('active')){
		
		if(typeof topM2 === 'undefined' || !topM2[category_id]){
			
			_timerMenuShow2 = window.setTimeout(function() {	
				$('header .header-nav ul li').removeClass('active');
				
				$.get('index.php?route=common/header/getTopMenuV2&key=2n6aKEuz6H4Avy46rhNoLat3UgCJx259&parent_id=' + category_id, function( html ) { 
					
					_this.addClass('active');
					
					$('body').find('#nav-menu-top').remove();
					$('body').append(html);
					
					_width = $('body').find('#nav-menu-top').outerWidth();
					
					summW = _width + _left;
					
					if(summW > outerW) {	
						_left -= (summW - outerW);	
					}

					$('body').find('#nav-menu-top').css({		
						left: _left,
						top: (_top -7),
						'z-index': 1010,
						'max-width': _maxWidth		
					});	
					$('body').find('#nav-menu-top .drop-icon').css({		
						left: (_this.outerWidth() / 2 - 5),			
					});
						
				});
			}, 100);
			
		}else{
			
			_timerMenuShow2 = window.setTimeout(function() {
				
				var html = topM2[category_id];
				
				$('header .header-nav ul li').removeClass('active');
				_this.addClass('active');
				
				$('body').find('#nav-menu-top').remove();
				$('body').append(html);
				
				_width = $('body').find('#nav-menu-top').outerWidth();
				
				summW = _width + _left;
				
				if(summW > outerW) {	
					_left -= (summW - outerW);	
				}

				$('body').find('#nav-menu-top').css({		
					left: _left,
					top: (_top -7),
					'z-index': 1010,
					'max-width': _maxWidth		
				});	
				$('body').find('#nav-menu-top .drop-icon').css({		
					left: (_this.outerWidth() / 2 - 5),			
				});
				
			}, 100);	
			
		}
		
		
	}
});
jQuery(function($){
	$(document).mouseover(function (e){
		if( $('body').find('#nav-menu-top').length ){
			var div = $(itemTopShow);
			if (!div.is(e.target) && div.has(e.target).length === 0) { 
				$('body').find('#nav-menu-top').remove();
				$('header .header-nav ul li').removeClass('active');
				clearTMShM2();
			}
		}		
	});
});

$('header .middle-line').mouseover(function(){
	$('body').find('#nav-menu-top').remove();
});


////
var childBannerTime;

$('body').on('mouseenter', '.catalog-menu .childs .list-parents li', function(){
	
	var category_id = $(this).attr('data-id'),
		_this = $(this);
	
	clearTimeout(childBannerTime);
	
	if(!_this.hasClass('active')){ 
	
	$('body').find('.catalog-menu .childs .list-parents li').removeClass('active');
	
		childBannerTime = setTimeout(function(){
			showMenuBannersChild(category_id);
			_this.addClass('active');
		}, 500);
	
	}
	
});

$('body').on('mouseenter', '.catalog-menu .top-childs', function(){
	clearTimeout(childBannerTime);
	console.log('clear')
});
