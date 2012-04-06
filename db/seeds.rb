# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.where(:email => 'blake@hilscher.ca').first
user = User.create!({:email => 'blake@hilscher.ca', :password => 'blake99', :password_confirmation => 'blake99'}) if user.blank?

20.times do
  user.posts.create!({:content => Faker::Lorem.paragraphs.join("\n"), :title => Faker::Lorem.words(5).join(' ').humanize })
end