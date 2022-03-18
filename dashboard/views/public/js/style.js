  document.addEventListener("DOMContentLoaded", function() {
        var demo1 = new BVSelect({
          selector: "#selectbox",
          searchbox: false,
          offset: false
        });
        var demo2 = new BVSelect({
          selector: "#selectbox2",
          searchbox: true,
          search_autofocus: true,
          offset: true,
          width: "100%",
          placeholder: "Select Option",
          search_placeholder: "Search...",
          breakpoint: 750
        });
        var demo3 = new BVSelect({
          selector: "#selectbox3",
          searchbox: true,
          offset: true
        });
        var demo4 = new BVSelect({
          selector: "#selectbox4",
          searchbox: true,
          offset: true
        });
        var demo5 = new BVSelect({
          selector: "#selectbox5",
          searchbox: true,
          offset: true
        });     
        var demo6 = new BVSelect({
          selector: "#selectbox6",
          searchbox: true,
          search_autofocus: false,
          offset: true,
          width: "100%",
          search_placeholder: "Search..."
        });  
  });