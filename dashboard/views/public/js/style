$(document).ready(function() {
$('div.selectBox').each(function(){
$(this).children('.selectdivx').children('span.selected').html($(this).children('div.selectOptions').children('span.selectOption:first').html());
$(this).attr('value',$(this).children('div.selectOptions').children('span.selectOption:first').attr('value'));
$(this).children('.selectdivx').click(function(){
if($(this).parent().children('div.selectOptions').css('display') == 'none'){
$(this).parent().children('div.selectOptions').slideDown();
} else {
$(this).parent().children('div.selectOptions').slideUp();
} });

$(this).find('span.selectOption').click(function(){	
$(this).parent().slideUp();
$(this).closest('div.selectBox').attr('value',$(this).attr('value'));

$('div.selectBox').each(function(){
var boxval = $(this).attr('value');
$(this).children('.selectdivx').children('input.selected2').attr('value',boxval);   
}); 
$(this).parent().siblings('.selectdivx').children('span.selected').html($(this).html());
});
});    
var boxval = $('div.selectBox').attr('value');
$('input.selected2').attr('value',boxval);   

$(".selectOption").on("click", function() {
  $(this).parents(".selectOptions").find(".selectOption").removeClass("renk");
  $(this).addClass("renk");
});

}); 
