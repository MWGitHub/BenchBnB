class Api::BenchesController < ApplicationController
	def index
		@benches = Bench.in_bounds(params[:bounds])
		if params[:maxSeating].to_i != 0
			@benches = @benches.where(
				seating: (params[:minSeating].to_i..params[:maxSeating].to_i)
			)
		else
			@benches = @benches.where("seating >= ?", params[:minSeating].to_i)
		end
	end

	def show
		@bench = Bench.find(params[:id])
	end

	def create
		@bench = Bench.create!(bench_params)
		render :show
	end

	private
	def bench_params
		params.require(:bench).permit(:description, :lat, :lng, :seating)
	end
end
