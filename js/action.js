//a active
$(document).ready(function(){
	var path = window.location.pathname.substr(1),
		href = window.location.href;

	$('#column-left .categories-menu ul li a[href="/'+ path +'"]').addClass('active');
	$('#column-left .categories-menu ul li a[href="'+ href +'"]').addClass('active');
});

/*LEFT HIDDEN UP*/
$(document).ready(function(){
	if($(window).width() > 550){
		$('body').append('<div id="h-up" style="position: fixed; z-index: 10; top: 0; bottom: 0; left: 0; width: 25px;">');
		$('body').append('<div id="h-down" style="position: fixed; z-index: 10; top: 0; bottom: 0; right: 10px; width: 10px;">');
	}
});
$('body').on('click', '#h-up, .f-button-up', function(){
	$('html,body').animate({scrollTop: 0}, 500);
});
$('body').on('click', '#h-down', function(){
	$('html,body').animate({scrollTop: $('body').height()}, 500);
});
/*HEADER FIXED*/
var timerFix;
$(window).scroll(function(){
	
	clearTimeout(timerFix);
	
	if($(window).width() > 550){
	
		if(!$('.header').hasClass('active') && !$('body').find('.ppa-search-full').length){
			if($(this).scrollTop() > $('header').height() + 300){
				$('body').css({'padding-top': $('body').attr('data-top') + 'px'});
				$('body').addClass('scroll-elements');
				
				timerFix = setTimeout( function() { 
					$('body').find('.sticky.menu, .menu-box-scroll, .menu-box.sticky').css({top: '100px'});
					$('body').find('.top-scroll').css({top: '75px'});
				}, 200);
			
				if(!$('body').find('.f-button-up').length && $(window).width() > 900)
					$('body').append('<div class="f-button-up flex animate"><i class="icon-up cell"></i></div>');
			}else{
				$('body').css({'padding-top': 0});
				$('body').removeClass('scroll-elements');	
				$('body').find('.f-button-up').remove();	
				$('body').attr('data-top', $('.header').outerHeight() +30);	
				$('body').find('.sticky.menu, .menu-box-scroll').css({top: '15px'});
				$('body').find('.top-scroll').css({top: 0});
			}
		}
		
	}else{
		/*$('header .middle-line .buttons').css({'bottom': '-900px', 'margin-top': 'auto', 'opacity': 0});
		timerFix = setTimeout( function() { 
			$('header .middle-line .buttons').css({'bottom': 0, 'margin-top': 'auto', 'opacity': 1});
		}, 300);*/
	}		
	//inView("div.in-view");
	
});
//InView
function inView(s){
  var scrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();
  var currentEls = $(s);
  currentEls.each(function(){
    var el = $(this);
	var goAnimID = el.get(0).id;
    var offset = el.offset();
    if(scrollTop <= offset.top && offset.top < (scrollTop + windowHeight)){
      $('body').find('[data-tab="#'+ el.attr('data-tab') +'"]').parent().find('li').removeClass('active');
      $('body').find('[data-tab="#'+ el.attr('data-tab') +'"]').addClass('active');
	}		
   });
} 
//Popups
$('body').on('click', '.form-popup, .get-type', function(){
	
	$('body').find('.popup-overlay, .popup-full').remove();
	
	var type = $(this).attr('data-type');
	var product = $(this).attr('data-title');
	var _link	= $(this).attr('data-link');
	var product_id	= $(this).attr('data-id');
	
	if(!product)
		product = false;
	
	if(!_link)
		_link = false;
	
	if(!product_id)
		product_id = false;
	
	$.get('index.php?route=popup/popup&type='+type+'&product='+product+'&link='+_link+'&get_clone=1&product_id='+product_id, function(result) {
		$('body').append(result);
		setTimeout( function() { ph_animate_detect($('body').find('.popup-overlay, .popup-full'), '.ph-animate'); }, 100);
	});
	
	return false;
	
});
$('body').on('click', '.popup-full-close', function(){
	$(this).parent().remove()
	
});
	//предзаказ
$('body').on('click', 'button[data-form=\'productF\']', function(){
	
	var type = 'product';
	var product = $(this).attr('data-title');
	
	$.get('index.php?route=popup/popup&type='+type+'&product='+product, function(result) {
		$('body').append(result);
		setTimeout( function() { ph_animate_detect($('body').find('.popup-overlay, .popup-full'), '.ph-animate'); }, 100);
	});
	
	return false;
	
});
	//product alternative
function product_alternative(product_id){
	
	$.ajax({
		url: 'index.php?route=product/product/getAlternativeAjax&product_id=' + product_id,
		success: function(json) {
			
					
			if(json['href']){
				if($(window).width() > 768)
					window.open(json['href'], '_blank');
				else
					location = json['href'];
			}else if(json['getForm']){
				console.log('getForm');				
			}			
			
			
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
		}
	});	
	
}	

//copy

$('body').on('mouseover', '.copy-hover', function () {
	var _this = $(this);

	if(!_this.find('.copy-popup').length) {
		
		_this.css({position: 'relative'});

		html = '<div class="copy copy-popup">';
		html += '<i class="icon2-copy"></i>';
		html += '</div>';

		_this.append(html);

	}
});

$('body').on('mouseleave', '.copy-hover', function () {
	$(this).find('.copy-popup').remove();
});

