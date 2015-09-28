class FoodtrucksController < ApplicationController

  def index
    foodtrucks = Foodtruck.find_in_range(query_params)

    respond_to do |format|
      format.json { render: foodtrucks }
    end

  end

  private

  def query_params
    params.permit(:lon, :lat, :radius)
  end

end