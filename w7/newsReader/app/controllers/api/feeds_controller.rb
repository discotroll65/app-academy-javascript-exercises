class Api::FeedsController < ApplicationController
  def index
    render :json => Feed.all
  end

  def show
    if (params[:force_reload])
      render :json => Feed.find(params[:id]) , include: :instant_entries
    else
      render :json => Feed.find(params[:id]) , include: :latest_entries
    end

  end

  def create
    feed = Feed.find_or_create_by_url(feed_params[:url])
    if feed
      render :json => feed
    else
      render :json => { error: "invalid url" }, status: :unprocessable_entity
    end
  end

  def insta_show
    render :json => Feed.find(params[:id]) , include: :instant_entries
  end

  private

  def feed_params
    params.require(:feed).permit(:title, :url)
  end
end
