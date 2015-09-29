class Foodtruck < ActiveRecord::Base

  include Geocoder

  # ----------------------- Validations --------------------

  validates :applicant, :latitude, :longitude, :expiration_date,
            presence: true

  validates_numericality_of :latitude, :longitude

  # ----------------------- Callbacks --------------------

  before_validation :get_coords


  # ----------------------- Constants --------------------

  # EARTH_RADIUS = 6371
  MILES_PER_DEGREE_LON = 53
  MILES_PER_DEGREE_LAT = 69


  # ----------------------- Class Methods --------------------

  def self.find_in_range(query_params)
    ori_lat = query_params[:lat].to_f
    ori_lon = query_params[:lon].to_f
    radius = query_params[:radius].to_f
    # self.find_by_sql("SELECT * FROM foodtrucks
    #                   WHERE #{self.distance(ori_lon, ori_lat, longitude, latitude)} <= ?",
    #                   radius)
    puts query_params
    self.find_openings.where("longitude <= ? AND longitude >= ?",
                              ori_lon + (radius / MILES_PER_DEGREE_LON),
                              ori_lon - (radius / MILES_PER_DEGREE_LON))
                      .where("latitude <= ? AND latitude >= ?",
                              ori_lat + (radius / MILES_PER_DEGREE_LAT),
                              ori_lat - (radius / MILES_PER_DEGREE_LAT))
  end

  # ----------------------- Instance Methods --------------------

  def get_coords
    if self.address && (!self.latitude || !self.longitude)
      self.latitude, self.longitude = Geocoder.coordinates(self.address + ", San Francisco, CA")
    end
  end

  # ----------------------- Private Methods --------------------

    private

    def self.find_openings
      self.where("status = ? OR status = ? OR (status = ? AND expiration_date >= ?)", "APPROVED", "REQUESTED", "EXPIRED", 1.year.ago.to_s(:db))
    end

  # def self.distance(ori_lon, ori_lat, des_lon, des_lat)
  #   ori_lat_rad = ori_lat.to_f * Math::PI / 180
  #   des_lat_rad = des_lat.to_f * Math::PI / 180
  #   delta_lat_rad = (ori_lat.to_f - des_lat.to_f) * Math::PI / 180
  #   delta_lon_rad = (ori_lon.to_f - des_lon.to_f) * Math::PI / 180

  #   haversine = (Math.sin(delta_lat_rad/2))**2 +
  #               (Math.cos(ori_lat_rad) * Math.cos(des_lat_rad) * (Math.sin(delta_lon_rad/2))**2)

  #   c = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1-haversine))

  #   EARTH_RADIUS * c
  # end


  # def self.distance(ori_lon, ori_lat, des_lon, des_lat)
  #   Geocoder::Calculations.distance_between([ori_lat, ori_lon],
  #                                           [des_lat, des_lon])
  # end

end
