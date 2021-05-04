class CreateRetweets < ActiveRecord::Migration[5.1]
  def change
    create_table :retweets do |t|
      t.integer :retweeter_id
      t.integer :source_tweet_id

      t.timestamps
    end

    add_index :retweets, :retweeter_id
    add_index :retweets, :source_tweet_id
    add_index :retweets, [:retweeter_id, :source_tweet_id], unique: true
  end
end
