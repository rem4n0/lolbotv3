const h = function imgError(e) {
  e.src = "https://imgur.com/tiZmKiK.png"; 
  
}

/*
$(document).ready(function (){
  
// Add the class attribute to the first h1:
const h1 = document.querySelector("img")
h1.setAttribute("loading", "lazy");})/*
!(function (e) {
  "use strict";
  e(".js-fullheight").css("height", e(window).height()),
    e(window).resize(function () {
      e(".js-fullheight").css("height", e(window).height());
    }),
    e("#sidebarCollapse").on("click", function () {
      e("#sidebar").toggleClass("active");
    });
})(jQuery),
  $(document).on("click", ".dropdown-menu", function (e) {
    e.stopPropagation();
  }),
  console.log("vCodes: Online - Coded by: Claudette#0241 & Void Development"),
  $(document).ready(function () {
    $("#analytics_referring").DataTable({
      dom: "<'dt--top-section'<'row'<'col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center'l><'col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3'f>>><'table-responsive'tr><'dt--bottom-section d-sm-flex justify-content-sm-between text-center'<'dt--pages-count  mb-sm-0 mb-3'i><'dt--pagination'p>>",
      oLanguage: {
        oPaginate: {
          sPrevious: '<i class="fal fa-arrow-left"></i>',
          sNext: '<i class="fal fa-arrow-right"></i>',
        },
        sInfo: " ",
        sSearch: " ",
        sSearchPlaceholder: " ",
        sLengthMenu: " ",
      },
      stripeClasses: [],
      lengthMenu: 5,
      pageLength: 5,
      aaSorting: [],
      drawCallback: function () {
        $(".dataTables_paginate > .pagination").addClass(
          " pagination-style-13 pagination-bordered"
        );
      },
    }),
      $("#analytics_country").DataTable({
        dom: "<'dt--top-section'<'row'<'col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center'l><'col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3'f>>><'table-responsive'tr><'dt--bottom-section d-sm-flex justify-content-sm-between text-center'<'dt--pages-count  mb-sm-0 mb-3'i><'dt--pagination'p>>",
        oLanguage: {
          oPaginate: {
            sPrevious:
              '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
            sNext:
              '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
          },
          sInfo: " ",
          sSearch: " ",
          sSearchPlaceholder: " ",
          sLengthMenu: " ",
        },
        stripeClasses: [],
        lengthMenu: 5,
        pageLength: 5,
        aaSorting: [],
        drawCallback: function () {
          $(".dataTables_paginate > .pagination").addClass(
            " pagination-style-13 pagination-bordered"
          );
        },
      });
  }),
  $('.dropdown-menu .submenu > a:not(a[href="#"])').on("click", function () {
    self.location = $(this).attr("href");
  }),
  $(document).ready(function () {
    ($.fn.dataTable.ext.classes.sPageButton = "btn btn-vcodes m-1 pt-1"),
      $("#tableData").DataTable({
        language: {
          oPaginate: {
            sPrevious: '<i class="fal fa-arrow-left"></i>',
            sNext: '<i class="fal fa-arrow-right"></i>',
          },
          sInfo: "Page: _PAGE_/_PAGES_",
          sSearch: "",
          sSearchPlaceholder: "",
          sLengthMenu: "",
        },
        stripeClasses: [],
        lengthMenu: 10,
        pageLength: 10,
      });
  }),
  $(window).width() < 992 &&
    $(".dropdown-menu a").click(function (e) {
      e.preventDefault(),
        $(this).next(".submenu").length && $(this).next(".submenu").toggle(),
        $(".dropdown").on("hide.bs.dropdown", function () {
          $(this).find(".submenu").hide();
        });
    }),
  $(function () {
    $(".dropdown").hover(
      function () {
        $(this).addClass("open");
      },
      function () {
        $(this).removeClass("open");
      }
    );
  }),
  const h2 = $(document).ready(function () {
    var e = $("select"),
      t = e.find("option"),
      n = $("<div />").addClass("selectMultiple"),
      o = $("<div />"),
      s = $("<ul />"),
      a = e.data("placeholder"),
      i = $("<span />").text(a).appendTo(o);
    t.each(function () {
      var e = $(this).text();
      $(this).is(":selected")
        ? (o.append($("<a />").html("<em>" + e + "</em><i></i>")),
          i.addClass("hide"))
        : s.append($("<li />").html(e));
    }),
      o.append($("<div />").addClass("arrow")),
      n.append(o).append(s),
      e.wrap(n),
      $(document).on("click", ".selectMultiple ul li", function (e) {
        var t = $(this).parent().parent(),
          n = $(this);
        if (!t.hasClass("clicked")) {
          t.addClass("clicked"),
            n.prev().addClass("beforeRemove"),
            n.next().addClass("afterRemove"),
            n.addClass("remove");
          var o = $("<a />")
            .addClass("notShown")
            .html("<em>" + n.text() + "</em><i></i>")
            .hide()
            .appendTo(t.children("div"));
          o.slideDown(400, function () {
            setTimeout(function () {
              o.addClass("shown"),
                t.children("div").children("span").addClass("hide"),
                t
                  .find("option:contains(" + n.text() + ")")
                  .prop("selected", !0);
            }, 500);
          }),
            setTimeout(function () {
              n.prev().is(":last-child") &&
                n.prev().removeClass("beforeRemove"),
                n.next().is(":first-child") &&
                  n.next().removeClass("afterRemove"),
                setTimeout(function () {
                  n.prev().removeClass("beforeRemove"),
                    n.next().removeClass("afterRemove");
                }, 200),
                n.slideUp(400, function () {
                  n.remove(), t.removeClass("clicked");
                });
            }, 600);
        }
      }),
      $(document).on("click", ".selectMultiple > div a", function (e) {
        var t = $(this).parent().parent(),
          n = $(this);
        n.removeClass().addClass("remove"),
          t.addClass("open"),
          setTimeout(function () {
            n.addClass("disappear"),
              setTimeout(function () {
                n.animate(
                  { width: 0, height: 0, padding: 0, margin: 0 },
                  300,
                  function () {
                    var e = $("<li />")
                      .text(n.children("em").text())
                      .addClass("notShown")
                      .appendTo(t.find("ul"));
                    e.slideDown(400, function () {
                      e.addClass("show"),
                        setTimeout(function () {
                          t
                            .find(
                              "option:contains(" + n.children("em").text() + ")"
                            )
                            .prop("selected", !1),
                            t.find("option:selected").length ||
                              t
                                .children("div")
                                .children("span")
                                .removeClass("hide"),
                            e.removeClass();
                        }, 400);
                    }),
                      n.remove();
                  }
                );
              }, 300);
          }, 400);
      }),
      $(document).on(
        "click",
        ".selectMultiple > div .arrow, .selectMultiple > div span",
        function (e) {
          $(this).parent().parent().toggleClass("open");
        }
      );
  });
var $info = $(".tooltip");
$info.each(function () {
  var e = $(this).data("tooltip");
  $(this).append('<span class="inner" >' + e + "</span>");
});
const mobileScreenn = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
  $(".dashboard-nav-dropdown-toggle").click(function () {
    $(this)
      .closest(".dashboard-nav-dropdown")
      .toggleClass("show")
      .find(".dashboard-nav-dropdown")
      .removeClass("show"),
      $(this).parent().siblings().removeClass("show");
  }),
    $(".menu-toggle").click(function () {
      mobileScreenn.matches
        ? $(".dashboard-nav").toggleClass("mobile-show")
        : $(".dashboard").toggleClass("dashboard-compact");
    });
});

module.exports ={
  h,h2
}*/