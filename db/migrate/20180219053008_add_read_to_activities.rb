class AddReadToActivities < ActiveRecord::Migration[5.1]
  def change
    add_column :activities, :read, :boolean, default: false
  end
end
