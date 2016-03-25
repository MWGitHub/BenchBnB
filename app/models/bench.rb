class Bench < ActiveRecord::Base
	validates :description, :lat, :lng, presence: true

	def self.in_bounds(bounds)
		northEast = bounds[:northEast]
		southWest = bounds[:southWest]
		Bench.where(
			lat: (southWest[:lat]..northEast[:lat]),
			lng: (southWest[:lng]..northEast[:lng])
		)
	end
end
