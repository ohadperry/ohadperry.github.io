function textNode() {
    return this.nodeType === 3;
}

function logoWidth(div) {
    return  div.find('.title_logo').width() +
        parseInt(div.find('.title_logo').css("padding-left")) +
        parseInt(div.find('.title_logo').css("padding-right"));
}

function detectMobile() {
    return  (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
}


function bindMouse(){
    $(".title").on('mouseenter', function () {
        var $title = $(this);
        var shineData = $title.data('shine');

        if (!shineData) {
            var $h = $title.find("h1,h2,h3,h4,h5,h6");

            var $span = $h.find("span");
            if (!$span.length) {
                //wraps only text elements with <span>
                $h.contents().filter(textNode).wrap("<span/>");
                $span = $h.find("span");
            }

            var cellSize = 20;
            var pos = $h.position();
            var leftAfterLogo = pos.left + logoWidth($title.parent());
            var cssMap = {
                position:'absolute',
                top:pos.top + 'px',
                left:leftAfterLogo + 'px',
                color:$title.data('shinecolor') || '#FFF'
            };
            //calculate number of cells wide and high
            var nx = Math.ceil($span.width() / cellSize);
            var ny = Math.ceil($h.height() / cellSize);
            var rect = [], index;
            //nested loops to create positioned clipped clones, overlaying the original text
            for (var i = 0; i < ny; i++) {
                rect[0] = i * cellSize;
                rect[2] = rect[0] + cellSize;
                for (var j = 0; j < nx; j++) {
                    rect[3] = j * cellSize;
                    rect[1] = rect[3] + cellSize;
                    index = ny + j - i; //this gives the diagonal effect
                    cssMap.clip = 'rect(' + rect.join('px,') + 'px)';
                    $h.clone().removeClass().addClass('sh sh' + index).css(cssMap).hide().insertAfter($h);
                }
            }
            shineData = {
                maxIndex:ny + nx - 1,
                sibs:$h.siblings('.sh')
            };
            $title.data('shine', shineData);
        }
        function twinkle(k) {
            var $s = shineData.sibs.filter(".sh" + k);
            return function () {
                $s.show();
                setTimeout(function () {
                    $s.hide()
                }, 100);
            }
        }

        for (var k = 1; k <= shineData.maxIndex; k++) {
            setTimeout(twinkle(k), k << 6); //k*64
        }
    });
}
$(function () {
    //var audio = document.getElementsByTagName("audio")[0];

    $('.ResumeContentTitle').click(function () {
        var id = $(this).attr('id').split('Header');
        $('#' + id[0]).toggle("slow");
        // $(".title").unbind();
        //audio.play();
        // setTimeout(bindMouse(), 1000);
    });

    $('.ResumeReferenceHeader').click(function () {
        var id = $(this).attr('id').split('_Reference');
        $('#' + id[0]).slideToggle("slide");
    });

    $(".fancybox").fancybox();

    if (!detectMobile()) {
        //shine effect on all title text
        //bindMouse();
        // $(".title1").jTextShine();
    }else{
        alert("You are using a mobile device. Enjoy my one column mobile design");
    }
});