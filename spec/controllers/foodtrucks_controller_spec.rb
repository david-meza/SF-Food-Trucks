require 'rails_helper'

RSpec.describe FoodtrucksController, type: :controller do

  describe 'indexing trucks' do

    describe "GET /api/v1/foodtrucks" do

      it "works as normal" do
        get :index, format: :json
        expect(response.status).to eq(200)
      end

    end

    it 'sends a list of food trucks when no params are present' do
      create_list(:foodtruck, 10)

      get :index, format: :json
      # binding.pry

      json = JSON.parse(response.body)
      expect(json.length).to eq(10) # check to make sure the right amount of food trucks are returned
      # expect(json).to match_array(Foodtruck.all) # There's a slight difference with the way things are formatted in JSON so these won't match
    end

    it 'finds the food truck within a specified lat, long, and radius' do
      create(:foodtruck, latitude: 100, longitude: 100)
      create(:foodtruck, latitude: 50, longitude: 50)

      get :index, format: :json, lat: 99.99, lon: 100.01, radius: 2000

      json = JSON.parse(response.body)
      expect(json.length).to eq(1)


    end

  end

end
