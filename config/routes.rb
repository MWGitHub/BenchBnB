Rails.application.routes.draw do
	namespace :api, defaults: { format: :json } do
		resources :benches, only: [:index, :show, :create] do
			resources :reviews, only: [:create]
		end
	end

	root to: 'static_pages#root'
	get '*unmatched_route', to: 'static_pages#root'
end