$('body').on('click', '.copy', function () {
	
	var _this = $(this);

console.log('COPY');

	if(_this.hasClass('copy-popup'))
		_this.parent().find('.text, .ctext').css({opacity: 0.2});
	else
		_this.css({opacity: 0.2});
	
	if(_this.parent().find('.text, .ctext').length)
		_text = _this.parent().find('.text, .ctext').text();
	else if(_this.find('.text, .ctext').length)
		_text = _this.find('.text, .ctext').text();
	else
		_text = _this.text();
	
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(_text).select();
    document.execCommand("copy");
    $temp.remove();
	
	setTimeout(function(){
		
		if(_this.hasClass('copy-popup'))
			_this.parent().find('.text, .ctext').css({opacity: 1});
		else
			_this.css({opacity: 1});

	 }, 300);

});
//actions form
$('body').on('focus', '.in-page .input-box-cart .input', function(){
	$(this).parent().addClass('focus');
});
$('body').on('focus', '.in-page .input-box-cart.err .input', function(){
	$(this).parent().removeClass('err');
});
$('body').on('click', '.in-page .input-box-cart.err .input', function(){
	$(this).parents('.input-box-cart').removeClass('err');
});
$('body').on('focusout', '.in-page .input-box-cart .input', function(){	
	_v = $(this).val();
	if(_v.length < 1 || _v == '+7 (___) ___-__-__')
		$(this).parent().removeClass('focus');	
});
//valid form
function set_valid_ico(_this){
	//_this.parent().find('label').addClass('valid-ico');
}
function ppa_valid(_this, _class){	

	_class = (_class !== undefined) ? _class : false;
	
	$('body').find('.error-box').remove();
	$('input, textarea, label').removeClass('error');
	var Vmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

	if(!_class)
		var form = _this.parents('form');	
	else
		var form = _this.parents('.form');	

	var valid = true;
	
	for(var i = 0; i < form.find('.valid').length; i++){
		
		var value 	= form.find('.valid:eq('+ i +')').val();
		var id 		= form.find('.valid:eq('+ i +')').attr('id');
		if(form.find('.valid:eq('+ i +')').attr('data-animate'))
			var _text 	= form.find('.valid:eq('+ i +')').parent().find('label').text();
		else
			var _text 	= form.find('.valid:eq('+ i +')').attr('placeholder');
		
		if(!_text)
			_text 	= form.find('.valid:eq('+ i +')').attr('data-placeholder');
		
		if(!value || id == 'input_email' && !Vmail.test(value)){
			
			if(_text === undefined)
				form.find('.valid:eq('+ i +')').parent().addClass('err');
			else
				form.find('.valid:eq('+ i +')').parent().append('<div class="tooltipster-base tooltipster-sidetip tooltipster-top tooltipster-fade tooltipster-show error-box"><div class="tooltipster-box"><div class="tooltipster-content">' + _text + '</div></div></div>');
			
			form.find('.valid:eq('+ i +')').addClass('error');
			
			
			valid = false;
		}
		
		
	}
	
	for(var i = 0; i < form.find('.valid-size').length; i++){
		
			
		file = form.find('.valid-size:eq('+ i +')')[0].files[0];	
			
		if(file !== undefined){
			
			file_size = file.size;
			limit = form.find('.valid-size:eq('+ i +')').attr('data-size');
			
			if(Number(file_size) > Number(limit)){
				
				_for = form.find('.valid-size:eq('+ i +')').attr('id');
				
				$('body').find('label[for="'+ _for +'"]').addClass('error');
				$('body').find('label[for="'+ _for +'"]').find('.file-name').text('превышен размер файла');
				
				valid = false;
				
			}
			
		}
		
	}
	
	if(form.find('#filter-size-1').length && !form.find('#filter-size-1').is(":checked")){
		
		form.find('label[for=\'filter-size-1\']').addClass('error');
		valid = false;
		
	}
	
	return valid;
	
}
$('body').on('click', 'input, textarea, label, select', function(){	
	$(this).removeClass('error');
	$(this).parent().find('.error-box').remove();
	$(this).parents('.checkout-block__form-group').find('.error-box').remove();
});
//tabs
$('body').on('click', '.tabs-nav li, .tabs-nav .aY', function(){
	
	var general = $(this).attr('data-general'),
		clicker = $(this).attr('data-clicktab'),
		_this = $(this);
	
	if(general){
		
		$('html, body').animate({
			   scrollTop: $(general).offset().top -150
		}, 0, function(){
			
			$(general).animate({
			   scrollTop: $(_this.attr('data-tab')).offset().top -150
			}, 0);
			
		});
		
	}else if(clicker){
		
		$(clicker).click();
		
		setTimeout(function(){
			
			$('html, body').animate({
			   scrollTop: $(clicker).offset().top -150
			}, 0);
			
		}, 200);
		
	}else{
	
		$('html, body').animate({
			   scrollTop: $(_this.attr('data-tab')).offset().top -150
		}, 0);
		
	}
	
});
$('body').on('click', '.tabs.outdata li', function(){
	
	$(this).parent().find('li').removeClass('active');
	$(this).addClass('active');
	$('.tab-out-content').removeClass('active');
	$($(this).attr('data-tab')).addClass('active');
	
	$('body').find('.tabs.outdata-dbl').find('li').removeClass('active');
	$('body').find('.tabs.outdata-dbl').find('li[data-tab="'+ $(this).attr('data-tab') +'"]').addClass('active');
	
});
$('body').on('click', '.tabs.outdata-dbl li', function(){
	
	$(this).parent().find('li').removeClass('active');
	$(this).addClass('active');
	
	$('body').find('.tabs.outdata').find('li[data-tab="'+ $(this).attr('data-tab') +'"]').click();
	
	$('html, body').animate({
		   scrollTop: $($(this).attr('data-tab')).offset().top -200 - $(this).parent().outerHeight()
	}, 800);
	
});
$('body').on('click', '.tabs.outdata-sc li, .scroll-y .a', function(){
	
	$('html, body').animate({
		   scrollTop: $($(this).attr('data-tab')).offset().top -50
	}, 800);
	
});
/****/
$('body').on('click', '.tabs ul[data-tabs="select"] li', function(){
	
	_tab = $(this).attr('data-tabid');
	$(this).parents('.content-line').find('.tab-content-data').addClass('hidden');
	$(this).parents('.content-line').find('.tab-content-data').removeClass('fox-fix');
	
	$('body').find(_tab).css({opacity: 0});
	$('body').find(_tab).removeClass('hidden');
	$('body').find(_tab).addClass('fox-fix');
	setTimeout(function(){
		
		$('body').find(_tab).animate({opacity: 1}, 200);
		
	}, 500);
	
	$(this).parent().find('li').removeClass('active');
	$(this).addClass('active');
});
$('body').on('click', '.tabs ul[data-tabs="inpage"] li', function(){
	
	_this_tab = $(this).attr('data-tabid');
	
	$(this).parent().find('li').removeClass('active');
	$(this).addClass('active');
	
	for(var i = 0; i < $(this).parent().find('li').length; i++){		
		_tab = $(this).parent().find('li:eq('+ i +')').attr('data-tabid');
		$('body').find(_tab).addClass('hidden');		
	}
	
	$('body').find(_this_tab).removeClass('hidden');

});
//product images change 
var product_mouse_grid = [],
	time_change_product_image,
	time_reset_product_image = [];
