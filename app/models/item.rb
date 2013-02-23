class Item < ActiveRecord::Base
  attr_accessible :desc, :stage_id, :title
  belongs_to :stage
end
