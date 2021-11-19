class MembershipsController < ApplicationController

    def update
        membership = Membership.find_by(id: params[:id])
        if membership
            membership.update(last_read_at: params[:last_read_at])
            render json: membership
        else
            render json: { error: "Membership not found" }, status: :not_found
        end
    end

    def memberships_specific_to_users
        memberships = Membership.where(user_id: params[:user_id])
        render json: memberships
    end
end
