class NewTeamChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stop_all_streams
    
    stream_from "new_team_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
