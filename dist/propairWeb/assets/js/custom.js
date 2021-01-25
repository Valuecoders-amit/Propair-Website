$(document).ready(function(){
    $('#owl-one').owlCarousel({
      loop:true,
      margin:0,
      nav:true,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:4
          }
      }
  });

  $('#owl-two').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

// new
$('.requirment').click(function(){
    $('.defaulter').addClass('show');
    
});

$('.visithows').click(function(){
    $('body, html').animate({
        scrollTop: $('#howits').offset().top - 80
    });
});
// new-ends


$('.toggle-btn1').on('click',function( ){
    $(this).parents("dasboard-wrapper").toggleClass('shrink');
   
    // $('').addClass('shrink')

});

  

$('.btn-link').on('click',function(){
    alert(1);
    $(this).css("content",'/107')
});

// //jQuery time
// var current_fs, next_fs, previous_fs; //fieldsets
// var left, opacity, scale; //fieldset properties which we will animate
// var animating; //flag to prevent quick multi-click glitches
// var currentIndex = 0;
// var nextClicked =  false;
// $(".next").click(function() {

// 	if(!nextClicked) {
// 		console.log("Inside if conditopn")
// 		currentIndex = 0;
// 	}
// 	else {
// 		if(currentIndex < 3){
// 			console.log('Inside else-----------');
// 			currentIndex += 1; 		
// 		}
	
// 	}
	
// 	if(currentIndex < 3){
// 		if(animating) {
// 			return false;
// 		}
// 		animating = true;
		
// 		current_fs = $(this).parents(".submitting-buttons").prev("#msform").find(`fieldset:eq(${currentIndex})`);
// 		next_fs = $(this).parents(".submitting-buttons").prev("#msform").find(`fieldset:eq(${currentIndex})`).next();


// 		console.log('next_fs',next_fs);
		
// 		//activate next step on progressbar using the index of next_fs
// 		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
// 		//$("#progressbar li").eq($("fieldset").index(next_fs1)).addClass("active");
		
// 		//show the next fieldset
// 		next_fs.show(); 
// 		//hide the current fieldset with style
// 		current_fs.animate({opacity: 0}, {
// 			step: function(now, mx) {
// 				//as the opacity of current_fs reduces to 0 - stored in "now"
// 				//1. scale current_fs down to 80%
// 				scale = 1 - (1 - now) * 0.2;
// 				//2. bring next_fs from the right(50%)
// 				left = (now * 50)+"%";
// 				//3. increase opacity of next_fs to 1 as it moves in
// 				opacity = 1 - now;
// 				current_fs.css({
// 	        'transform': 'scale('+scale+')',
// 	        'position': 'absolute'
// 	      });
// 				next_fs.css({'left': left, 'opacity': opacity});
// 			}, 
// 			duration: 800, 
// 			complete: function(){
// 				current_fs.hide();
// 				animating = false;
// 			}, 
// 			//this comes from the custom easing plugin
// 			easing: 'easeInOutBack'
// 		});
// 	}
// 	else{
// 		// show finish button
// 	}
// 	nextClicked = true; 

// });

$(".submit").click(function(){
	return false;
})

$(".dropdown-menu li a").click(function() {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});


$('dsdsasa').click(function(){
    $('ul.drpdn').toggleClass('show');
});

$('.quicktip-wrp img').mouseover(function(){
    $(".tol-tip").css('display','block')
});

$('.quicktip-wrp img').mouseleave(function(){
    $(".tol-tip").css('display','none')
});




});

