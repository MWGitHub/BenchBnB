class Api::BenchesController < ApplicationController
	def index
		@benches = Bench.in_bounds(params[:bounds])
	end

	def create
		@bench = Bench.create!(bench_params)
	end

	private
	def bench_params
		params.require(:bench).permit(:description, :lat, :lng)
	end
end
