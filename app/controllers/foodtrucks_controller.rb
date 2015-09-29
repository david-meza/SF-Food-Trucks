class FoodtrucksController < ApplicationController

  before_action :set_default_response_format

  def index
    @foodtrucks = query_params[:lon] && query_params[:lat] ? Foodtruck.find_in_range(query_params) : Foodtruck.all

    respond_to do |format|
      format.json { render json: @foodtrucks }
    end

  end

  private

  def query_params
    params.permit(:lon, :lat, :radius, :format)
  end

  def set_default_response_format
    request.format = :json unless params[:format]
  end

end