$('body').on('mouseenter', '.product-card .thumb', function(){
	
	if($(window).width() > 680){
		
		var width = $(this).width(),
			max = 6,
			limit = $(this).find('img').length,
			part = 1;
			
		if(limit > max)	
			limit = max;
			
		part = Math.round(width / limit);

		product_mouse_grid = {		
			width: width,
			limit: limit,
			part: part		
		}

	}		

});
$('body').on('mouseleave', '.product-card .thumb', function(){	
	
	if($(window).width() > 680){

		var _this = $(this),
			eq = _this.find('.images-dots span.active').attr('data-eq');
		time_reset_product_image[_this] = setTimeout(function(){
			resetShowImage(_this, eq, 20);
		}, 2);
		
	}
});
function resetShowImage(_this, eq, time){
	
	if($(window).width() > 680){
	
		clearTimeout(time_reset_product_image[_this]);
		time_reset_product_image[_this] = setTimeout(function(){ 
			_this.find('.images-dots span').removeClass('active');
			_this.find('.images-dots span:eq('+ eq +')').addClass('active');
			_this.find('img:eq(0)').attr('src', _this.find('.images-dots span:eq('+ eq +')').attr('data-src'));
			
			eq --;
			
			if(eq > -1)
				resetShowImage(_this, eq, 250)	
			
		}, time);
	
	}
	
}
$('body').on('mousemove', '.product-card .thumb', function (pos) {
	
	if($(window).width() > 680){
	
		var _this = $(this),
			index_data = (pos.offsetX + product_mouse_grid['part']) / product_mouse_grid['part'],
			index = parseInt(index_data, 10),
			eq = 0;
			src = _this.find('img:eq(0)').attr('src');
		
		clearTimeout(time_change_product_image);
		time_change_product_image = setTimeout(function(){
			if(index > product_mouse_grid['limit'])	
				index = product_mouse_grid['limit'];
			
			eq = index -1;
			
			if(eq < 0)
				eq = 0;
			
			_this.find('.images-dots span').removeClass('active');
			_dot_active = _this.find('.images-dots span:eq('+ eq +')');
			_this.find('img:eq(0)').attr('src', _dot_active.attr('data-src'));
			_dot_active.addClass('active'); 
			
		}, 30);
	
	}
});
//showe-more description
$('body').on('click', '.show-more', function(){	

	var _this = $(this);
	
	_function = _this.attr('data-f');
	
	if(_function){
		
		_class = _this.attr('data-class');
		_manufacturer = _this.attr('data-manuf');
		_category = _this.attr('data-category');
		
		_limit = Number( _this.attr('data-limit') );
		_start = Number( _this.attr('data-start') ) + _limit;
		
		$.ajax({
			url: 'index.php?route=common/loader/' + _function,
			type: 'post',
			data: {class: _class, category_id: _category, manufacturer_id: _manufacturer, start: _start, limit: _limit},
			dataType: 'json',
			beforeSend: function() {
				_this.css({opacity: 0.6});
			},
			success: function(json) {	
				
				_this.attr('data-start', (_start + _limit));
				
				if(json['html'])
					_this.parent().find('.categories-box, .categories').append(json['html']);
				
				if(json['stop'])
					_this.attr('data-f', '');
				
				showMore(_this);
				_this.css({opacity: 1});
				
			}
		});
		
		
		
	}else{	
		showMore(_this);
	}
	
});
function showMore(_this){
	
	if(!_this.hasClass('porcions')){
		
		if(_this.parent().find('.text-hidden').hasClass('active')){
			
			_this.parent().find('.text-hidden').removeClass('active');
			_this.find('span').text(_this.find('span').attr('data-text'));
			_this.removeClass('active');
			
			$('html, body').animate({ scrollTop: _this.parent().offset().top -100 },500);
			
		}else{
			
			_this.parent().find('.text-hidden').addClass('active');
			_this.find('span').attr('data-text', _this.find('span').text());
			_this.find('span').text('Скрыть');
			_this.addClass('active');
			
		}
		
	}else{
		
		_box = _this.parent('.content-line').find('.text-hidden');
		
		if(!_this.hasClass('active')){			
			
			_fix = _box.find('.__fix').length;
			_items = _box.find('.item').length;		
			
			for(var i = 0; i < _items; i++){
				
				if(_box.find('.item:eq('+ i +')').hasClass('hidden')){
					
					for(var s = i; s < (i + _fix); s++){
						_box.find('.item:eq('+ s +')').removeClass('hidden');			
					}
					break;
					
				}
				
			}
			
			if(!_box.find('.item.hidden').length){
				
				_this.find('span').attr('data-text', _this.find('span').text());
				_this.find('span').text('Скрыть');
				_this.addClass('active');
				
			}
			
		}else{
			
			_box.find('.item.__hidden').addClass('hidden');
			
			_this.find('span').text(_this.find('span').attr('data-text'));
			_this.removeClass('active');
			
			$('html, body').animate({ scrollTop: _this.parent().offset().top -100 },500);
			
		}
		
		
	}
	
}
$('.show-more.porcions').each(function(){
	
	_box = $(this).parent('.content-line').find('.text-hidden');
	
	if(_box.find('.item.hidden').length)
		$(this).removeClass('hidden');
	
});
$('.open-more').each(function(){
	
	_box = $(this).parent('.content-line').find('.text-hidden');
	
	if(_box.find('.item-hidden').length)
		$(this).removeClass('hidden');
	
});
$('.open-more').click(function(){
	
	_box = $(this).parent('.content-line').find('.text-hidden');
	_this = $(this);
	
	if(_this.hasClass('active')){	
		
		_box.find('.item-hidden').removeClass('active');
		_this.find('span').text(_this.find('span').attr('data-text'));
		_this.removeClass('active');
		
		$('html, body').animate({ scrollTop: _box.offset().top -100 },500);
	
	}else{
		
		_box.find('.item-hidden').addClass('active');
		_this.find('span').attr('data-text', _this.find('span').text());
		_this.find('span').text('Скрыть');
		_this.addClass('active');
		
		
	}
	
});
//select design in line
$( "select.ppa-select-line" ).each(function( index ) {
	selectLine($(this), index);		
});

