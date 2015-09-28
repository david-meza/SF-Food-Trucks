class Foodtruck < ActiveRecord::Base

  include Geocoder

  # EARTH_RADIUS = 6371
  MILES_PER_DEGREE_LON = 53
  MILES_PER_DEGREE_LAT = 69

  before_create :get_coords

  def self.find_in_range(query_params)
    ori_lat = query_params[:lat].to_f
    ori_lon = query_params[:lon].to_f
    radius = query_params[:radius].to_f
    # self.find_by_sql("SELECT * FROM foodtrucks
    #                   WHERE distance(?, ?, longitude, latitude) <= ?", 
    #                   ori_lon, ori_lat, radius)
    self.find_openings.where("longitude <= ? AND longitude >= ?", 
                              ori_lon + (radius.to_f / MILES_PER_DEGREE_LON), 
                              ori_lon - (radius.to_f / MILES_PER_DEGREE_LON))
                      .where("latitude <= ? AND latitude >= ?", 
                              ori_lat + (radius.to_f / MILES_PER_DEGREE_LAT), 
                              ori_lat - (radius.to_f / MILES_PER_DEGREE_LAT))
  end

  def get_coords
    if self.address && (!self.latitude || !self.longitude)
      self.latitude, self.longitude = Geocoder.coordinates(self.address)
    end
  end

  private

  def self.find_openings
    self.where("status = ? OR status = ?", "APPROVED", "REQUESTED")
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

end
