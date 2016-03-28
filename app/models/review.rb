class Review < ActiveRecord::Base
	validates :body, :score, :bench_id, presence: true
	validates :score, numericality: { only_integer: true }

	has_one :bench
end
