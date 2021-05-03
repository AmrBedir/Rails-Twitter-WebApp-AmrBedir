class NotificationsController < ApplicationController
    def mark_all_read
        @notifications.update_all(read: true)
    end
end
