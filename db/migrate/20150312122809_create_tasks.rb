class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :task
      t.text :description
      t.integer :working_time

      t.timestamps
    end
  end
end
