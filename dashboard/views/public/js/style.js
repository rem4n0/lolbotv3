function imgError(e) {
  e.src = "../img/undefined_avatar.png";
}
function backImgError(e) {
  e.src = "../img/undefined_back.png";
}
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
  $(document).ready(function () {
    var e = $("select[multiple]"),
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

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
