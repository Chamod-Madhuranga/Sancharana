// script.js
$(document).ready(function () {
    $("#submitBtn").click(function () {
        var email = $("#email").val();
        var comments = $("#comments").val();
        // You can now send 'email' and 'comments' to your backend for processing
        alert("Thank you for your comment!");
    });
});
