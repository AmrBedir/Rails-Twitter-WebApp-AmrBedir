# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'testu1', email: 'testu1@gmail.com', password: 'testu1', password_confirmation: 'testu1')
User.create(username: 'testu2', email: 'testu2@gmail.com', password: 'testu2', password_confirmation: 'testu2')
User.create(username: 'testu3', email: 'testu3@gmail.com', password: 'testu3', password_confirmation: 'testu3')
User.create(username: 'testu4', email: 'testu4@gmail.com', password: 'testu4', password_confirmation: 'testu4')
User.create(username: 'testu5', email: 'testu5@gmail.com', password: 'testu5', password_confirmation: 'testu5')

puts 'Users created'
