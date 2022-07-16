{
  let addPost = function () {
    let postForm = $("#add_post_form");

    postForm.submit(function (e) {
      e.preventDefault();
      let formData = new FormData($("#add_post_form")[0]);

      $.ajax({
        type: "Post",
        url: "/post/addpost",
        enctype: "multipart/form-data",
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        success: function (res) {
          let newPost = newPostData(res.data);
          $("#all_posts>.row").prepend(newPost);
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
  };

  let newPostData = function (post) {
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
      `);
  };

  addPost();

  //delete a post

  const delPost = function () {
    $(".del_submit").on("click", (e) => {
      e.preventDefault();
      let id = e.currentTarget.id.substring(4);

      $.ajax({
        method: "post",
        url: "http://127.0.0.1:3000/post/delpost",
        data: {
          postid: id,
        },
        success: (e) => {
          $(`#post-${e.data._id}`).remove();
        },
        error: (e) => {
          console.log(e);
        },
      });
    });
  };

  delPost();

  //comment on a post

  let commentformData = function () {
    $(".comment_form").submit((e) => {
      e.preventDefault();
      let formData = $(`#${e.currentTarget.id}`);

      $.ajax({
        method: "post",
        url: "/post/addcomment",
        data: formData.serialize(),
        success: (e) => {
          let addComment = newComment(e.data);
          $(`#post-${e.data.posts} .comment>ul`).prepend(addComment);
          $(`.comcount-${e.data.posts}`).html(e.length)
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  };

  let newComment = function (comments) {
    return $(`
    <div class="comment">
    <ul class="list-unstyled">
    <a href="/profile/${comments.user._id}" id="user-profile-${comments._id}">
      <p class="px-3 mb-0" id="comment-${comments._id}">
        <small>
          ${comments.user.name}
        </small>
        ${comments.comment}
      </p>
      </a>
    </ul>
  </div>`);
  };

  commentformData();

  const searchForm = function () {
    $("#search-form-query").submit((e) => {
      e.preventDefault();

      $.ajax({
        url: "/search/query",
        method: "post",
        data: $("#search-form-query").serialize(),
        success: (e) => {
          console.log(e);
          let formdata = newseardata(e.data);
          $(".userList>").remove();
          $(".userList").append(formdata);
        },
        error: (e) => {
          console.log(e);
        },
      });
    });
  };

  let newseardata = function (data) {
    if (data.length != 0) {
      let val = `<hr>`;
      for (data of data) {
        val += `<a href="/profile/${data._id}"><div class="card" id="profile-${data._id}">
        <div class="row justify-content-around">
            <div class="col-lg-3 col-md-3 col-2">
                <img src="${data.profile}" alt="profile">
            </div>
    
            <div class="col-lg-4 col-md-4 col-5 my-auto">
                <h4>${data.name}</h4>
            </div>
        </div>
    </div></a>
    <hr>`;
      }
      return val;
    }
    else{
        return $(`<h2>No User Found</h2>`)
    }
  };

  searchForm();


  const add = function()
  {
    $('.connect').on('click',(e)=>{
        const id = e.target.id.substring(8);
        const data = {
            _id: id
        }
        $.ajax({
            url: '/profile/connect',
            method: 'post',
            data: data,
            success: (e)=>{
                console.log(e.message)
                $('.connect').html(e.message)
            },
            error: (e)=>{
                console.log(e);
            }
        })
    })
  }

  add();
}