function selectLine(_this, index){
	
	if($(window).width() > 767 && !_this.parent().find('.select-disegn-line').length){
		_html = '<div class="select-disegn-line" data-index="'+ index +'">';
		
		for(var i = 0; i < _this.find('option').length; i++){
			
			if( _this.find('option:eq('+ i +')').is(':selected') )
				_class = 'item-line active';
			else
				_class = 'item-line';
			
			_html += '<span class="'+ _class +'" data-option="'+ i +'" data-value="'+ _this.find('option:eq('+ i +')').attr('value') +'">';
			_html += _this.find('option:eq('+ i +')').text();
			_html += '</span>';
			
		}
		
		_html += '</div>';
		
		_this.after(_html);
		
	}else if(!_this.parent().find('.select-disegn-line').length){
		
		_html = '<div class="select-disegn-line">';
		
		for(var i = 0; i < _this.find('option').length; i++){
			
			if( _this.find('option:eq('+ i +')').is(':selected') ){
				
				_html += '<span data-select="'+ index +'" class="item-line active" data-option="'+ i +'" data-value="'+ _this.find('option:eq('+ i +')').attr('value') +'">';
				_html += _this.find('option:eq('+ i +')').text();
				_html += '</span>';
				
			}
			
		}
		
		_html += '</div>';
		
		_this.after(_html);
		
		_html = '<div id="mobi-select-'+ index +'" class="select-disegn-line mobi" data-index="'+ index +'">';
		
		_html += '<div class="menu">';
		_html += '<div class="select">';
		_html += '<i class="breadcrumbs__icon icon-chevron up"></i>';
		_html += '<i class="breadcrumbs__icon icon-chevron down"></i>';		
		_html += '</div>';
		_html += '<div class="action">';
		_html += 'Готово';
		_html += '</div>';
		_html += '</div>';
		
		for(var i = 0; i < _this.find('option').length; i++){
			
			if( _this.find('option:eq('+ i +')').is(':selected') )
				_class = 'item-line active';
			else
				_class = 'item-line';
			
			_html += '<div class="'+ _class +'" data-option="'+ i +'" data-value="'+ _this.find('option:eq('+ i +')').attr('value') +'">';
			_html += '<span>' + _this.find('option:eq('+ i +')').text() + '</span>';
			_html += '</div>';
			
		}
		

		_html += '</div>';
		
		$('body').append(_html);
	}
	
	
	_this.addClass('hidden');
	
	
}


$('body').on('click', '.select-disegn-line .menu .select i', function(){	

	_active = $(this).parents('.select-disegn-line').find('.item-line.active').index() -1;
	_items = $(this).parents('.select-disegn-line').find('.item-line').length;
	
	if($(this).hasClass('up')){	
		_active --;
	}else{
		_active ++;		
	}
	
	if(_active < 0)
		_active = _items -1;
	
	if(_active >= _items)
		_active = 0;
	
	$(this).parents('.select-disegn-line').find('.item-line').removeClass('active');
	$(this).parents('.select-disegn-line').find('.item-line:eq('+ _active +')').addClass('active');
	

});
$('body').on('click', '.select-disegn-line .menu .action', function(){	
	
	_select = $('body').find('select.ppa-select-line:eq('+ $(this).parents('.select-disegn-line').attr('data-index') +')');
	_option = _select.find('option:eq('+ $(this).parents('.select-disegn-line').find('.item-line.active').attr('data-option') +')');
	
	if(!_option.is(':selected')){
		
		_option.prop("selected", true);
		_select.change();
		
	}
	
	$(this).parents('.select-disegn-line').removeClass('active');
	
});
$('body').on('click', '.select-disegn-line .item-line', function(){	
	
	_show_mobi = $(this).attr('data-select');
	
	if(!_show_mobi){
		_select = $('body').find('select.ppa-select-line:eq('+ $(this).parent().attr('data-index') +')');
		_option = _select.find('option:eq('+ $(this).attr('data-option') +')');
		
		if(!_option.is(':selected')){
			
			_option.prop("selected", true);
			_select.change();
			
		}
		
		$(this).parents('.select-disegn-line').removeClass('active');
	}else{
		
		if($('body').find('#mobi-select-'+ _show_mobi +'').hasClass('active'))
			$('body').find('#mobi-select-'+ _show_mobi +'').removeClass('active');
		else
			$('body').find('#mobi-select-'+ _show_mobi +'').addClass('active');
		
	}
	
});
$(document).mouseup(function (e){ 
		var div = $('body').find('.select-disegn-line.mobi, .boolean'); 
		if (!div.is(e.target) && div.has(e.target).length === 0) { 
			div.removeClass('active');
		}
});
//select design
var selectBody;

