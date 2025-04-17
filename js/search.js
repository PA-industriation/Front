//search 2.1.2
$(function(){
	
	var search_timeout,
		search_length = 2,
		text_search = 'Найти',
		search = '',
		temp_search = $('header .middle-line .search .search-resize').find('[type="search"]').val(),
		help_code = '',
		time_fast = 100,
		time_normal = 800,
		mobile_width = 770,
		ajaxXHR = false,
		historyHtml;
		
	ppa_functions = {
		
		'helper': function(){
			
			this.ajaxAbort();			
			
			$.ajax({
				url: 'index.php?route=product/search/helpSearch&key=2n6aKEuz6H4Avy46rhNoLat3UgCJx259',
				type: 'post',
				data: {search: search},
				dataType: 'json',
				beforeSend: function(XHR) {	
					ajaxXHR = XHR;				
				},
				success: function(json) {
					
					if($(window).width() > mobile_width){//desktop
					
						if(json['html']){
							
							if(!json['empty'])
								ppa_search.saveHistory(search);
							
							ppa_search.showHelp(json['html']);	
							
						}else if(!json['html']){
							ppa_search.historySearch(time_fast);
						}	

					}else{//mobile		
					
						if(json['html']){
							ppa_mSearch.showHelp(json['html']);							
						}else if(!json['html']){
							ppa_mSearch.clearHelper();
						}
						
					}
					
				},
				error: function(xhr, ajaxOptions, thrownError) {
					console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);					
				}
			});	
			
		}, 
		'ajaxAbort': function(){
			if(ajaxXHR)
				ajaxXHR.abort();			
		}

	};		
	
	if($(window).width() > mobile_width){ //desktop
	
					
		ppa_search = {
			
			'historySearch': function(time){
				//clearTimeout(search_timeout);	

				ppa_functions.ajaxAbort();
				
				if(historyHtml)
					this.showHelp(historyHtml);
				
				search_timeout = setTimeout(function(){
					
					if($(window).width() > 767){
						var _data = {history: 1};
					}else{
						var _data = {mobile: 1};		
					}
					$.ajax({
						url: 'index.php?route=product/search/autoSearch&key=2n6aKEuz6H4Avy46rhNoLat3UgCJx259',
						type: 'post',
						data: _data,
						dataType: 'json',
						beforeSend: function(XHR) {	
							ajaxXHR = XHR;				
						},
						success: function(json) {

							if(json['helper']){
								if($(window).width() > 770){
									historyHtml = json['helper'];
									ppa_search.showHelp(json['helper']);
								}
							}				

							if(json['err'])
								console.log(json['err']);
						},
						error: function(xhr, ajaxOptions, thrownError) {
							//console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);					
						}
					});	
					
				}, time);
				
			},
			'loading': function(){
				this.showHelp('<span class="search-loading-line"></span>');			
			},
			'helper': function(time){				
				clearTimeout(search_timeout);				
				search_timeout = setTimeout(function(){					
					ppa_search.loading();
					ppa_functions.helper();					
				}, time);

				
			},
			'showHelp': function(html){	
				if($(window).width() > 770){						
					$('header .middle-line .search .search-resize #auto-search-result-dropdown').html(html);
					$('header .middle-line .search .search-resize #auto-search-result-dropdown').addClass('active');
				}else{						
					//$('body').find('#search-results').find('.p-grid').html(json['html']);						
				}			
			},
			'hideHelp': function(){			
				if($(window).width() > 770){						
					$('header .middle-line .search .search-resize #auto-search-result-dropdown').html('');
					$('header .middle-line .search .search-resize #auto-search-result-dropdown').removeClass('active');
				}else{						
					//$('body').find('#search-results').find('.p-grid').html(json['html']);						
				}			
			},
			'helperNav': function(key){
				
				var item_active = $('body').find('#search-helper').find('.item.active').length,
					item_index = (item_active > 0) ? Number( $('body').find('#search-helper').find('.item.active').attr('data-index') ) : -1,
					item_start = 0,
					items_length = Number( $('body').find('#search-helper').find('.item').length )  -1;
				

				if(key == 38){
					item_index --;
				}else if(key == 40){
					item_index ++;		
				}else if(key == 13 && $('body').find('#search-helper').find('.item.active').length){
					if($('body').find('#search-helper').find('.item.active').find('a').length){
						location = $('body').find('#search-helper').find('.item.active').find('a').attr('href');
					}else{
						if($('body').find('#search-helper').find('.item.active').find('span').length > 1)
							$('body').find('#search-helper').find('.item.active').find('span:eq(1)').click();
						else
							$('body').find('#search-helper').find('.item.active').find('span').click();
					}
					
					return false;
				}else if(key == 27){
					$('body').find('#search-helper').find('.item').removeClass('active');
					return false;
				}
				
				if(key == 38 || key == 40){
					
					this.setCursorInput();
				
					if(item_index > items_length)
						item_index = item_start;
					else if(item_index < item_start)
						item_index = items_length;
					$('body').find('#search-helper').find('.item').removeClass('active');
					$('body').find('#search-helper').find('.item[data-index="'+ item_index +'"]').addClass('active');
					
				}
				
			},
			'saveHistory': function(search_test){
				$.ajax({
					url: 'index.php?route=product/search/saveHistory&key=2n6aKEuz6H4Avy46rhNoLat3UgCJx259',
					type: 'post',
					data: {search_test: search_test},
					success: function(data) {
					},
					error: function(xhr, ajaxOptions, thrownError) {
						console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);					
					}
				});	
			},
			'removeSearchHistory': function(history_id){
				
				$.ajax({
					url: 'index.php?route=product/search/removeSearchHistory&key=2n6aKEuz6H4Avy46rhNoLat3UgCJx259',
					type: 'post',
					data: {history_id: history_id},
					success: function(data) {
						
						if(history_id == 'all')
							$('body').find('.history-items').remove();
						
						ppa_search.setItemIndex();
						
					},
					error: function(xhr, ajaxOptions, thrownError) {
						console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);					
					}
				});	
				
			},
			'setItemIndex': function(){
				
				var item_box = $('#auto-search-result-dropdown').find('#search-helper'),
					item_length;
					
				if(item_box.find('.history-items').length && !item_box.find('.history-items').find('.item').length)	
					item_box.find('.history-items').remove();
		
				item_length = item_box.find('.item').length;
				
				for(var i = 0; i < item_length; i++){
					item_box.find('.item:eq('+ i +')').attr('data-index', i);				
				}
				
			},
			'startSearch': function(){
				
				if(search.length >= search_length)
					location = '/search/?search=' + search;
				
			},
			'setSearch': function(value){
				
				ppa_functions.ajaxAbort();
				
				if(value && value.length >= search_length)
					this.activeteSearch(value);
				else
					this.diactiveteSearch(value);
				
			},
			'activeteSearch': function(value){
				clearTimeout(search_timeout);
				$('header .middle-line .search .search-resize').addClass('ready');
				search = value;
				this.helper(time_normal);
			},
			'diactiveteSearch': function(){
				$('header .middle-line .search .search-resize').removeClass('ready');
				
				clearTimeout(search_timeout);
				
				if($('header .middle-line .search .search-resize').hasClass('focus')){
					this.historySearch(time_fast);
				}else{
					this.hideHelp();
				}
				
				search = '';
			},
			'focusInput': function(){	
				
				if(!$('header .middle-line .search .search-resize').hasClass('focus')){
					
					$('body').find('#nav-menu-top').remove(); //удаление меню
				
					this.setSearch(temp_search);
					$('header .middle-line .search .search-resize').find('[type="search"]').val(temp_search);
					$('header .middle-line .search .search-resize').addClass('focus');
					$('header .middle-line .search .search-resize').css({right: '-'+ ( $('header .contacts').outerWidth() + 55) +'px'});
					$('header .middle-line').css({position: 'relative', 'z-index': 56});
					
					if(temp_search.length)
						this.setCursorInput();
					
					if(temp_search.length >= search_length){
						search = temp_search;
						this.helper(time_fast);				
					}else{
						this.historySearch(time_fast);
					}
					
					$('.content, header .header-nav').addClass('disable').append('<div class="disable-box"></div>');
					
				}
				
			},
			'setCursorInput': function(){
				setTimeout(function(){
					input = document.getElementById('search_header_input');
					input.focus();
					input.selectionStart = input.value.length;
				}, 5);
			},
			'outfocusInput': function(){
				temp_search = $('header .middle-line .search .search-resize').find('[type="search"]').val();
				
				//$('header .middle-line .search .search-resize').find('[type="search"]').val('');
				$('header .middle-line .search .search-resize').find('[type="search"]').blur();
				$('header .middle-line .search .search-resize').removeClass('focus');
				$('header .middle-line .search .search-resize').css({right: 0});
				$('header .middle-line').css({position: '', 'z-index': ''});
				
				this.setSearch('');

				$('.content, header .header-nav').removeClass('disable').find('.disable-box').remove();
			},
			'clearInput': function(){
				ppa_functions.ajaxAbort();
				clearTimeout(search_timeout);
				$('header .middle-line .search .search-resize').removeClass('ready');
				search = '';
				this.historySearch(time_fast);
				$('header .middle-line .search .search-resize').find('[type="search"]').val('');
			},
			'searchStart': function(){
				
				
				/*if($('#search').find('#search-helper .item[data-location]').length){//ocf8 pages					
					location = $('#search').find('#search-helper .item[data-location]:eq(0)').find('a').attr('href');	
					ppa_search.loading();					
				}else*/ if(search.length >= search_length){
					ppa_search.loading();
					ppa_search.startSearch();	
				}else{
					ppa_search.historySearch(time_fast);
				}
				
			}
			
		};
		
		//переход на страницу поиска
		$('body').on('click', 'header .middle-line .search .search-resize.focus #search-btn', function(){
			ppa_search.searchStart();
		});
		$(document).on('keydown', function(e) {
			if (e.key === 'Enter' && $('body').find('header .middle-line .search .search-resize').find('[type="search"]').is(':focus') && !$('body').find('#search-helper .item.active').length){
				
				ppa_search.searchStart();
				
			}
		});		
		$('body').on('click', '#show-all-search-results button', function(){
			$('header .middle-line .search button#search-btn').click();
		});
		
		//ввод текста
		$('header #search_header_input').on('input', function () {
			ppa_functions.ajaxAbort();
			ppa_search.setSearch($(this).val());		
		});	
		
		//фокус по полю поиска
		$('body').on('focus', '#search_header_input', function(){
			ppa_search.focusInput();
		});	
		
		//убрать фокус
		$(document).mouseup(function (e){
			var div = $("header .middle-line, header .middle-line .search .search-resize *");
			if (!div.is(e.target) && div.has(e.target).length === 0 && !$('body').find('.ppa-search-full').length && !$('body').find('.catalog-menu').length) { 
				ppa_search.outfocusInput();		
			}
		});
		
		//очистить строку поиска
		$('header .middle-line .search .search-resize.ready .clear-search').click(function(){
			ppa_search.clearInput();
		});
		$(document).on('keydown', function(e) {
			if (e.key === "Escape")
				ppa_search.clearInput();			
		});
		
		//навигация в подсказках
		$(document).on('keydown', function(e) {
			if($('body').find('#search-helper').length){
				ppa_search.helperNav(e.keyCode)	
			}
		});
		$('body').on('mouseover', '#search-helper .item', function(e) {
			$('body').find('#search-helper .item').removeClass('active');
		});
		$('body').on('click', '#search-helper .item span, #search-helper .search-history ul li', function(){	
			var _search = $(this).attr('data-search'),
				history_id = $(this).attr('data-removeH');
			if(_search){
				$('header #search_header_input').val(_search);
				search = _search;
				$('header .middle-line .search .search-resize').addClass('ready');
				ppa_search.loading();
				ppa_search.helper(time_fast);
				ppa_search.setCursorInput();
			}else if(history_id){
				$(this).parents('.item').remove();
				ppa_search.removeSearchHistory(history_id);
			}			
		});
		
	}else{ //mobile

		ppa_mSearch = {
			
			'appendSearch': function(){
				
				if(!$('body').find('#mobile-popup-search').length){
					
			
					//if($(window).scrollTop() < 100){						
					//	_style = '';
					//}else{
						_style = 'style="position: fixed; top: 0;"';
					//}
				
					_html = '<div id="mobile-popup-search" '+ _style +'>';
					_html += '	<div class="input-box">';
					_html += '		<input type="search" placeholder="Введите название товара или артикул" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" onclick="ymAction(\'search_mobyle_input_click\');">';
					_html += '		<button><i class="icon2-search-m"></i></button>';
					_html += '	</div>';
					_html += '	<div class="helper">';
					_html += '	</div>';
					_html += '</div>';
					_html += '<script>';
					_html += '	$(\'body\').find(\'#mobile-popup-search .input-box input\').focus(); ';
					_html += '	$(\'#mobile-popup-search .input-box input\').on(\'input\', function (e) {';
					_html += '		ppa_mSearch.helper($(this).val(), 800);	';	
					_html += '	});';
					_html += '</script>';
					
					$('.content').addClass('disable').append('<div class="disable-box"></div>');
					$('body').append(_html);
					
				}
				
			},
			'removeSearch': function(){
				$('body').find('#mobile-popup-search').remove();	
				$('.content').removeClass('disable').find('.disable-box').remove();
			},
			'helper': function(searc_text, time){
				
				clearTimeout(search_timeout);
				this.loading();
				ppa_functions.ajaxAbort();
				search = searc_text;
				
				if(searc_text.length >= search_length){
					search_timeout = setTimeout(function(){
						ppa_functions.helper();					
					}, time);
					
				}else{
					this.clearHelper();					
				}
				
			},
			'loading': function(){
				this.showHelp('<span class="search-loading-line"></span>');			
			},
			'clearHelper': function(){
				$('body').find('#mobile-popup-search .helper').css({'padding-top': 0}).html('');
			},
			'showHelp': function(html){				
				$('body').find('#mobile-popup-search .helper').css({'padding-top': 25}).html(html);				
			},
			'startSearch': function(){
				
				if(search.length >= search_length){
					this.loading();
					ppa_functions.ajaxAbort();
					location = '/search/?search=' + search;					
				}
				
			}
			
		}
		
		//переход на страницу поиска
		$('body').on('click', '#mobile-popup-search .input-box button', function(){
			ppa_mSearch.startSearch();
		});
		$('body').on('change', '#mobile-popup-search .input-box input', function(e){			
			var _this = $(this);
			
			setTimeout(function(){
				if(_this.is( ":focus" ))
					ppa_mSearch.startSearch();
			}, 100);
		});
		$('body').on('click', '#show-all-search-results button', function(){
			$('#mobile-popup-search .input-box button').click();
		});
		
		//вызов строки поиска
		$('body').on('click', '#mobile-search', function(){
			ppa_mSearch.appendSearch();			
		});
		
		//удаление строки поиска
		$(document).mouseup(function (e){
			var div = $("#mobile-popup-search *");
			if (!div.is(e.target) && div.has(e.target).length === 0) { 
				ppa_mSearch.removeSearch();		
			}
		});
		
		//
		$('body').on('click', '#search-helper .item span, #search-helper .search-history ul li', function(){	
			var _search = $(this).attr('data-search');
						
			$('#mobile-popup-search .input-box input').val(_search);
			search = _search;
			ppa_mSearch.helper(_search, 200);	
			
					
		});
	
	}
	
})