$(document).ready(function(){
  $(".printonly .time").text(Date.today().toLocaleDateString());
  $dir="down";
  var r=new Raphael($("#experience_timeline")[0]);
  var width=$("#experience_timeline").innerWidth();
  var height = $("#experience_timeline").innerHeight();

  var beginning = Date.parse("Mar 2001").valueOf();
  var end = Date.today().valueOf();
  var scale = end-beginning;

  var events = [
                {time: "Mar 2002",name: "Bajaj Allianz", link: "#bajaj"},
                {time: "Jun 2003", name: "SlashSupport India Pvt Ltd", link: "#slash"},
                {time: "Sep 2004", name: "SAP Labs India Pvt Ltd", link: "#sap"},
                {time: "Mar 2009", name: "Artha42 & Dharana", link: "#dharana"}];


  var recttop=(height-6)/2;
  var rectwidth = width-10;
  var default_style = {fill: "#aaa", stroke: "#aaa"};
  var highlight_style = {fill: "#777", stroke: "#777"};
  var timebar = r.rect(5,recttop,rectwidth,6,4);
  timebar.attr(default_style);
  $(events).each(function(){
    this.etime = Date.parse(this.time).valueOf();
    var p = this.etime - beginning;
    var cx = ((1-(p/scale))*rectwidth)+5;
    var cy = recttop+3;
    var exp=r.circle(cx,cy,10).attr(default_style);
    exp.attr({cursor: "pointer", text: this.name});
    exp.experienceData=this;
    var tname=this.name + " (" + this.time + ")";
    exp.hover(
      //hover in
      function(ctx) {
        this.scale(1.5,1.5);
        this.attr(highlight_style);
        timebar.attr(highlight_style);
        if(this.textel && this.textel.id)
          this.textel.remove();
        if(this.elpopup && this.elpopup.id)
          this.elpopup.remove();
        this.textel=r.text(this.attrs.cx,this.attrs.cy,tname);
        this.textel.attr({fill: "#fff","font-size": 12 });
        if($dir=="down"){
          $dir="up";
        }
        else {
          $dir="down";
        }
        this.elpopup= this.textel.popup();
      },
      //hover out
      function(ctx) {
        this.scale(.66,.66);
        this.attr(default_style);
        timebar.attr(default_style);
        var el=this;
        if(this.elpopup && this.elpopup.id){
          this.elpopup.animate({opacity: 0}, 50, function(){
            el.textel.remove();
            this.remove();
          });
        }
    });
    exp.click(function(){
      window.scroll(0,$(this.experienceData.link).offset().top-150);
    });

  });


  var $win = $(window)
    , $econtainer = $('#experience_container')
    , navTop = $('#experience_container').length && $('#experience_container').offset().top
    , oSourceTop = $('#opensource').length && $('#opensource').offset().top - 100
    , isFixed = 0

  processScroll()

  $win.on('scroll', processScroll)

  function processScroll() {
    var i, scrollTop = $win.scrollTop()
    if (scrollTop >= navTop && scrollTop <= oSourceTop && !isFixed) {
      isFixed = 1
      $econtainer.addClass('efixed')
    } else if (scrollTop <= navTop && isFixed) {
      isFixed = 0
      $econtainer.removeClass('efixed')
    } else if (scrollTop >= oSourceTop && isFixed) {
      isFixed = 0
      $econtainer.removeClass('efixed')
    }
  }

});
