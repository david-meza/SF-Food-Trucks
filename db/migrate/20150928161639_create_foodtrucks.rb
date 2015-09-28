class CreateFoodtrucks < ActiveRecord::Migration
  def change
    create_table :foodtrucks do |t|
      t.string :status
      t.string :permit
      t.string :block
      t.string :received
      t.string :facilitytype
      t.string :blocklot
      t.string :locationdescription
      t.string :cnn
      t.string :priorpermit
      t.string :schedule
      t.string :address
      t.string :applicant
      t.string :lot
      t.string :fooditems
      t.float :longitude
      t.float :latitude
      t.string :objectid
      t.string :dayshours

      t.timestamps null: false
    end
  end
end
