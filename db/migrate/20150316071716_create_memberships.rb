class CreateMemberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.string :name
      t.float :amount
      t.timestamps
    end
    add_column :users, :membership_id, :integer
  end
end
