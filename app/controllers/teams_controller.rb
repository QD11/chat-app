class TeamsController < ApplicationController

    def index
        teams = Team.all
        # json_string = TeamSerializer.new(teams).serializable_hash.to_json
        render json: teams
    end

    def teams_specific_to_user
        user = User.find(params[:user_id])
        teams = Team.joins(:memberships).where(memberships: {user_id: user.id})
        # messages = []
        # teams.find_each do |team|
        #     messages << team.messages.order("created_at").last
        # end
        render json: teams, each_serializer: LatestMessageSerializer
        # render json: messages
    end

    def teams_messages_specific_to_users
        user = User.find(params[:user_id])
        teams = Team.joins(:memberships).where(memberships: {user_id: user.id})
        render json: teams, each_serializer: TeamMessageUserSerializer
    end
end