$( "select.ppa-select" ).each(function( index ) {  
	 selectOptions($(this), index);  
});
$('body').on('mouseenter', '.select-disegn.err', function(){	
	$(this).removeClass('err');	
});

$('body').on('mouseenter', '.select-body', function(){	
	
	clearTimeout(selectBody);
	$('body').find('.select-disegn .select-body').removeClass('_shb');
	
	if($(this).find('.select-item').length > 1){
		
		var _this = $(this);
		
		selectBody = setTimeout(function(){
			
			_this.addClass('_shb');
			
		}, 300);
		
	}
	
});


function selectOptions(_this, index){
	
	_html = '<div class="select-disegn">';
	_html += '<div class="select-body'+ ( (_this.find('option').length > 1) ? ' _icon' : '' ) +'"  data-index="'+ index +'">';
		
	_selected = $('body').find('select.ppa-select:eq('+ index +')').find('option:selected');
	
	_html += '<div data-option="'+ _selected.index() +'" data-value="'+ _selected.attr('value') +'" class="select-item">'+ _selected.text() +'</div>';
	
	for(var i = 0; i < _this.find('option').length; i++){
		
		if(!_this.find('option:eq('+ i +')').is(':selected'))
			_html += '<div data-option="'+ i +'" data-value="'+ _this.find('option:eq('+ i +')').attr('value') +'" class="select-item">'+ _this.find('option:eq('+ i +')').text() +'</div>';
		
	}	
	_html += '</div>';
	_html += '</div>';
	
	_this.after(_html);
	_this.addClass('hidden');
	
}
$('body').on('change', "select.ppa-select", function(){
	
	resortOptionsD($(this));
	
});
function resortOptionsD(_this){
	_value = _this.val();
	_html = '';
	
	if(_this.find('option:selected').is(':disabled')){
		for(var i = 0; i < _this.find('option').length; i++){
			
			if(!_this.find('option:eq('+ i +')').is(':disabled')){
				_this.find('option:eq('+ i +')').prop('selected', true);
			}
			
		}
	}
		
	
	for(var i = 0; i < _this.find('option').length; i++){
		if(!_this.find('option:eq('+ i +')').is(":disabled"))
			_html += '<div data-option="'+ i +'" data-value="'+ _this.find('option:eq('+ i +')').attr('value') +'" class="select-item">'+ _this.find('option:eq('+ i +')').text() +'</div>';	
	}

	_this.parent().find('.select-disegn .select-body').html(_html);
	
	_this.parent().find('.select-disegn .select-body').find('.select-item[data-value="'+ _value +'"]').prependTo( _this.parent().find('.select-disegn .select-body') );
}
$('body').on('click', '.select-disegn .select-body .select-item', function(){	
	
	if(!$(this).hasClass('disabled')){
	
		_select = $('body').find('select.ppa-select:eq('+ $(this).parent().attr('data-index') +')');
		_option = _select.find('option:eq('+ $(this).attr('data-option') +')');
		
		if(!_option.is(':selected')){
			
			_option.prop("selected", true);
			_select.change();
			
		}
	}
	
});
$(document).mouseup(function (e){ 
		var div = $('body').find('.select-disegn .select-body'); 
		if (!div.is(e.target) && div.has(e.target).length === 0) { 
			div.parent().removeClass('select');
			div.removeClass('active');
			div.scrollTop(0);
		}
});
$('body').on('mouseleave', '.select-disegn .select-body', function(){$(this).scrollTop(0);});
//pagination search
$('body').on('input', '.pagination-search input', function(){
	
	$(this).val( $(this).val().replace(/[^\d;]/g, '') );
	
	if(Number( $(this).val() ) > Number( $(this).attr('data-pages') ))
		$(this).val( $(this).attr('data-pages') );
	
});
$('body').on('click', '.pagination-search button', function(){
	
	page = $('body').find('.pagination-search input').val();
	loc = $(this).attr('data-loc');
	
	if(page){
	
		if(page < 2){
			loc = loc.replace('&page={page}', '');
			loc = loc.replace('?page={page}', '');
		}else{
			loc = loc.replace('{page}', page);
		}
		
		//ajax-page
		if (typeof ayaxPage == 'function') {			
			href = loc + '&get_json=true&get_page=true';
			ayaxPage(href, loc);		
		} else {
			location = loc;
		}
		//
		//location = loc;	
		
	}
	
});
/*$('body').find('.pagination').each(function(){	
	fixPagination($(this));
});*/
function fixPagination(_this){
	
	if($(window).width() < 768){
		
		_this.find('li.page').addClass('hidden');
		
		_page_index = _this.find('li.active').index();
		_pages = _this.find('li').length -1;
		_last = _this.attr('data-pages');
		
		_prev = _page_index -1;
		_next = _page_index +1;
		
			
		_this.find('li:eq('+ _prev +')').removeClass('hidden');
		_this.find('li:eq('+ _page_index +')').removeClass('hidden');
		_this.find('li:eq('+ _next +')').removeClass('hidden');
		
		if(_page_index == 0){	
			_this.find('li:eq('+ ( _next +1 )  +')').removeClass('hidden');
		}
		if(_page_index == _pages){	
			_this.find('li:eq('+ ( _prev -1 )  +')').removeClass('hidden');
		}
		
		if(_page_index < 5 && _page_index > 1){	
			_this.find('li:eq(0)').before('<li><a href="/'+ window.location.pathname.substr(1) +'?page=1">1</a></li>');		
		}
		if(_page_index > 2 && _page_index < 5){
			_this.find('li:eq(0)').after('<li><span>...</span></li>');
		}
		
		if(!_this.find('li.last').length){
			_this.find('li:eq('+ _next +')').after('<li><span>...</span></li><li><a href="/'+ window.location.pathname.substr(1) +'?page='+ _last +'">'+ _last +'</a></li>');
		}

	}
	
}
//global functions
var objects = {
	
	'size': function(obj){
		
		if(obj.length){
			var outerHeight = Number( obj.css('padding-top').replace(/[^0-9]/g,"") ) + Number( obj.css('padding-bottom').replace(/[^0-9]/g,"") ) + Number( obj.css('margin-top').replace(/[^0-9]/g,"") ) + Number( obj.css('margin-bottom').replace(/[^0-9]/g,"") ) + obj.height(),
				height = obj.height(),
				outerWidth = Number( obj.css('padding-left').replace(/[^0-9]/g,"") ) + Number( obj.css('padding-right').replace(/[^0-9]/g,"") ) + Number( obj.css('margin-left').replace(/[^0-9]/g,"") ) + Number( obj.css('margin-right').replace(/[^0-9]/g,"") ) + obj.width(),
				width = obj.width(),
				mTop = Number( obj.css('margin-top').replace(/[^0-9]/g,"") ),
				mBottom = Number( obj.css('margin-bottom').replace(/[^0-9]/g,"") ),
				mLeft = Number( obj.css('margin-left').replace(/[^0-9]/g,"") ),
				mRight = Number( obj.css('margin-right').replace(/[^0-9]/g,"") );
		
			return {outerHeight: outerHeight, height: height, outerWidth: outerWidth, width: width, mTop: mTop, mBottom: mBottom, mLeft: mLeft, mRight: mRight};
		}else{
			return {outerHeight: 0, height: 0, outerWidth: 0, width: 0, mTop: 0, mBottom: 0, mLeft: 0, mRight: 0};
		}
		
	}
	
}
//load popup view
var popup_pages = [];
var _titles;
var _files;
var _sub_title = false;
function load_popup_viwer(content, index, pages, titles, files, sub_title = false){
	
	if(sub_title)
		_sub_title = sub_title;
	
	_titles = titles;
	_files = files;
	
	if(!content && pages[index]){		
		content = pages[index];
		title = titles[index];
		file = files[index];
		popup_pages = pages;
	}else{
		title = titles;		
		file = files;		
	}
	
	var html = '<div class="popup-full">';
			html += '	<div class="popup-full-close"></div>';
			html += '	<button class="close"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30"></path></svg></button>';
			
			if(pages.length > 1){
				
				_next = Number(index) + 1;
				_prev = Number(index) - 1;
				
				if(_next > (pages.length -1))
					_next = 0;
				
				if(_prev < 0)
					_prev = (pages.length -1);
				
				
				
				html += '	<div class="pages">'+ (Number(index) +1) + '/' + pages.length +'</div>';
				html += '	<button class="nav prev" data-index="'+ _prev +'"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>';
				html += '	<button class="nav next" data-index="'+ _next +'"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>';
				
			}			
			
			html += '	<div class="content">';
			
			if(title){
				html += '<div class="menu">';
				html += '<div class="title">' + title + '</div>';
				
				html += '<div class="_btns">';
				html += '<div class="download _btn" data-file="'+ file +'"><i class="icon-download"></i></div>';
				html += '<div class="print _btn" data-file="'+ file +'"><i class="icon-print"></i></div>';
				html += '</div>';
				
				html += '</div>';
			}
			
			html += content
			html += '	</div>';
			
			if(sub_title){
				html += '<div class="popup-sub-title">' + sub_title + '</div>';
			}
			
			html += '</div>';
		
		$('body').find('.popup-full').remove();
		$('body').append(html);
		$('body').css({overflow: 'hidden'});
	
	
}
$('body').on('click', '.popup-full .print', function(){
	
		document.getElementById('fancybox-frame1559036120851').contentWindow.print();
	
});
$('body').on('click', '.popup-full .download', function(){
	
		var file = $(this).attr('data-file');
		
		if(!file)
			return false;
		
		var _this = $(this);
		var _thisText = $(this).parents('.menu').find('.title').text();
		_thisText = _thisText.replace(/ /g,"_");
		
		location = "/index.php?route=information/posts/download&file=" + file + '&filename=' + _thisText;
	
});
$('body').on('click', '.popup-full button.nav', function(){
	
	load_popup_viwer(false, $(this).attr('data-index'), popup_pages, _titles, _files, _sub_title);
	
});
$('body').on('click', '.popup-full .popup-full-close, .popup-full button.close', function(){
	if(!$('body').find('.popup-full').hasClass('static')){
		$('body').find('.popup-full').remove();		
		popup_pages = [];
	}else{
		$('body').find('.popup-full').addClass('hidden');
	}
	$('body').css({overflow: ''});
});
$('body .popup-full').on("DOMNodeInserted", function (event) { console.log('-----------'); });
//boolean
var show_boolean;
$('body').on('click', '.unit-p .boolean, .product-images .boolean, .annotation .boolean', function(){
	
	var _this = $(this);
		
	var _alt = _this.attr('alt');
		
	if(!_alt)
		_alt = _this.attr('data-alt');
	
	_title = _this.parent().parent().text();
	
	StopshowBoolean();
	$('body').find('.boolean-block').remove();
	
	if($(window).width() > 767 && !_this.hasClass('stop')){
		
		_this.addClass('stop');
	
		show_boolean = setTimeout(function() {	

			_html = '<div id="type-boolean" class="popup-full boolean-block hidden">';
			_html += '<div class="popup-full-close"></div>';
			_html += '<div class="form" style="width: 900px;">';
			_html += '<div class="title"></div>';
			_html += '<div class="boolean-text"></div>';
			_html += '<div class="g-close close-btn" onClick="$(\'body\').find(\'#type-boolean\').remove();">';
			_html += '<svg viewBox="0 0 16 16" width="15" height="15">';
			_html += '<path d="M9.3 8l6.7 6.7-1.3 1.3L8 9.3 1.3 16 0 14.7 6.7 8 0 1.3 1.3 0 8 6.7 14.7 0 16 1.3 9.3 8z"></path>';
			_html += '</svg>';
			_html += '</div>';
			_html += '</div>';
			_html += '/div>';
			
			$('body').append(_html);	
				$('body').find('.boolean-block').find('.title').html(_title);	
				$('body').find('.boolean-block').find('.boolean-text').html(_alt);	
				$('body').find('.boolean-block').removeClass('hidden');
				_this.removeClass('stop');
		
		}, 1);
		
	}else{
		

		_height = $(window).height() - 80;
		
		$('body').find('.select-disegn-line.boolean').remove();
		
		_html = '<div class="select-disegn-line mobi boolean">';
		
		_html += '<div class="menu">';
		_html += '<div class="select">'+ _title +'</div>';
		_html += '<div class="close">';
		_html += '<svg viewBox="0 0 16 16" width="15" height="15"><path d="M9.3 8l6.7 6.7-1.3 1.3L8 9.3 1.3 16 0 14.7 6.7 8 0 1.3 1.3 0 8 6.7 14.7 0 16 1.3 9.3 8z"></path></svg>';
		_html += '</div>';
		_html += '</div>';				
		_html += '<div class="text"><div class="scroll-box" style="max-height: '+ _height +'px">'+ _alt +'</div></div>';
		_html += '</div>';
		
		$('body').append(_html);
		
		show_boolean = setTimeout(function() {
			$('body').find('.select-disegn-line.boolean').addClass('active');
		}, 200);
		
	}
	
});
$('body').on('mouseout', '.unit-p .boolean, .product-images .boolean, .annotation .boolean', function(){
	$(this).parent().find('.ppa-boolean').remove();
	StopshowBoolean();
});
$('body').on('click', '.select-disegn-line.boolean .close', function(){
	$(this).parents('.select-disegn-line').removeClass('active');
});
function StopshowBoolean() {
  clearTimeout(show_boolean);
}
//add design and error buttons
$(document).on('keydown',function (event) {
    if (event.ctrlKey && event.shiftKey && event.key=='*') {
		$('body').animate({
			'opacity': 0.1,
		}, 500);
         $.ajax({
			url: 'index.php?route=tool/set_theme/development',
			success: function(json) {
				location.reload();
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});	 
    }
});
function set_oldDesign(theme){
	
	$('body').addClass('blur');
	
	$.ajax({
		url: 'index.php?route=tool/set_theme&theme=' + theme,
		success: function(json) {
			location.reload();
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
		}
	});	
}

//
$('.slick-list').each(function(){	
	var _this = $(this);
	if(_this.find('.product-card').length)
		_this.css({height: _this.height() + 3});	
});
$('body').on('mouseover', '.slick-list .slick-slide div', function(){
	
	if($(this).hasClass('product-card')){	
		$(this).parents('.slick-list').css({overflow: 'visible', height: $(this).parents('.slick-list').height()});
		$(this).parents('.slick-list').find('.slick-slide').css({transform: 'scale(0)'});
		$(this).parents('.slick-list').find('.slick-slide.slick-active').css({transform: 'scale(1)'});
	}
	
});
$('body').on('mouseleave', '.slick-list .slick-slide div', function(){
	$(this).parents('.slick-list').css({overflow: ''});
	$(this).parents('.slick-list').find('.slick-slide').css({transform: ''});
});

//LAZY
var lazy_time;
$('body').on('mouseover', '[data-lazy]', function(){
	if($(this).attr('data-src'))
		$(this).attr('data-src', $(this).attr('data-lazy'));	
	else
		$(this).attr('src', $(this).attr('data-lazy'));	
});
$('body').on("DOMNodeInserted", function (event) { 
	clearTimeout(lazy_time);
	lazy_time = setTimeout(function(){ lazyPpa(); }, 300);
});
$(document).ready(function(){ lazyPpa(); });
function lazyPpa(){	
	var lazy_langth = $('body').find('[data-lazy]').length;	
	for(var i = 0; i < lazy_langth; i++){
		if($('body').find('[data-lazy]:eq('+ i +')').attr('data-src'))
			$('body').find('[data-lazy]:eq('+ i +')').attr('data-src', $('body').find('[data-lazy]:eq('+ i +')').attr('data-lazy'));
		else
			$('body').find('[data-lazy]:eq('+ i +')').attr('src', $('body').find('[data-lazy]:eq('+ i +')').attr('data-lazy'));			
		
	}	
}
//more
$('body').on('click', '.more-show button', function(){
	
	var _object = $(this).attr('data-object');
	
	$(this).parent().find('button').removeClass('hidden');
	$(this).addClass('hidden');
	
	if($(this).hasClass('_show_')){
		
		$(_object).removeClass('hidden');
		
	}else{
		
		$(_object).addClass('hidden');
		
		$('html, body').animate({
		   scrollTop: $(this).parent().parent().offset().top -100
		}, 800);
		
	} 
	
});
//Configurator
$('body').on('click', '[data-config]', function(){
	
	var series_group_id = $(this).attr('data-config'); 
	
	$.ajax({
		url: 'index.php?route=product/configurator',
		type: 'post',
		data: {series_group_id: series_group_id},
		dataType: 'json',
		success: function(json) {	
			
			if(json['html']){
				
				$('body').find('.popup-full').remove();
				$('body').append(json['html']);				
				
			}
				
			
		}
	});
	
	
}); 
//Anchor
$(document).ready(function(){
	
	var anchor_length = $('.content-box.text-content').find('[data-anchor]').length,
		html = '';
	
	if(anchor_length){
		html += '<div class="menu-box categories-menu sticky menu">';
		html += '<div class="menu-title">Оглавление</div>';
		html += '	<ul class="list-link anchors">';
		
		for(var a = 0; a < anchor_length; a++){
			html += '<li class="list-icon">';		  
			html += '	<span data-anchor-link="'+ a +'">'+ $('.content-box.text-content').find('[data-anchor]:eq('+ a +')').attr('data-anchor') +'</span>';
			html += '</li>';
			$('.content-box.text-content').find('[data-anchor]:eq('+ a +')').attr('data-anchor', a);
		}
		
		html += '	</ul>';
		html += '</div>';
	}
	
	$('#column-left').append(html);
	
});
$('body').on('click', '[data-anchor-link]', function(){
	
	$('html,body').scrollTop( $('[data-anchor="'+ $(this).attr('data-anchor-link') +'"]').offset().top -150 );
	$(this).parents('.list-link').find('li').removeClass('active');
	$(this).parent().addClass('active');
	
});
//Images in text
$(document).ready(function(){
	
	var image_length = $('.content-box.text-content').find('img').length;
	
	for(var i = 0; i < image_length; i++){
		
		_text = $('.content-box.text-content').find('img:eq('+ i +')').parent().text().trim();
		
		console.log($('.content-box.text-content').find('img:eq('+ i +')').parent().prop("tagName"))
		
		if(_text && $('.content-box.text-content').find('img:eq('+ i +')').parent().prop("tagName") == 'P'){ 
			$('.content-box.text-content').find('img:eq('+ i +')').css({'margin': '0', 'vertical-align': 'middle'});
		}
		
	}
	
});
//location click
var slocTime;
//$('[data-sloc]').mouseup(function(e) {
$('body').on('mouseup', '[data-sloc]', function(e) {

	var href = $(this).attr('data-sloc'),
		_this = true;
		
	$(document).on('keydown',function (event) {
		if (event.ctrlKey) {						
			_this = false;
		}
	});	
	
	e.preventDefault();
	
	clearTimeout(slocTime);
	
	slocTime = setTimeout(function(){
		switch (e.button) {
			case 0:				
				if(_this)
					location = href;
				else
					window.open(href, '_blank');
			  break;
			case 1:
			   window.open(href, '_blank');
			  break;
			case 2:
			   //console.log("Right button clicked.");
			  break;
			default:
			   //console.log(`Unknown button code: ${e.button}`);
		}
	}, 200); 
  
});

/*
e.preventDefault();
	
	var button = document.querySelector('#' + $(this).attr('id')),
		href = $(this).attr('data-sloc');
	
	button.addEventListener("mouseup", (e) => {

	  switch (e.button) {
		case 0:
		  location = href;
		  break;
		case 1:
		   window.open(href, '_blank');
		  break;
		case 2:
		   //console.log("Right button clicked.");
		  break;
		default:
		   //console.log(`Unknown button code: ${e.button}`);
	  }
	  
	});
*/

//EMPTY OLD FUNCTIONS
function ph_animate_detect(){}
function get_data_catalog_menu(){}
function StopAllAnimateText(){}

/*-----------*/
/*
console.log($(window).scrollTop())

if($(window).scrollTop() > 200){
	
	
	
	var _item = $('#ocf-filter-1-0-1'),
		sticky_filter,
		_parent = _item.attr('id');
	
	
	$('.ocf-container').after('<div id="sticky-filter" class="menu-box ocf-theme-light" style=""></div>');
	sticky_filter = $('body').find('#sticky-filter');
	
	_item.clone().addClass('filter-cloned').attr('id', _parent + '-clone').attr('data-parent', _parent).appendTo(sticky_filter);
	
}

$('body').on('click', '.filter-cloned button', function(){
	
	
	
	var _this = $(this),
		_index = _this.index(),
		_parent = _this.parents('.filter-cloned').attr('data-parent'),
		_button = $('body').find('#' + _parent).find('button:eq('+ _index +')');
	
	_button.click();	
	
	if(_this.hasClass('ocf-selected'))
		_this.removeClass('ocf-selected');
	else
		_this.addClass('ocf-selected');
	
	
});
*/