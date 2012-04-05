class Admin::PostsController < AdminController
  load_and_authorize_resource
  
  def index
    respond_with @posts = current_user.posts.order(:created_at).page(params[:page])
  end

  def show
    respond_with @post = Post.find(params[:id])
  end

  def new
    respond_with @post = Post.new
  end

  def edit
    respond_with @post = Post.find(params[:id])
  end

  def create
    @post = Post.new(params[:post])
    
    if @post.save
      redirect_to edit_admin_post_url(@post)
    else
      respond_with @post
    end
  end
  
  def update
    @post = Post.find(params[:id])
    @post.update_attributes(params[:post])
    respond_with @post, :location => edit_admin_post_url
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    respond_with @post, :location => admin_posts_url
  end
  
end