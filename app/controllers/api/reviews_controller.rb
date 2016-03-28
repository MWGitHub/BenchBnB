class Api::ReviewsController < ApplicationController
	def create
		@bench = Bench.find(params[:bench_id])
		@bench.reviews.create!(review_params)

		render '/api/benches/show'
	end

	private
	def review_params
		params.require(:review).permit(:body, :score)
	end
end
