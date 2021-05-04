class AddExtraToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :age, :integer
    add_column :users, :gender, :string
    add_column :users, :bio, :text
  end
end
