# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Foodtruck.destroy_all

file = File.read("./app/models/sf-ft.json")
data = JSON.parse(file)

data.each do |entry|

  Foodtruck.create(
    status: entry['status'].upcase,
    permit: entry['permit'],
    block: entry['block'],
    received: entry['received'],
    facilitytype: entry['facilitytype'],
    blocklot: entry['blocklot'],
    locationdescription: entry['locationdescription'],
    cnn: entry['cnn'],
    priorpermit: entry['priorpermit'],
    schedule: entry['schedule'],
    address: entry['address'],
    applicant: entry['applicant'],
    lot: entry['lot'],
    fooditems: entry['fooditems'],
    # Leave nil so Geocoder can find the location associated with the address
    longitude: entry['longitude'].nil? ? nil : entry['longitude'].to_f,
    latitude: entry['latitude'].nil? ? nil : entry['latitude'].to_f,
    # We can leave it nil, the validations will take care of setting it to a default
    expiration_date: entry['expirationdate'].nil? ? nil : entry['expirationdate'].to_datetime.to_s(:db),
    objectid: entry['objectid'],
    dayshours: entry['dayshours']
  )

  sleep 2 unless entry['longitude'] && entry['latitude']

end