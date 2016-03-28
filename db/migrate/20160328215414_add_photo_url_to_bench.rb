class AddPhotoUrlToBench < ActiveRecord::Migration
  def change
		add_column :benches, :photo_url, :string
  end
end
