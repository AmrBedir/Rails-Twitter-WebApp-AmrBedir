class CreateTweets < ActiveRecord::Migration[5.1]
  def change
    create_table :tweets do |t|
      t.integer :user_id
      t.text :content
      t.text :content_html

      t.timestamps
    end

    add_index :tweets, :user_id
  end
end
