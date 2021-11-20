class MessagesController < ApplicationController
    #
    def messages_specific_to_users
        user = User.find(params[:user_id])
        teams= user.teams
        messages = teams.map do |team|
            team.messages
        end
        if messages.length > 0
            messages_order = messages.sum.sort_by { |id| id}
            # render json: teams
            render json: messages_order
        end
        # teams = Team.joins(:memberships).where(memberships: {user_id: user.id})
        # render json: teams, each_serializer: TeamUserSerializer
    end

end
