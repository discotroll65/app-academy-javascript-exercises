class PostsController < ApplicationController
  def index
    @posts = Post.all
    render json: @posts
  end

  def create
    @post = Post.new(params[:post])
    if @post.save
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end
end
