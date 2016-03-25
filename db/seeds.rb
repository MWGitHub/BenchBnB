# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
latStart = 40.716001
latEnd = 40.744619
latDiff = latEnd - latStart
lngStart = -74.003906
lngEnd = -73.980389
lngDiff = lngEnd - lngStart

FactoryGirl.define do
	factory :bench do
		description { Faker::Hipster.sentence }
		lat { rand * latDiff + latStart }
		lng { rand * lngDiff + lngStart }
	end
end

10.times do
	FactoryGirl.create(:bench)
end
