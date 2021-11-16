# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

quang = User.create(name: 'Quang')
xinyi = User.create(name: 'Xinyi')

chat1 = Team.create(name: 'chat1', description: 'quang xinyi chatroom')
chat2 = Team.create(name: 'chat2', description: 'test')

