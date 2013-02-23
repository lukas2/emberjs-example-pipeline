class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.string :desc
      t.integer :stage_id

      t.timestamps
    end
  end
end
