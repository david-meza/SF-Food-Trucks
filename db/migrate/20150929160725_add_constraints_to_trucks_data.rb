class AddConstraintsToTrucksData < ActiveRecord::Migration
  def change

    add_column :foodtrucks, :expiration_date, :datetime, null: false, default: Time.now.to_s(:db)

    # Location attributes can't be null
    change_column :foodtrucks, :longitude, :float, null: false
    change_column :foodtrucks, :latitude, :float, null: false

    # Name attributes can't be null
    change_column :foodtrucks, :applicant, :string, null: false

  end
end
