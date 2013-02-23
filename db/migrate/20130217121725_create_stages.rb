class CreateStages < ActiveRecord::Migration
  def change
    create_table :stages do |t|
      t.string :title

      t.timestamps
    end
  end
end
