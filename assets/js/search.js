(function () {
  var input = document.getElementById("search-query");
  var status = document.getElementById("search-status");
  var results = document.getElementById("search-results");
  var entries = JSON.parse(document.getElementById("search-index").textContent);

  entries.forEach(function (entry) {
    entry.searchText = [entry.title, entry.summary, entry.body].join(" ").toLowerCase();
  });

  function search() {
    var query = input.value.trim().toLowerCase();
    results.replaceChildren();
    if (!query) {
      status.textContent = "";
      return;
    }

    var terms = query.split(/\s+/);
    var matches = entries.filter(function (entry) {
      return terms.every(function (term) {
        return entry.searchText.includes(term);
      });
    });

    matches.forEach(function (entry) {
      var item = document.createElement("li");
      var link = document.createElement("a");
      link.href = entry.url;
      link.textContent = entry.title;
      item.append(link);
      results.append(item);
    });

    status.textContent = matches.length
      ? matches.length + (matches.length === 1 ? " result" : " results")
      : "No results found.";
  }

  input.addEventListener("input", search);
  search();
})();
