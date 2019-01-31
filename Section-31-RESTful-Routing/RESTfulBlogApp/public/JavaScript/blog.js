document
    .getElementById("confirmClickActionElementId")
    .addEventListener("click", function( e ){ //e => event
        if( ! confirm("Do you really want to delete this post?") ){
            e.preventDefault(); // ! => don't want to do this
        } else {
            //want to do this! => maybe do something about it?
            alert('Deleted!');
        }
    });