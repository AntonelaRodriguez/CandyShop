function applyFilters (state=initialState) {
  let { order, tacc, brand, category, reverse } = state.filters;
  let copy = [...state.allProducts];
  if(order.length) {
    switch (order) {
      case "alphabetical":
        copy.sort( (a,b) => a.name.localeCompare(b.name));
        break;
      case "price":
        copy.sort( (a,b) => a.price - b.price);
        break;
      default:
    }
    reverse && copy.reverse()
  }
  if(tacc.length) {
    copy = tacc === "tacc" 
    ? copy.filter((p) => p.tacc === true)
    : copy.filter((p) => p.tacc === false)
  }
  brand.length && (copy = copy.filter((p) => p.brand == brand))
  category.length && (copy = copy.filter((p) => p.category.includes(category)))
  return copy;
}

export default applyFilters;