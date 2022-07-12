$("#add_sessions").submit(function (event) {
  alert("Session Added Successfully!");
});

$("#update_session").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `http://localhost:3000/api/sessions/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Session Updated Successfully!");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:3000/api/sessions/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        alert("Session Deleted Successfully!");
        location.reload();
      });
    }
  });
}
