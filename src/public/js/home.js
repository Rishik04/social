{
    let addPost = function()
    {
        let postForm = $('#add_post_form');
        
        postForm.submit(function(e){
            e.preventDefault();
            let formData = new FormData($('#add_post_form')[0]);            

            $.ajax({
                type: 'Post',
                url: '/post/addpost',
                enctype: 'multipart/form-data',
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                success: function(res)
                {
                    console.log(res);
                },
                error: function(error)
                {
                    console.log(error);
                }
            })
        });

    }
    addPost();
}