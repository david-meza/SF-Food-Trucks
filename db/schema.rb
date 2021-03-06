# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150929160725) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "foodtrucks", force: :cascade do |t|
    t.string   "status"
    t.string   "permit"
    t.string   "block"
    t.string   "received"
    t.string   "facilitytype"
    t.string   "blocklot"
    t.string   "locationdescription"
    t.string   "cnn"
    t.string   "priorpermit"
    t.string   "schedule"
    t.string   "address"
    t.string   "applicant",                                           null: false
    t.string   "lot"
    t.string   "fooditems"
    t.float    "longitude",                                           null: false
    t.float    "latitude",                                            null: false
    t.string   "objectid"
    t.string   "dayshours"
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
    t.datetime "expiration_date",     default: '2015-09-29 12:15:08', null: false
  end

end
