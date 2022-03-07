(() => {
        const optionValues = document.querySelectorAll(".options");
        const searchOptions = document.querySelector(".custom-select");
        const dropdown = document.querySelector(".xpmessage");
        const input = document.getElementById("search-form-loc");
        const selectorText = document.querySelector(".search-form__label--loc");

        searchOptions.addEventListener("click", function () {
          dropdownHandler();
        });

        optionValues.forEach((option) => {
          option.addEventListener("click", function () {
            updateUI(input, selectorText, this);
          });
        });

        window.addEventListener("mouseup", function (event) {
          if (event.target != dropdown) {
            dropdown.classList.remove("search-form__dropdown--show");
          }
        });

        function dropdownHandler() {
          dropdown.classList.toggle("search-form__dropdown--show");
        }

        function updateUI(input, selectorText, referedThis) {
          input.value = referedThis.textContent.trim();
          selectorText.textContent = referedThis.textContent.trim();
          dropdown.classList.remove("search-form__dropdown--show");
        }
      })();