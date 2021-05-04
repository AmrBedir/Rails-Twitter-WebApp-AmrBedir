require 'test_helper'

class TweetsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get tweets_create_url
    assert_response :success
  end

  test "should get edit" do
    get tweets_edit_url
    assert_response :success
  end

  test "should get update" do
    get tweets_update_url
    assert_response :success
  end

  test "should get destroy" do
    get tweets_destroy_url
    assert_response :success
  end

end
