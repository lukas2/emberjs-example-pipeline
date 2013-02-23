class Stage < ActiveRecord::Base
  attr_accessible :title
  has_many :items
end
