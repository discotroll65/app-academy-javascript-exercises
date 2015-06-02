class ToysController < ApplicationController
  def show
    @toy = Toy.find(params[:id])
    render 'show'
  end

  def update
    @toy = Toy.find(params[:id])
    render 'show'
  end
end
