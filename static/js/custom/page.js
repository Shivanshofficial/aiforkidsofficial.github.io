function generateSearch(toplevelclass){
if(toplevelclass){

  function hideRowIfNeeded() {
    var cards = document.querySelectorAll(toplevelclass+" .card");
    for (var card of cards) {
        card.style.display = "block";
        var hide = true;
        var inputs = card.querySelectorAll("tr");
        for (var input of inputs) {
            if (input.getAttribute('visible') !== 'false') hide = false;
        }
        if (hide) card.style.display = "none";
    }
}
$(toplevelclass+" .search").keyup(function () {
  var searchTerm = $(toplevelclass+" .search").val();
  var searchSplit = searchTerm.replace(/ /g, "'):containsi('")
  
$.extend($.expr[':'], {'containsi': function(elem, i, match, array){
      return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});
  
$(toplevelclass+" .card-body tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
  $(this).attr('visible','false');
});

$(toplevelclass+" .card-body tbody tr:containsi('" + searchSplit + "')").each(function(e){
  $(this).attr('visible','true');
});
hideRowIfNeeded();
var jobCount = $(toplevelclass+' .card-body tbody tr[visible="true"]').length;
  $(toplevelclass+' .counter').text(jobCount + ' Topics Found');
  
  if(jobCount == '0') {$(toplevelclass+' .no-result').show();$(toplevelclass+' .counter').hide()}
  else {$(toplevelclass+' .no-result').hide();$(toplevelclass+' .counter').show()}
});

}

}
  generateSearch('.searchsyl1');
  generateSearch('.searchsyl2');
  generateSearch('.searchsyl3');
  
