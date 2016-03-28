class AddSeatingToBench < ActiveRecord::Migration
  def change
		add_column :benches, :seating, :integer, null: false, default: 1
  end
end
