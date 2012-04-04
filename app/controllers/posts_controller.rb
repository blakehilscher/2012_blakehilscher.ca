class PostsController < ApplicationController
  
  def index
    respond_with @posts = Post.all
  end

  def show
    respond_with @post = Post.find(params[:id])
  end
  
end