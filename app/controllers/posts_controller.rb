class PostsController < ApplicationController
  
  def index
    respond_with @posts = Post.order(:created_at).page(params[:page]).per(5)
  end

  def show
    respond_with @post = Post.find(params[:id])
  end
  
end