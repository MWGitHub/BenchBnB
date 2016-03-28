json.id bench.id
json.description bench.description
json.lat bench.lat
json.lng bench.lng

json.reviews bench.reviews.each do |review|
	json.partial! '/api/reviews/reviews', review: review
end
