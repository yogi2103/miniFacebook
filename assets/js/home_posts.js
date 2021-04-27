{
    console.log('hi');

    //method to submit the form data for new post using ajax
    let createPost=()=>{
        let newPostForm=$('#new-post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(),   //converts the post form data into json 'content' will be key 
                success:(data)=>{
                    let newPost= newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
                    console.log(data);
                },error:(err)=>{
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM

    let newPostDom=(post)=>{    //data we received from the post controller as post in json format
        return $(`
        <li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>     
            </small>
            ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment...">
                    <input type="hidden" name="post" value="${post._id}" >
                    <input type="submit" value="Add Comment">
                </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                </ul>
    
            </div>
        </div>
        
    </li>
        `)
    }

    //method to delete a post from DOM
    let deletePost=(deleteLink)=>{
        $(deleteLink).click((e)=>{
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:(data)=>{
                    console.log(data.data.post_id);
                    $(`#post-${data.data.post_id}`).remove();
                },error:(data)=>{
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
}