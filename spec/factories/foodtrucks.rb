FactoryGirl.define do
  factory :foodtruck do

    status                  "APPROVED"
    permit                  "Food License"
    block                   "A Town"
    received                "1234"
    facilitytype            "Words words"
    blocklot                "More words!"
    locationdescription     "Nice place"
    cnn                     "123abc"
    priorpermit             "nowhere to be found"
    schedule                "M-F 8:00AM - 5:00PM"
    address                 "85 02ND ST"
    applicant               "Mang Hang Catering"
    lot                     "123456"
    fooditems               "COLD TRUCK. Deli: bbq chicken skewer"
    latitude                37.7884570426015
    longitude               (-122.399884160556)
    objectid                "559777"
    dayshours               "M-F 8:00AM - 5:00PM"
    expiration_date         Time.now.to_s(:db)

  end

end
