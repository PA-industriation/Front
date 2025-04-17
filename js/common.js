function getURLVar(key) {
	var value = [];

	var query = document.location.search.split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}

$(document).ready(function() {
	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().parent();

		if (element.hasClass('form-group')) {
			element.addClass('has-error');
		}
	});

	// Currency
	$('#form-currency .currency-select').on('click', function(e) {
		e.preventDefault();

		$('#form-currency input[name=\'code\']').val($(this).attr('name'));

		$('#form-currency').submit();
	});

	// Language
	$('#form-language .language-select').on('click', function(e) {
		e.preventDefault();

		$('#form-language input[name=\'code\']').val($(this).attr('name'));

		$('#form-language').submit();
	});

	$('.mobile-search').click(function(){

		if($('#search').hasClass('active')){
			$('#search').removeClass('active');
			$('#search').hide(200);
		}else{
			var _top = $('header').height() +3;
			$('#search').css({top: _top})
			$('#search').addClass('active');
			$('#search').show(200);
		}
		
	});
	
	jQuery(function($){
		$(document).mouseup(function (e){ 
			var div = $("#search, .mobile-search");
			if (!div.is(e.target) && div.has(e.target).length === 0) {
				
				/*if($(window).width() < 768){
					$('#search').removeClass('active');
					$('#search').hide(200);
				}*/
				$('#search').find('.search-auto').remove();
				$('#search_header_input').removeClass('aus-result');
			}
		});
	});

	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 10) + 'px');
		}
	});

	// Product List
	$('#list-view').click(function() {
		$('#content .product-grid > .clearfix').remove();

		$('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
		$('#grid-view').removeClass('active');
		$('#list-view').addClass('active');

		localStorage.setItem('display', 'list');
	});

	// Product Grid
	$('#grid-view').click(function() {
		// What a shame bootstrap does not take into account dynamically loaded columns
		var cols = $('#column-right, #column-left').length;

		if (cols == 2) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
		} else if (cols == 1) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
		} else {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
		}

		$('#list-view').removeClass('active');
		$('#grid-view').addClass('active');

		localStorage.setItem('display', 'grid');
	});

	if (localStorage.getItem('display') == 'list') {
		$('#list-view').trigger('click');
		$('#list-view').addClass('active');
	} else {
		$('#grid-view').trigger('click');
		$('#grid-view').addClass('active');
	}

	// Checkout
	$(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
		if (e.keyCode == 13) {
			$('#collapse-checkout-option #button-login').trigger('click');
		}
	});

	// tooltips on hover
	//$('[data-toggle=\'tooltip\']').tooltip({container: 'body',trigger: 'hover'});

	// Makes tooltips work on ajax generated content
	$(document).ajaxStop(function() {
		//$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	});
});

