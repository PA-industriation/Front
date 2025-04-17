$('body').on('click', '#ajax-load-products', function(){
	
	if(!$(this).hasClass('wait')){
		
		$(this).addClass('wait')
		
		var index_page = Number( $(this).attr('data-page') ) + 1,
			load_url = $('ul.pagination').find('li a:contains("'+ index_page +'")').attr('href');
			
		if(load_url)	
			ayaxPage(load_url + '&get_json=ocf8&key=1&get_page=true', load_url, index_page);
	
	}
	
});

function ayaxPage(href, set_url, _this_page){

	$.ajax({
		url: href,
		data: {ocf8: 1},
		type: 'post',
		dataType: 'json',
		beforeSend: function() {
			$('#catalog-row, #categories, #items-content').css({position: 'relative'});
			$('#catalog-row, #items-content').append('<div class="loader"></div>');			
		},
		success: function(json) {
			
			if(json['products']){		
				
				if(json['products'].indexOf('product-card') >= 0){
					const _CL = /product-card/g;
					_elements = json['products'].replace(_CL, 'product-card hide-deg animate page-' + _this_page + ' ');
					$('#catalog-row').find('.p-container').last().after(_elements);
				}else{
					const _CL = /product-list/g;
					_elements = json['products'].replace(_CL, 'product-list hide-deg animate page-' + _this_page + ' ');
					$('#catalog-row').find('.available-product-box').append(_elements);
				}
				
				setTimeout(function(){ $('#catalog-row').find('.product-card').removeClass('animate'); }, 500); 
				
			}
			
			if(json['articles']){							
				const _CL = /unit-p-box/g;
				_elements = json['articles'].replace(_CL, 'unit-p-box hide-deg animate page-' + _this_page + ' ');
				$('#items-content').append(_elements);
			}
			
			
			//$('body').find('.temp-json').remove();	
			
			if(json['pagination'])
				$('body').find('#ajax-products-pagination').html(json['pagination']);
			
			if(json['ajax_button'] && Number( json['more_limit'] ) > 0)
				$('body').find('#ajax-load-products-box').html(json['ajax_button']);
			else
				$('body').find('#ajax-load-products-box').html('');
			
			$('#catalog-row, #items-content').find('.loader').remove();
			
			$('html, body').animate({scrollTop: $('body').find('#catalog-row .p-container, #items-content, #catalog-row .available-product-box').find('.page-' + _this_page + ':eq(0)').offset().top - 50}, 500, function(){
				
				_elements = $('#catalog-row .p-container, #items-content').find('.page-' + _this_page).length;
				
				for(var i = 0; i < _elements; i++){
					$('#catalog-row .p-container, #items-content').find('.page-' + _this_page + ':eq('+ i +')').addClass('active');
				}
				
				
			});
			
			if (history.pushState) {
			   // var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
				var newUrl = set_url;
				history.pushState(null, null, newUrl);
			}
			else {
				console.warn('History API не поддерживает ваш браузер');
			}
			
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
		}
	});
	
}