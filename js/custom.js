(function ($, window, document, undefined) {
	"use strict";
	var $winW = function () {
		return $(window).width();
	};
	var $winH = function () {
		return $(window).height();
	};
	var $screensize = function (element) {
		$(element).width($winW()).height($winH());
	};
	var screencheck = function (mediasize) {
		if (typeof window.matchMedia !== "undefined") {
			var screensize = window.matchMedia(
				"(max-width:" + mediasize + "px)"
			);
			return screensize.matches;
		} else {
			return $winW() <= mediasize;
		}
	};

	$(document).ready(function () {
		$(window).on("load", function () {
			$(".preloader").fadeOut();
			$(".animated-row").each(function () {
				var $this = $(this);
				$this.find(".animate").each(function (i) {
					var $item = $(this);
					var animation = $item.data("animate");
					$item.on("inview", function (event, isInView) {
						if (isInView) {
							setTimeout(function () {
								$item
									.addClass("animated " + animation)
									.removeClass("animate");
							}, i * 50);
						} else if (!screencheck(767)) {
							$item
								.removeClass("animated " + animation)
								.addClass("animate");
						}
					});
				});
			});
		});
		if ($(".facts-list").length) {
			$(".facts-list").owlCarousel({
				loop: true,
				nav: false,
				dots: true,
				items: 3,
				margin: 30,
				autoplay: false,
				smartSpeed: 700,
				autoplayTimeout: 6000,
				responsive: {
					0: {
						items: 1,
						margin: 0,
					},
					460: {
						items: 1,
						margin: 0,
					},
					576: {
						items: 2,
						margin: 20,
					},
					992: {
						items: 3,
						margin: 30,
					},
				},
			});
		}
		if ($(".services-list").length) {
			$(".services-list").owlCarousel({
				loop: true,
				nav: false,
				dots: true,
				items: 2,
				margin: 30,
				autoplay: false,
				smartSpeed: 700,
				autoplayTimeout: 6000,
				responsive: {
					0: {
						items: 1,
						margin: 0,
					},
					460: {
						items: 1,
						margin: 0,
					},
					576: {
						items: 2,
						margin: 20,
					},
					992: {
						items: 2,
						margin: 20,
					},
				},
			});
		}
		if ($(".fullpage-default").length) {
			var myFullpage = new fullpage(".fullpage-default", {
				licenseKey: "C7F41B00-5E824594-9A5EFB99-B556A3D5",
				anchors: [],
				lockAnchors: true,
				menu: "#nav",
				lazyLoad: true,
				navigation: true,
				navigationPosition: "right",
				scrollOverflow: true,
				responsiveWidth: 768,
				responsiveHeight: 600,
				responsiveSlides: true,
			});
		}

		$(document)
			.on("click", ".navbar-toggle", function () {
				$(".navbar-collapse").slideToggle(300);
				return false;
			})
			.on("click", ".navigation-menu > li > a", function () {
				$(".navbar-collapse").slideUp(300);
			})
			.on("click", ".next-section", function () {
				fullpage_api.moveSectionDown();
			});
		$(".facts-row").on("inview", function (event, isInView) {
			$(".count-number").each(function () {
				$(this)
					.prop("Counter", 0)
					.animate(
						{
							Counter: $(this).text(),
						},
						{
							duration: 1000,
							easing: "swing",
							step: function (now) {
								$(this).text(Math.ceil(now));
							},
						}
					);
				setTimeout(function () {
					$(".count-number")
						.removeClass("count-number")
						.addClass("counted");
				}, 1000);
			});
		});
		$(".skills-row").on("inview", function (event, isInView) {
			$(this).addClass("view");
		});
		$(document)
			.on("click", ".menu-trigger", function () {
				$("body").toggleClass("sidemenu-open");
			})
			.on("click", ".side-menu .navbar-nav li a", function () {
				$("body").removeClass("sidemenu-open");
			});

		$(window).scroll(function () {
			if (visible($(".count-digit"))) {
				if ($(".count-digit").hasClass("counter-loaded")) return;
				$(".count-digit").addClass("counter-loaded");

				$(".count-digit").each(function () {
					var $this = $(this);
					jQuery({ Counter: 0 }).animate(
						{ Counter: $this.text() },
						{
							duration: 3000,
							easing: "swing",
							step: function () {
								$this.text(Math.ceil(this.Counter));
							},
						}
					);
				});
			}
		});

		if (window.history && window.history.pushState) {
			// window.history.pushState(null, null, "/");
		}
	});
})(jQuery, window, document);

const currentYear = new Date().getFullYear();
document.getElementById("footer-text").innerHTML =
	`&copy; ${currentYear} Farm to Market La Trinidad - 
    Designed and Developed by 
    <a href="https://www.linkedin.com/in/tyraclemente/" target="_blank" style="text-decoration: underline;">Tyra</a> 
    with <a href="https://www.linkedin.com/in/tyraxl-joe-sabino-35666929b/" target="_blank" style="text-decoration: underline;">Tyraxl</a>`;