// Cart add remove functions 
//cart update
function cart_ppaupdate(cart_id, product_id, _quantity){
	
	$.ajax({
		url: 'index.php?route=checkout/cart/ppaupdate',
		type: 'post',
		data: {quantity: _quantity, cart_id: cart_id, product_id: product_id},
		dataType: 'json',
		success: function(json) {
			$('body').find('.presents-box').load('index.php?route=promo/presents/update');	
			$('#cart-item > .items-utins_box').load('index.php?route=common/cart/info .items-utins_box .units-box');	
			$('body').find('.free-shipping-update').load('index.php?route=common/cart/freeShippingUpdate');					
			$('body').find('.popup-full .form.relative .totals-box .total').html(json['totals_text']);		

			//Ecommerce
			if(json['ecommerce'] != 0){						
				ymEcommerce(json['ecommerce']);						
			}
			
		}
	});
}
var cart = {
	'add': function(product_id, quantity, _this) {
		
		var _get_relative = 0;
		
		if(!_this){
			var __add = true;
		}else{
			
			if(!_this.hasClass('button_in_cart'))
				var __add = true;
			else
				var __add = false;

		}
	
		
		if(__add){
			$.ajax({
				url: 'index.php?route=checkout/cart/add',
				type: 'post',
				data: '_get_relative='+ _get_relative +'&product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
				dataType: 'json',
				beforeSend: function() {
					//$('#cart > button').button('loading');
				},
				complete: function() {
					//$('#cart > button').button('reset');
				},
				success: function(json) {
					
					if(json['totals_text'])
						$('body').find('.popup-full .form.relative .totals-box .total').html(json['totals_text']);
					
					$('.alert, .text-danger').remove();

					if (json['redirect']) {
						location = json['redirect'];
					}

					if (json['success']) {

						// Need to set timeout otherwise it wont update the total
						setTimeout(function () {
							$('.cart-box').find('.total').html('');
							$('.cart-box').find('.total').removeClass('active');
							if(json['total'] > 0){
								$('.cart-box').find('.total').html(json['count_total']);
								$('.cart-box').find('.total').addClass('active');
								$('.cart-box').find('.dropped').removeClass('hidden');
								$('.cart-box').addClass('drop-box');
							}else{
								$('.cart-box').find('.dropped').addClass('hidden');
								$('.cart-box').removeClass('drop-box');
							}
							
						}, 100);

						$('.cart-box > .items-utins_box').load('index.php?route=common/cart/info .items-utins_box .units-box');
						$('body').find('.free-shipping-update').load('index.php?route=common/cart/freeShippingUpdate');
						$('body').find('.presents-box').load('index.php?route=promo/presents/update');	
						
						///_get_relative
						if(json['popup'])
							$('body').append(json['popup']);
						//////////////
						
						if(_this){
								
							/*КНОПКИ ПРОДУКТОВ*/
							cart.configButton(_this, product_id, 'add');
							
						}
						
						
						
					}
					
					//Ecommerce
					if(json['ecommerce'] != 0){						
						ymEcommerce(json['ecommerce']);						
					}
					
					
					
				},
				error: function(xhr, ajaxOptions, thrownError) {
					alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
				}
			});
		
		}else{
			
			if(_this && _this.hasClass('button_in_cart'))
				location = '/index.php?route=checkout/cart';	
			
		}
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				//$('#cart > button').button('loading');
			},
			complete: function() {
				//$('#cart > button').button('reset');
			},
			success: function(json) {
				
				//console.log(json);
				
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('.cart-box').find('.total').html('');
					$('.cart-box').find('.total').removeClass('active');
					if(json['total'] > 0){
						$('.cart-box').find('.total').html(json['count_total']);
						$('.cart-box').find('.total').addClass('active');
						$('.cart-box').find('.dropped').removeClass('hidden');
						$('.cart-box').addClass('drop-box');
					}else{
						$('.cart-box').find('.dropped').addClass('hidden');
						$('.cart-box').removeClass('drop-box');
					}
					
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('.cart-box > .items-utins_box').load('index.php?route=common/cart/info .items-utins_box .units-box');
					$('body').find('.free-shipping-update').load('index.php?route=common/cart/freeShippingUpdate');
					$('body').find('.presents-box').load('index.php?route=promo/presents/update');	
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(key, redirect, product_id, _this) {
		
		redirect = typeof redirect !== 'undefined' ? redirect : true;
		product_id = typeof product_id !== 'undefined' ? product_id : false;
		_this = typeof _this !== 'undefined' ? _this : false;
		
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				//$('#cart > button').button('loading');
			},
			complete: function() {
				//$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('.cart-box').find('.total').html('');
					$('.cart-box').find('.total').removeClass('active');
					if(json['total'] > 0){
						$('.cart-box').find('.total').html(json['count_total']);
						$('.cart-box').find('.total').addClass('active');
						$('.cart-box').find('.dropped').removeClass('hidden');
						$('.cart-box').addClass('drop-box');
					}else{
						$('.cart-box').find('.dropped').addClass('hidden');
						$('.cart-box').removeClass('drop-box');
					}
					
				}, 100);
				
				var now_location = String(document.location.pathname);

				if ((now_location == '/cart/') && redirect || (now_location == '/checkout/') && redirect || (getURLVar('route') == 'checkout/cart') && redirect || (getURLVar('route') == 'checkout/checkout') && redirect) {
					location = 'index.php?route=checkout/cart';
				} else {
					$('.cart-box > .items-utins_box').load('index.php?route=common/cart/info .items-utins_box .units-box');
					$('body').find('.free-shipping-update').load('index.php?route=common/cart/freeShippingUpdate');
					$('body').find('.presents-box').load('index.php?route=promo/presents/update');
				}
				
				
					
					
				/*КНОПКИ ПРОДУКТОВ*/
				cart.configButton(_this, product_id, 'remove');
				//_this.parent('.cart-button-box').removeClass('button_in_cart');
				//_this.parent('.cart-button-box').find('button').removeClass('button_in_cart');
				//_this.parent('.cart-button-box').find('button img').attr('src', '/image/bn-icons/shopping-cart.png');
					
			
				
				if(json['totals_text'])
						$('body').find('.popup-full .form.relative .totals-box .total').html(json['totals_text']);
				
				if(product_id){
					
					$('body').find('.product-'+ product_id).find('.button_in_cart').removeClass('hidden');
					//$('body').find('.product-'+ product_id).find('.product-quantity-box ').addClass('hidden');
					
					$('body').find('.product-' + product_id).find('button.button_in_cart').text('В корзину');
					$('body').find('.product-' + product_id).find('button.button_in_cart').removeClass('button_in_cart');
					
					$('body').find('.product-up-data .buttons-box button.button_in_cart').text('В корзину');
					$('body').find('.product-up-data .buttons-box button.button_in_cart').removeClass('button_in_cart');
					
					$('body').find('#button-cart, #button-cart2, #button-cart3').text('Добавить в корзину');
					$('body').find('#button-cart, #button-cart2, #button-cart3').removeClass('button_in_cart');

					
					$('body').find('#ppacheckout-2').find('#catr-product-' + product_id).find('.delete-product').click();
					
				}
				
				//Ecommerce
				if(json['ecommerce'] != 0){						
					ymEcommerce(json['ecommerce']);						
				}
				
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'configButton': function(_this, product_id, action){
		
		if($('body').find('.product-' + product_id).find('button.cart').length){
			_grid_button = $('body').find('.product-' + product_id).find('button.cart');
			_onclick = _grid_button.attr('onclick');
			
			if(action == 'add'){
				
				_grid_button.addClass('button_in_cart');
				_grid_button.text('В корзине');
				
				_onclick = _onclick.replace('price_list_add_to_cart', 'price_list_move_to_cart');
				_onclick = _onclick.replace('noprice_list_add_to_cart', 'noprice_list_move_to_cart');
				
				
			}else if(action == 'remove'){
				
				_grid_button.removeClass('button_in_cart');
				_grid_button.text('В корзину');
				
				_onclick = _onclick.replace('price_list_move_to_cart', 'price_list_add_to_cart');
				_onclick = _onclick.replace('noprice_list_move_to_cart', 'noprice_list_add_to_cart');
				
			}
			
			_grid_button.attr('onclick', _onclick);
		}
		
		if($('body').find('button[data-product="'+ product_id +'"]').length){
			
			_prod_button = $('body').find('button[data-product="'+ product_id +'"]');
			
			_p_onclick = _prod_button.attr('onclick');
			
			if(action == 'add'){
				
				_p_onclick = _p_onclick.replace('price_prod_add_to_cart', 'price_prod_move_to_cart');
				_p_onclick = _p_onclick.replace('noprice_prod_add_to_cart', 'noprice_prod_move_to_cart');
				
			}else{
				
				_p_onclick = _p_onclick.replace('price_prod_move_to_cart', 'price_prod_add_to_cart');
				_p_onclick = _p_onclick.replace('noprice_prod_move_to_cart', 'noprice_prod_add_to_cart');
				
			}
			
			_prod_button.attr('onclick', _p_onclick);
			
		}
		
	}
}

