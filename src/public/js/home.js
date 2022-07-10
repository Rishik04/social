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
                    let newPost = newPostData(res.data)
                    $('#all_posts>.row').prepend(newPost);
                },
                error: function(error)
                {
                    console.log(error);
                }
            })
        });

    }

    let newPostData = function(post)
    {    
        return $(`
          <div class="col-lg-4 mt-3 mx-auto post col-md-6" id="post-${post.allPost._id}">
            <div class="card" id="user-${post.allPost.user._id}">
            <div class="card-img-top">
            <img
              src="data:${post.allPost.img.contentType};base64,${post.img}"
              alt="pic"
              class="img-fluid"
            />
          </div>
              <div class="card-body">
                <h1>${post.allPost.caption}</h1>
                <div class="row">
                  <div class="col-lg-6">
                    <h2>
                    <img
                    src="data:${post.allPost.img.contentType};base64,${post.img}"
                    alt="pic"
                  />
                      ${post.allPost.user.name}
                    </h2>
                  </div>
      
                  <div class="col-lg-6" id="del">
                    <span>
                      <button type="submit" id="delBtn">
                        <i class="ri-delete-bin-2-line mx-1"></i>
                      </button>
      
                      <button type="submit" class="likePost">
                        ${post.allPost.like}
                        <i class="fa-regular fa-comment mx-1"></i>
                      </button>
      
                      <button type="submit" class="likePost">
                        ${post.allPost.like}
                        <i class="ri-heart-line mx-1"></i>
                      </button>
                    </span>
                  </div>
                </div>
      
                <form action="post/addcomment" method="post" class="row px-3">
                  <input
                    type="text"
                    placeholder="Type your comment"
                    class="form-control py-2 col-8"
                    name="comment"
                    required
                  />
                  <input type="hidden" value="${post.allPost._id}" name="posts" />
                  <input type="submit" value="Submit" class="submitComment col-4" />
                </form>
              </div>
            </div>
          </div>
      `)
    }

    addPost();



    
    
};
{
    let commentformData = function(){
        let formData = $(`#commentForm`);
    
        formData.submit(function(e){
            e.preventDefault();
    
            $.ajax({
                method: 'post',
                url: '/post/addcomment',
                data: formData.serialize(),
                success: (e)=>{
                    let addComment = newComment(e.data);
                    console.log(e.data.posts)
                    $(`#post-${e.data.posts} .comment>ul`).prepend(addComment);
                },
                error: (err)=>{
                    console.log(err)
                }
            })
        })
    }
    let newComment = function(comments)
{
    return $(`<div class="comment">
    <ul class="list-unstyled">
      <p class="px-3 mb-0" id="comment-${comments._id}">
        <small>
          ${comments.user.name}
        </small>
        ${comments.comment}
      </p>
    </ul>
  </div>`)
}

commentformData();
}