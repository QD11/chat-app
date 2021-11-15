class TeamsController < ApplicationController

    def index
        teams = Team.all
        # json_string = TeamSerializer.new(teams).serializable_hash.to_json
        render json: teams
    end
end
