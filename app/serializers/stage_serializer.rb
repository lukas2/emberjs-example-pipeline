class StageSerializer < ActiveModel::Serializer
	embed :ids
	
  attributes :id, :title#, :items
  has_many :items
end
