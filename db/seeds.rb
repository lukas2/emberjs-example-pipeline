# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Stage.create!( title: "Contacted", id: 1 )
Stage.create!( title: "Phone Interview", id: 2 )
Stage.create!( title: "Inteview", id: 3 )
Stage.create!( title: "Offer Made", id: 4 )
Stage.create!( title: "Offer Accepted", id: 5 )

Item.create!( title: "Apple", desc: "Phones and Laptops" )
Item.create!( title: "Google", desc: "Search Engine" )
Item.create!( title: "Microsoft", desc: "Hard- and Software" )
Item.create!( title: "eBay", desc: "Online Marketplace" )
Item.create!( title: "Canonical", desc: "Makers of Ubuntu", stage_id: 1 )
Item.create!( title: "Amazon", desc: "E-Commerce" )
Item.create!( title: "Twitter", desc: "Social Media" )