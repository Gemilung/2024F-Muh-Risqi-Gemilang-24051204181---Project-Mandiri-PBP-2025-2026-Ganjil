document.addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector(".row-2 select");
    const container = document.querySelector(".small-container");
    const productRows = Array.from(container.querySelectorAll(".row")).filter(row => row.querySelector(".col-4"));

    let allProducts = [];
    productRows.forEach(row => {
      allProducts.push(...Array.from(row.querySelectorAll(".col-4")));
    });
  
    function extractPrice(text) {

      return parseInt(text.replace(/[^\d]/g, ""));
    }
  
    select.addEventListener("change", () => {
      const value = select.value;
      let sortedProducts = [...allProducts];
  
      if (value === "Short by Price") {
        sortedProducts.sort((a, b) => {
          const priceA = extractPrice(a.querySelector("p").textContent);
          const priceB = extractPrice(b.querySelector("p").textContent);
          return priceA - priceB;
        });
      } else if (value === "Default Shorting") {

        sortedProducts = [...allProducts];
      }

      productRows.forEach(row => row.innerHTML = "");

      for (let i = 0; i < sortedProducts.length; i++) {
        const rowIndex = Math.floor(i / 4);
        productRows[rowIndex].appendChild(sortedProducts[i]);
      }
    });
  });
  
