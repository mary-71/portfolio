
$(document).ready(function (){
	// 날짜, 요일 시간 정의	
	var year  = new Date().getFullYear();  //현재 년도
	var month = new Date().getMonth()+1;  //현재 월
	var date  = new Date().getDate();  //현재 일
	var week  = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');	  //요일 정의
	var thisWeek  = week[new Date().getDay()];	//현재 요일

	var ampm = new Date().getHours() >= 12 ? '오후' : '오전';
	var	thisHours = new Date().getHours() >=13 ?  new Date().getHours()-12 : new Date().getHours(); //현재 시
	var	thisMinutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(); //현재 분
	var NowTime = thisHours + ':' + thisMinutes;

	// 오늘 날짜 입력
	$('.talkLst li.newDate span').each(function(){
		$(this).append(year + '년 ' + month +'월 ' + date +'일 ' + thisWeek);
	});	

	// 첫멘트 시간
	$('.chatbot_contents .chat_mid .talkLst li.bot .cont:last-child').append('<em class="date"><b>' + ampm + '</b>' + NowTime + '</em>');

	// 내용있을 시 스크롤 최하단
	$('.chatbot_contents .chat_mid').scrollTop($('.chatbot_contents .chat_mid')[0].scrollHeight);

	// 채팅입력 (Shift + Enter)
	$('.chatbot_contents .chat_btm .textArea').keyup(function (event) {
		if (event.keyCode == 13 && event.shiftKey) {
			var chatTxt = this.value;
			var caret = getCaret(this);
			this.value = chatTxt.substring(0,caret)+"\n"+chatTxt.substring(carent,chatTxt.length-1);
			event.stopPropagation();
		} else if (event.keyCode == 13){
			$('#btn_chat').trigger('click');
		}
	});


	// 추천질문 (text 출력)
	$('.chat_mid .info_btnBox li button').on('click', function() {
		var winWidth = $(window).width();
		var recomQust = $(this).text();
		
		$('.chatbot_contents .chat_btm .textArea').val(recomQust);
		$('#btn_chat').trigger('click');
		
		$('.chatbot_contents .bot_infoBox').css({
			'display':'none',
		});
		$('.chatbot_contents .talkLst').css({
			'display':'block',
		});
		
		
		if ( winWidth < 760) {
			$('#cahtbotWrap').each(function(){
				var cahtbotWrapHeight = $('#cahtbotWrap').height();	
				$('.chatbot_contents .chat_mid').css({
					'height': Math.round(cahtbotWrapHeight-130),
				});
			});		
		} else {
			$('#cahtbotWrap').each(function(){
				var cahtbotWrapHeight = $('#cahtbotWrap').height();	
				$('.chatbot_contents .chat_mid').css({
					'height': Math.round(cahtbotWrapHeight-145),
				});
			});	
		}
		$('.chatbot_contents .chat_btm .textArea').val('');
		$('.chatbot_contents .chat_mid').scrollTop($('.chatbot_contents .chat_mid')[0].scrollHeight);
		
		
		if ( recomQust == '해님달님 보여줘') {
			$('.chatbot_contents .chat_mid .talkLst').append(
				'<li class="botMsg_generic"> \
					<span class="thumb"><img src="resources/images/ico_bot_mini.png" alt="mini"></span>  \
					<span class="generic_image"><img src="https://i.ytimg.com/vi/0XsCKrb3gt4/mqdefault.jpg"></span> \
					<span class="generic_url"><a href="https://youtu.be/0XsCKrb3gt4" target="_blank"><em class="generic_title">해님달님</em></a></span> \
				</li>'
			);
			$('.chatbot_contents .chat_btm .textArea').val('');
		}
		
		if ( recomQust == '곰 세마리 불러줘') {
			$('.chatbot_contents .chat_mid .talkLst').append(
				'<li class="botMsg_generic"> \
					<span class="thumb"><img src="resources/images/ico_bot_mini.png" alt="mini"></span>  \
					<span class="generic_image"><img src="https://i.ytimg.com/vi/qaUnsiIRPf4/mqdefault.jpg"></span> \
					<span class="generic_url"><a href="https://youtu.be/qaUnsiIRPf4" target="_blank"><em class="generic_title">곰 세마리</em></a></span> \
				</li>'
			);
			$('.chatbot_contents .chat_btm .textArea').val('');
		}
	});
	

	// 채팅입력 (text 출력)
	$('#btn_chat').on('click', function() {
		// textarea 텍스트 값 및 엔터처리
		var textValue = $('.chatbot_contents .chat_btm .textArea').val().replace(/(?:\r\n|\r|\n)/g, '<br>');

		// 채팅창에 text 출력
		if( $('.chatbot_contents .chat_btm .textArea').val().replace(/\s/g,"").length == 0){
			// text가 없으면 실행 
		} else {
			// text가 있으면 실행
			$('.chatbot_contents .chat_mid .talkLst').append(
				'<li class="user"> \
					<span class="cont"> \
						<em class="txt">' + textValue + '</em> \
						<em class="date"><b>' + ampm + '</b>' + NowTime + '</em> \
					</span> \
				</li>'
			);
			$('.chatbot_contents .bot_infoBox').css({
				'display':'none',
			});
			$('.chatbot_contents .talkLst').css({
				'display':'block',
			});
			$('.chatbot_contents .chat_btm .textArea').val('');
			
			var winWidth = $(window).width();
			if ( winWidth < 760) {
				$('#cahtbotWrap').each(function(){
					var cahtbotWrapHeight = $('#cahtbotWrap').height();	
					$('.chatbot_contents .chat_mid').css({
						'height': Math.round(cahtbotWrapHeight-130),
					});
				});		
			} else {
				$('#cahtbotWrap').each(function(){
					var cahtbotWrapHeight = $('#cahtbotWrap').height();	
					$('.chatbot_contents .chat_mid').css({
						'height': Math.round(cahtbotWrapHeight-145),
					});
				});	
			}
			$('.chatbot_contents .chat_mid').scrollTop($('.chatbot_contents .chat_mid')[0].scrollHeight);

		}		
	});
	
	// guide
	$('.chat_top .btn_cb_guide').on('click', function(){
		$('.guideBox').toggle(); 
		$('.btn_cb_close').toggle(); 
		$(this).toggleClass('active'); 
	});	
		
	// chatbot close
	$('.btn_cb_close').on('click', function() {
		$('#cahtbotWrap').fadeOut(300);
		$('#maumWrap').css({
			'overflow': '',	
		});						
	});
	
});	
