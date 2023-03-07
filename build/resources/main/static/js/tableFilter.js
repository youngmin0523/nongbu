function filterEvent(clicked_id) {

    var filter, table, tr, td, i, txtValue;
    var value = document.getElementById(clicked_id);
    filter = value.value.toUpperCase();

    table = document.getElementById('productTable');
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[5];
        if (filter === '모두') {
            tr[i].style.display = "";
        } else {
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

}
