class Foodtruck < ActiveRecord::Base

  include Geocoder

  # ----------------------- Validations --------------------

  validates :applicant, :latitude, :longitude, :expiration_date,
            presence: true

  validates_numericality_of :latitude, :longitude

  # ----------------------- Callbacks --------------------

  before_validation :get_coords


  # ----------------------- Constants --------------------

  MILES_PER_DEGREE_LON = 53
  MILES_PER_DEGREE_LAT = 69


  # ----------------------- Class Methods --------------------

  def self.find_in_range(query_params)
    ori_lat = query_params[:lat].to_f
    ori_lon = query_params[:lon].to_f
    radius = query_params[:radius].to_f

    find_safe_trucks.within_radius(ori_lon, ori_lat, radius)

  end

  # ----------------------- Instance Methods --------------------

  def get_coords
    if self.address && (!self.latitude || !self.longitude)
      self.latitude, self.longitude = Geocoder.coordinates(self.address + ", San Francisco, CA")
    end
  end

  # ----------------------- Private Methods --------------------

    private

    def self.find_safe_trucks
      where("status = ? OR status = ? OR (status = ? AND expiration_date >= ?)", "APPROVED", "REQUESTED", "EXPIRED", 1.year.ago.to_s(:db))
    end

    def self.within_radius(lon, lat, rad)
      where("longitude <= ? AND longitude >= ?",
              lon + (rad / ( MILES_PER_DEGREE_LON + 12) ),
              lon - (rad / ( MILES_PER_DEGREE_LON + 12) ))
      .where("latitude <= ? AND latitude >= ?",
              lat + (rad / (MILES_PER_DEGREE_LAT + 12) ),
              lat - (rad / (MILES_PER_DEGREE_LAT + 12) ))
    end

    def self.distance(ori_lon, ori_lat, des_lon, des_lat)
      Geocoder::Calculations.distance_between([ori_lat, ori_lon],
                                              [des_lat, des_lon])
    end

end