var voucher = {
	'add': function() {

	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				//$('#cart > button').button('loading');
			},
			complete: function() {
				//$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				
				if (json['wishlist_data']) {
					$('#favorite-item .wishlist-data').html(json['wishlist_data']['html']);
					$('#favorite-item').addClass('drop-box');
					
					if(json['wishlist_data']['products_wishlist'][product_id]){						
						$('body').find('.product-' + product_id).find('button.wishlist').addClass('active');
						$('body').find('.product-' + product_id).find('button.wishlist').attr('onclick', 'wishlist.remove(\''+ product_id +'\');');
						
	
						$('body').find('#product-compare-wishlist-' + product_id + ' .wishlist span').text('В избранном');		
						$('body').find('#product-compare-wishlist-' + product_id + ' .wishlist').addClass('active');		
						$('body').find('#product-compare-wishlist-' + product_id + ' .wishlist').attr('onclick', 'wishlist.remove(\''+ product_id +'\');');	
						
						$('body').find('.cart-product.product-'+ product_id +' .favorite').text('В избранном');		
						$('body').find('.cart-product.product-'+ product_id +' .favorite').attr('onclick', 'wishlist.remove(\''+ product_id +'\');');	
						
					}
				}		
				
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(product_id) {
		
		$.ajax({
			url: 'index.php?route=account/wishlist/remove',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				
				if (json['wishlist_data']) {
										
					if(Number(json['wishlist_data']['text_wishlist']) > 0){
						$('#favorite-item .wishlist-data').html(json['wishlist_data']['html']);
						$('#favorite-item').addClass('drop-box');
					}else{
						$('#favorite-item .wishlist-data').html('');
						$('#favorite-item').removeClass('drop-box');
					}
										
					$('body').find('.product-' + product_id).find('button.wishlist').removeClass('active');
					$('body').find('.product-' + product_id).find('button.wishlist').attr('onclick', 'wishlist.add(\''+ product_id +'\');');						
		
					$('body').find('#product-compare-wishlist-' + product_id + ' .wishlist span').text('В избранное');		
					$('body').find('#product-compare-wishlist-' + product_id + ' .wishlist').removeClass('active');		
					$('body').find('#product-compare-wishlist-' + product_id + ' .wishlist').attr('onclick', 'wishlist.add(\''+ product_id +'\');');

					$('body').find('.cart-product.product-'+ product_id +' .favorite').text('В избранное');		
					$('body').find('.cart-product.product-'+ product_id +' .favorite').attr('onclick', 'wishlist.add(\''+ product_id +'\');');					
					
				}		
				
				
				
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});

	},
	'count': function(object) {
		
		$.ajax({
			url: 'index.php?route=account/wishlist/count',
			type: 'post',
			dataType: 'json',
			success: function(json) {
				object.text(json['text']);	
				
				if(json['wishlist_count'] == 0)
					location.reload();
				
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});

	},
	'clear': function() {
		
		$.ajax({
			url: 'index.php?route=account/wishlist/clear',
			success: function(json) {
				location.reload();				
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});

	}
}

var compare = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=product/compare/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				
				if (json['compare_data']) {
					$('#compare-item').addClass('drop-box');
					$('#compare-item .compare-data').html(json['compare_data']['html']);
					
					if(json['compare_data']['products_compare'][product_id]){						
						$('body').find('.product-' + product_id).find('button.compare').addClass('active');
						$('body').find('.product-' + product_id).find('button.compare').attr('onclick', 'compare.remove(\''+ product_id +'\');');
						
						$('body').find('#product-compare-wishlist-' + product_id + ' .compare span').text('В сравнении');		
						$('body').find('#product-compare-wishlist-' + product_id + ' .compare').addClass('active');		
						$('body').find('#product-compare-wishlist-' + product_id + ' .compare').attr('onclick', 'compare.remove(\''+ product_id +'\');');		
					}
				}				
				
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(product_id) {
		
		
		$.ajax({
			url: 'index.php?route=product/compare/remove',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				
				if (json['compare_data']) {
										
					if(Number(json['compare_data']['text_compare']) > 0){
						$('#compare-item .compare-data').html(json['compare_data']['html']);
						$('#compare-item').addClass('drop-box');
					}else{
						$('#compare-item .compare-data').html('');
						$('#compare-item').removeClass('drop-box');
					}						
					
					$('.mobile-menu__navigation .comparison-count').html(json['compare_data']['text_compare']);
					///
					
					$('body').find('.products-compare.product-' + product_id).remove();
										
					$('body').find('.product-' + product_id).find('.compare-box').removeClass('active');
					$('body').find('.product-' + product_id).find('.compare-box button').attr('onclick', 'compare.add(\''+ product_id +'\');');	

					$('body').find('.product-' + product_id).find('button.compare').removeClass('active');
					$('body').find('.product-' + product_id).find('button.compare').attr('onclick', 'compare.add(\''+ product_id +'\');');					
					
					$('body').find('#product-compare-wishlist-' + product_id + ' .compare span').text('Сравнить');		
					$('body').find('#product-compare-wishlist-' + product_id + ' .compare').removeClass('active');		
					$('body').find('#product-compare-wishlist-' + product_id + ' .compare').attr('onclick', 'compare.add(\''+ product_id +'\');');
				
				}	
				
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
		

	}
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html  = '<div id="modal-agree" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});

// Autocomplete */
(function($) {
	$.fn.autocomplete = function(option) {
		return this.each(function() {
			this.timer = null;
			this.items = new Array();

			$.extend(this, option);

			$(this).attr('autocomplete', 'off');

			// Focus
			$(this).on('focus', function() {
				this.request();
			});

			// Blur
			$(this).on('blur', function() {
				setTimeout(function(object) {
					object.hide();
				}, 200, this);
			});

			// Keydown
			$(this).on('keydown', function(event) {
				switch(event.keyCode) {
					case 27: // escape
						this.hide();
						break;
					default:
						this.request();
						break;
				}
			});

			// Click
			this.click = function(event) {
				event.preventDefault();

				value = $(event.target).parent().attr('data-value');

				if (value && this.items[value]) {
					this.select(this.items[value]);
				}
			}

			// Show
			this.show = function() {
				var pos = $(this).position();

				$(this).siblings('ul.dropdown-menu').css({
					top: pos.top + $(this).outerHeight(),
					left: pos.left
				});

				$(this).siblings('ul.dropdown-menu').show();
			}

			// Hide
			this.hide = function() {
				$(this).siblings('ul.dropdown-menu').hide();
			}

			// Request
			this.request = function() {
				clearTimeout(this.timer);

				this.timer = setTimeout(function(object) {
					object.source($(object).val(), $.proxy(object.response, object));
				}, 200, this);
			}

			// Response
			this.response = function(json) {
				html = '';

				if (json.length) {
					for (i = 0; i < json.length; i++) {
						this.items[json[i]['value']] = json[i];
					}

					for (i = 0; i < json.length; i++) {
						if (!json[i]['category']) {
							html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
						}
					}

					// Get all the ones with a categories
					var category = new Array();

					for (i = 0; i < json.length; i++) {
						if (json[i]['category']) {
							if (!category[json[i]['category']]) {
								category[json[i]['category']] = new Array();
								category[json[i]['category']]['name'] = json[i]['category'];
								category[json[i]['category']]['item'] = new Array();
							}

							category[json[i]['category']]['item'].push(json[i]);
						}
					}

					for (i in category) {
						html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

						for (j = 0; j < category[i]['item'].length; j++) {
							html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
						}
					}
				}

				if (html) {
					this.show();
				} else {
					this.hide();
				}

				$(this).siblings('ul.dropdown-menu').html(html);
			}

			$(this).after('<ul class="dropdown-menu"></ul>');
			$(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));

		});
	}
})(window.jQuery);
