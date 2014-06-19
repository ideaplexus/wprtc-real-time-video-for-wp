var $ = jQuery;
var room = $('#localVideo').data('room');
var localSrc = '';

var webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'remoteVideos',
  // immediately ask for camera access
  autoRequestMedia: true,
  debug: false,
  detectSpeakingEvents: true,
  autoAdjustMic: true
});

// when it's ready, join if we got a room from the URL
webrtc.on('readyToCall', function () {
	webrtc.joinRoom(room);
});

webrtc.on('joinedRoom', function(){
	localSrc = $('#localVideo').attr('src');
});

webrtc.on('mute', function(){
	webrtc.mute();
});
webrtc.on('unmute', function(){
	webrtc.unmute();
});
webrtc.on('videoRemoved', function(video, peer) {
	var localVideo = $('#localVideo');
	var src2 = localVideo.attr('src');

	if($(video).attr('id').indexOf('incoming') > 0) { localVideo.attr('src', localSrc); }
});



$(document).ready(function($){

  $('form#roomChange').on('change', function(e){
    $('form#roomChange').submit();
  });

  $('.mute').on('click', function(e){
  	var action = $(this).data('action');
  	if(action == 'mute'){
		webrtc.emit('mute'); 	
		$(this).data('action', 'unmute').removeClass('fa-microphone').addClass('fa-microphone-slash muted');
  	} else {
	  	webrtc.emit('unmute'); 	
		$(this).data('action', 'mute').removeClass('fa-microphone-slash muted').addClass('fa-microphone');
  	}
  });
  
  $('#remoteVideos').on('click', 'video', function(){
  	var localVideo = $('#localVideo');
	var src = $(this).attr('src');
	var src2 = localVideo.attr('src');
	
	localVideo.attr('src', src);
	$(this).attr('src', src2);
  });

});