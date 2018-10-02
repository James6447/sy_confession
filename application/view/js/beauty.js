$(document).ready(function() {
  var winW = null;
  var winH = null;
  var phW = null;
  var phH = null;
  var ms = {
    x: 0,
    y: 0
  }
  var curPhoto = 0;
  var numOfPhotos = $(".photo").length;

  function loadBg(photoNum) {
    var url = $(".photo-" + photoNum).css("background-image");
    $(".transparent-bg").append("<div class='trans-bg trans-bg-" + photoNum + "'></div>");
    $(".trans-bg").last().css("background-image", url);
  }

  function handleSize() {
    winW = parseInt($(".demo-container").css("width"));
    winH = parseInt($(".demo-container").css("height"));
    var k = 0.9;
    if (winW / 16 < winH / 9)
      $(".photo-container").css({
        "width": winW * k + "px",
        "height": winW * k * 9 / 16 + "px" });
    else
      $(".photo-container").css({
        "height": winH * k + "px",
        "width": winH * k * 16 / 9 + "px"
      });
    phW = parseInt($(".photo").css("width"));
    phH = parseInt($(".photo").css("height"));
    $(".photo-container").css("perspective", (phW + phH) * 2);
  }

  $(".indicator").html((curPhoto + 1) + "/" + numOfPhotos);

  for (i = 0; i < numOfPhotos; i++)
    loadBg(i);
  $(".trans-bg-0").addClass("trans-bg-active");
  handleSize();

  $(window).on("resize", handleSize);

  $(".demo-container").on("mousedown touchstart", function(event) {
    if (event.type == "touchstart") {
      event.preventDefault();
      var st = {
        x: event.originalEvent.touches[0].pageX,
        y: event.originalEvent.touches[0].pageY
      }
    } else {
       var st = {
      x: event.pageX,
      y: event.pageY
    }
    }

    $(".demo-container").addClass("grabbing").find(".photo").removeClass("animation");

    $(".demo-container").on("mouseleave", function() {
      $(document).trigger("mouseup");
    });
    $(document).on("mousemove touchmove", function(event) {
      ms.x = (event.pageX || event.originalEvent.touches[0].pageX) - st.x;
      ms.y = (event.pageY || event.originalEvent.touches[0].pageY) - st.y;
      $(".photo-active").css("transform", "rotateX(" + Math.atan(-ms.y / phH) * 57.3 + "deg) rotateY(" + Math.atan(ms.x / phW) * 57.3 + "deg) translate3d(" + ms.x / 2.5 + "px, " + ms.y / 2.5 + "px, 0)");
    });
  });
  $(document).on("mouseup touchend", function(event) {
    $(".demo-container").removeClass("grabbing").find(".photo").addClass("animation");
    $(document).off("mousemove touchmove");
    if (ms.x < -winW / 5 && curPhoto < numOfPhotos - 1) {
      curPhoto++;
      $(".photo-active").removeAttr("style").removeClass("photo-active").addClass("photo-left");
      $(".photo-" + curPhoto).addClass("photo-active");
      $(".trans-bg").removeClass("trans-bg-active");
      $(".trans-bg-" + curPhoto).addClass("trans-bg-active");
      $(".indicator").html((curPhoto + 1) + "/" + numOfPhotos)
    }
    else if (ms.x > winW / 5 && curPhoto > 0) {
      curPhoto--;
      $(".photo-active").removeAttr("style").removeClass("photo-active");
      $(".photo-" + curPhoto).addClass("photo-active").removeClass("photo-left");
      $(".trans-bg").removeClass("trans-bg-active");
      $(".trans-bg-" + curPhoto).addClass("trans-bg-active");
      $(".indicator").html((curPhoto + 1) + "/" + numOfPhotos)
    }
    else {
      $(".photo-active").removeAttr("style");
    }
    ms.x = 0;
    ms.y = 0;
  });
});


(function() {
	"use strict";
	var pnls = document.querySelectorAll('.panel').length,
		scdir, hold = false;

	function _scrollY(obj) {
		var slength, plength, pan, step = 100,
			vh = window.innerHeight / 100,
			vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
		if ((this !== undefined && this.id === 'container') || (obj !== undefined && obj.id === 'container')) {
			pan = this || obj;
			plength = parseInt(pan.offsetHeight / vh);
		}
		if (pan === undefined) {
			return;
		}
		plength = plength || parseInt(pan.offsetHeight / vmin);
		slength = parseInt(pan.style.transform.replace('translateY(', ''));
		if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls)) {
			slength = slength - step;
		} else if (scdir === 'down' && slength < 0) {
			slength = slength + step;
		} else if (scdir === 'top') {
			slength = 0;
		}
		if (hold === false) {
			hold = true;
			pan.style.transform = 'translateY(' + slength + 'vh)';
			setTimeout(function() {
				hold = false;
			}, 1000);
		}
	}

	function _swipe(obj) {
		var swdir,
			sX,
			sY,
			dX,
			dY,
			threshold = 100,
			/*[min distance traveled to be considered swipe]*/
			slack = 50,
			/*[max distance allowed at the same time in perpendicular direction]*/
			alT = 500,
			/*[max time allowed to travel that distance]*/
			elT, /*[elapsed time]*/
			stT; /*[start time]*/
		obj.addEventListener('touchstart', function(e) {
			var tchs = e.changedTouches[0];
			swdir = 'none';
			sX = tchs.pageX;
			sY = tchs.pageY;
			stT = new Date().getTime();
		}, false);

		obj.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);

		obj.addEventListener('touchend', function(e) {
			var tchs = e.changedTouches[0];
			dX = tchs.pageX - sX;
			dY = tchs.pageY - sY;
			elT = new Date().getTime() - stT;
			if (elT <= alT) {
				if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
					swdir = (dX < 0) ? 'left' : 'right';
				} else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
					swdir = (dY < 0) ? 'up' : 'down';
				}
				if (obj.id === 'container') {
					if (swdir === 'up') {
						scdir = swdir;
						_scrollY(obj);
					} else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
						scdir = swdir;
						_scrollY(obj);

					}
					e.stopPropagation();
				}
			}
		}, false);
	}

	var container = document.getElementById('container');
	container.style.transform = 'translateY(0)';
	container.addEventListener('wheel', function(e) {
		if (e.deltaY < 0) {
			scdir = 'down';
		}
		if (e.deltaY > 0) {
			scdir = 'up';
		}
		e.stopPropagation();
	});
	container.addEventListener('wheel', _scrollY);
	_swipe(container);

})();

// ---------------------------- //

var vid = document.getElementById("bgvid");
var pauseButton = document.querySelector("#polina button");

if (window.matchMedia('(prefers-reduced-motion)').matches) {
    vid.removeAttribute("autoplay");
    vid.pause();
    pauseButton.innerHTML = "Paused";
}

function vidFade() {
  vid.classList.add("stopfade");
}

vid.addEventListener('ended', function()
{
// only functional if "loop" is removed
vid.pause();
// to capture IE10
vidFade();
});


pauseButton.addEventListener("click", function() {
  vid.classList.toggle("stopfade");
  if (vid.paused) {
    vid.play();
    pauseButton.innerHTML = "Pause";
  } else {
    vid.pause();
    pauseButton.innerHTML = "Paused";
  }
})
