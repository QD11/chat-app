class NewTeamChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stop_all_streams
    
    # stream_from "new_team_channel"
    stream_from "NewTeamChannel"
  end

  def receive(data)
    team = Team.create(name: data['name'], description: data['description'])
    message = team.messages.create(content: data['content'], user_id: data["user_id"])
    data["users"].each do |user|
      team.memberships.create(user_id: user["id"], last_read_at: Time.now)
    end
    membership = Membership.find_by(user_id: data["user_id"], team_id: team.id)

    ActionCable.server.broadcast("NewMembershipChannel", MembershipSerializer.new(membership))
    ActionCable.server.broadcast("NewMessageChannel", MessageSerializer.new(message))
    ActionCable.server.broadcast("NewTeamChannel", TeamUserSerializer.new(team))
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
