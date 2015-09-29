require 'rails_helper'

RSpec.describe Foodtruck, type: :model do

  let(:truck){ build(:foodtruck) }

  it "is valid with default attributes" do
    expect(truck).to be_valid
  end

  describe "generated attributes" do

    context "latitude and longitude" do

      it "generates a lat and long if these aren't and an address is present" do
        truck.latitude = nil
        truck.longitude = nil
        truck.save
        # Checking that they exist in the db
        expect(truck.latitude).to_not be nil
        expect(truck.longitude).to_not be nil
      end

      specify "the geocoded lat and long should be inside SF" do
        truck.latitude = nil
        truck.longitude = nil
        truck.save
        # It should at the very least be in SF
        expect(truck.latitude).to be_within(0.3).of(37.7)
        expect(truck.longitude).to be_within(0.3).of(-122.4)
      end

      it "doesn't generate them if address isn't present either" do
        truck.latitude = nil
        truck.longitude = nil
        truck.address = nil
        truck.save
        expect(truck.latitude).to be nil
        expect(truck.longitude).to be nil
      end

    end

  end

  describe "methods" do

    describe "#find_in_range" do

      before { truck.save }

      it "returns no results for a location outside SF" do
        food_trucks = Foodtruck.find_in_range({ lat: 0, lon: 0, radius: 2000 }) #2 KM radius
        expect(food_trucks).to match_array([])
      end

      it "does returns results for a location inside SF" do
        # binding.pry
        food_trucks = Foodtruck.find_in_range({ lat: 37.788457, lon: -122.39988, radius: 2000 }) #2 KM radius
        expect(food_trucks).to match_array([truck])
      end
    end

  end

  describe "validations" do

    specify "food truck name must be present" do
      truck.applicant = nil
      expect(truck).not_to be_valid
    end

    specify "latitude must be present and won't be generated if there's not address info" do
      truck.latitude = nil
      truck.address = nil
      expect(truck).not_to be_valid
    end

    specify "latitude must be present and won't be generated if there's not address info" do
      truck.longitude = nil
      truck.address = nil
      expect(truck).not_to be_valid
    end

    specify "expiration date must be present" do
      truck.expiration_date = nil
      expect(truck).not_to be_valid
    end

  end

end
