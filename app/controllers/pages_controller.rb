class PagesController < ApplicationController
  def home
    respond_with @posts = Post.order(:created_at).page(params[:page]).per(5)
  end
end