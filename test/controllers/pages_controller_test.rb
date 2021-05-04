require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get timeline" do
    get pages_timeline_url
    assert_response :success
  end

end
