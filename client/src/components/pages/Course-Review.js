import React from 'react'

const CourseReview = () => {
    return (
        <section class="container">
          <h1 class="large text-primary">
            Reviews
          </h1>
          <p class="lead"><i class="fas fa-graduation-cap"></i> CMPT 103<span>{": "}MacEwan University</span></p>
         
    
          <div class="posts">
            <div class="post bg-white p-1 my-1">
              <div>
                <a href="profile.html">
                  <img
                    class="round-img"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48wc07710c08d50?s=200"
                    alt=""
                  />
                  <h4>John Doe</h4>
                </a>
              </div>
              <div>
                <p class="my-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  possimus corporis sunt necessitatibus! Minus nesciunt soluta
                  suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                  dolor? Illo perferendis eveniet cum cupiditate aliquam?
                </p>
                 <p class="post-date">
                    Posted on 04/16/2019
                </p>
                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-up"></i>
                  <span>4</span>
                </button>
                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-down"></i>
                </button>
              </div>
            </div>
    
            <div class="post bg-white p-1 my-1">
              <div>
                <a href="profile.html">
                  <img
                    class="round-img"
                    src="https://www.gravatar.com/avatar/205e460b379e2e5b48aec07710c08d50?s=200"
                    alt=""
                  />
                  <h4>Sara Smith</h4>
                </a>
              </div>
              <div>
                <p class="my-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  possimus corporis sunt necessitatibus! Minus nesciunt soluta
                  suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                  dolor? Illo perferendis eveniet cum cupiditate aliquam?
                </p>
                <p class="post-date">
                    Posted on 04/16/2019
                </p>
                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-up"></i>
                  <span>4</span>
                </button>
                <button type="button" class="btn btn-light">
                  <i class="fas fa-thumbs-down"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="post-form">
            <div class="bg-primary p">
              <h3>Add A Review...</h3>
            </div>
            <form class="form my-1">
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Add A Review"
                required
              ></textarea>
              <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
          </div>
        </section>
        
    )
}

export default CourseReview
